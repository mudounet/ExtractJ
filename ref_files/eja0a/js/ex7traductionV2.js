
// preload images 

var liste_images = new Array('blank.gif','imgsMenu/btFw-down.gif','imgsMenu/btFw-over.gif','imgsMenu/btHelp-down.gif','imgsMenu/btHelp-over.gif','imgsMenu/btHome-down.gif','imgsMenu/btHome-over.gif','imgsMenu/btOk-down.gif','imgsMenu/btReload-down.gif','imgsMenu/btReload-over.gif','imgsMenu/btRw-down.gif','imgsMenu/btRw-over.gif','imgsMenu/btTools-down.gif','imgsMenu/btTools-over.gif','imgsExoTrad/ExoTradMot-down.gif','imgsExoTrad/ExoTradMot-over.gif','imgsExoTrad/ExoTradApp-over.gif','imgsExoTrad/ExoTradApp-down.gif','imgsL7Trad/L7TradTradComp-over.gif','imgsL7Trad/L7TradTradMparM-over.gif','imgsExoTrad/imgsExoTrad.gif');


document.image_chargee = new Array();
function prechargement() {
	
	for ( i = 0; i < liste_images.length; i++ ) {
		document.image_chargee[i] = new Image;
		document.image_chargee[i].src = pathImages + liste_images[i] ;
	}
}

// ouvre la fenetre en plein ecran (IE)
//window.resizeTo (window.screen.width,window.screen.height);
// repertoire sons

var xmlOutput='';

var leTexte;
var laTraduction;
var leMot;
var phraseComplete;
var posMot=0;

var l = get('l'); //numero lecon (asp)
var m = get('m'); // module
if (l<1) {
	l=7;
}   
var p = get('p');

	if(p<1){
		p =1 ;
		}
	if (p>maxP){
		p = 1;
	}  
var phrase;	
var lecon='';                  
var url = new String(document.location);
url = url.replace(/#/gi,'');
var nextUrl;               
var prevUrl;               

var showNumP=''
var maxP ; // phrase maxi (asp /js)

if (url.indexOf ('?')>0){
	url = url.substring (0,url.indexOf ('?'));
}


toUrl ();

function toUrl(){
		// concatene le numero de lecon
	if(l<=9){
				lecon = '00' + l;
			}
	else if(l<=99){
				lecon = '0' + l;
			}
	else {
	
			lecon=l;
	}
		showNumP= parseInt(p);
		phrase=parseInt(p);
		if(p<=9){
			p = '0' + parseInt(p) ;
					}
}

function nextPhrase(){
	
	p++;
	
	if(p>=maxP){
		// exercice drag and drop
		 ex7dragdrop();
	}
	else{
		phrase++;
		toUrl();
		cacher();
		affiche();
	
	}
	
	
}
function prevPhrase(){

	p--;
	
	if(p<1){	
		p=1;
		alert('premiere phrase');
	}
	else{
		phrase--;
		toUrl();
		cacher();
		affiche();

	}
}
function cacher(){
	//document.getElementById('affTrad').style.visibility='hidden';
	document.getElementById('affTrad').innerHTML='';
}
var tabPhrasesText = new Array();

function parseXml(){

	if( ext=='.html'){
		var xslSheet =  'xml/ex7traduction.xsl' ;
		var file = 'xml/Lesson_' + lecon + '.xml';
		var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
	 	var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
		
			 xslDoc.async = false;
			 xslDoc.load(xslSheet);  
		    
			xmlDoc.validateOnParse = false;
			xmlDoc.load(file);
			
			var xslt = new ActiveXObject("Msxml2.XSLTemplate");
			xslt.stylesheet = xslDoc;
			var xslProc = xslt.createProcessor();
			xslProc.input = xmlDoc;
						
		     //xslProc.addParameter("numero", document.form1.code.value);
		     xslProc.transform();
			xmlOutput = xslProc.output;
	
			document.writeln ('<script type="text/javascript">'); 
			document.writeln (xmlOutput);
			document.writeln ('</script>');
		}	
		tableaucree = true;
		maxP = tabPhrasesText.length;
		if(phrase && phrase>=(maxP-1)){
			// change l'url "suivant"
			nextUrl='exDragdrop' + ext + '?l='+l;
		}
}

function affiche(){

	leTexte = tabPhrasesText[phrase][0];
	laTraduction = tabPhrasesText[phrase][1];
	leMot = tabPhrasesText[phrase][2];

	var laPhrase = laTraduction.split('.');
	phraseComplete = laPhrase[0] + ' ' + leMot ;
	for (i=1; i< laPhrase.length;i++){

		if(laPhrase[i]== '' || laPhrase[i]== ' '){}
		else {
			phraseComplete = phraseComplete + laPhrase[i];}
	}
	changePhrase();
	afficheLecon();
	document.getElementById('affMots').style.visibility='hidden'
	document.getElementById('affTrad').style.visibility='hidden'
	document.getElementById(idFocus).value = '';
}
function changePhrase(){

	document.getElementById("numlec").value = showNumP;
	document.getElementById('affLangue').innerHTML = leTexte;
	document.getElementById('affMots').innerHTML = phraseComplete;
	
}
function motAmot(id){

	splitPhraseComplete = phraseComplete.split(' ');
	affichage ='';
	if(posMot >= splitPhraseComplete.length){
		posMot = splitPhraseComplete.length -1;
	}
		
			for (j=0; j<=posMot; j++) {
				affichage = affichage + splitPhraseComplete[j] + ' ';
			}
			posMot++ ;
			document.getElementById(id).innerHTML = affichage;
			document.getElementById(id).style.visibility ='visible';
		
}
function complete(id){
	document.getElementById(id).innerHTML = phraseComplete;
	montrer(id);
}
function montrer(id){
	if(document.getElementById(id).style.visibility=='visible'){
		document.getElementById(id).style.visibility='hidden';
	}
	else {
		document.getElementById(id).style.visibility='visible';
	}
}

function toPhrase(){
choice= parseInt(document.getElementById('numlec').value) ;


	if(choice >=maxP || choice<0 || isNaN(choice)){
		alert('cette phrase n\'existe pas.');
		document.getElementById('numlec').value = phrase-1;
	}
	else{
		
		p=choice;
		phrase=parseInt(choice);
		toUrl();
		cacher();
		affiche();

	}
}

var idFocus;
idFocus='zoneSaisie';

function caractere(l)
	{
		btn = parseInt(l,16);
		btn = String.fromCharCode(btn);
		tempTexte = document.getElementById(idFocus).value;

		tempTexte = tempTexte + btn;
		document.getElementById(idFocus).value = tempTexte;
		document.getElementById(idFocus).focus();
	
	}

function aide(){
	// texte aide contextuelle	
var textAide = '<p>Vous devez traduire la phrase en l\'inscrivant avec votre clavier dans la zone de droite situ&egrave;e sous la phrase.</p>';
textAide = textAide + '<p>Vous pouvez &agrave; tout moment vous faire aider via la fonction Traduction mot &agrave; mot, et si vous s&egrave;chez vraiment, en obtenant la r&egrave;ponse en cliquant sur Traduction compl&eacute;te.</p>';
textAide = textAide + '<p>Pour passer d\'une phrase &agrave; l\'autre, vous devrez cliquer sur le bouton suivant <img src="../assimilV2commun/images/aide/Fdw.gif" alt="" align="absmiddle" />. Vous pourrez bien entendu revenir en arri&eacute;re <img src="../assimilV2commun/images/aide/Rw.gif" alt="" align="absmiddle" /> ou vous rendre directement sur une phase en ins&egrave;rant le chiffre en en cliquant sur OK <img src="../assimilV2commun/images/aide/Ok.gif" alt="" align="absmiddle" />.</p>';
textAide = textAide + '<p>Une fois cet exercice termin&egrave;, vous pourrez vous rendre dans la partie Mots Manquants en cliquant sur <img src="../assimilV2commun/images/aide/Fdw.gif" alt="" align="absmiddle" /> lorsque vous &ecirc;tes &agrave; la derni&eacute;re phrase, ou directement en cliquant sur l\'image Mots Manquants <img src="../assimilV2commun/images/aide/Exo.gif" alt="" align="absmiddle" /> en haut de la page.</p>';
 document.getElementById('innerAide').innerHTML = textAide;
}