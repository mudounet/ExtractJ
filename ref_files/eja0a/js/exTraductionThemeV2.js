// preload images 

var chemin = '../assimilV2Commun/images/';
var liste_images = new Array('blank.gif','imgsMenu/btFw-down.gif','imgsMenu/btFw-over.gif','imgsMenu/btHelp-down.gif','imgsMenu/btHelp-over.gif','imgsMenu/btHome-down.gif','imgsMenu/btHome-over.gif','imgsMenu/btOk-down.gif','imgsMenu/btReload-down.gif','imgsMenu/btReload-over.gif','imgsMenu/btRw-down.gif','imgsMenu/btRw-over.gif','imgsMenu/btTools-down.gif','imgsMenu/btTools-over.gif','phaseActive/BtTradMotLight-over.gif','phaseActive/BtTradMotLight-over.gif','imgsExoTrad/ExoTradApp-down.gif','imgsExoTrad/ExoTradApp-over.gif','edl0a/BtPAEspMMO.gif','edl0a/BtPAEspMMC.gif','edl0a/BtPAEspVersioO.gif','edl0a/BtPAEspVersioC.gif');


document.image_chargee = new Array();
function prechargement() {
	
	for ( i = 0; i < liste_images.length; i++ ) {
		document.image_chargee[i] = new Image;
		document.image_chargee[i].src = chemin + liste_images[i] ;
	}
}

// ouvre la fenetre en plein ecran (IE)
//window.resizeTo (window.screen.width,window.screen.height);
// repertoire sons

var xmlOutput='';

var leTexte;
var laTraduction;
var posMot=0;

var l = get('l'); //numero lecon (asp)
var m = get('m'); // module
if (l<1) {
	l=1;
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
var idSon ='';

var showNumP=''
var maxP ; // phrase maxi (asp /js)

if (url.indexOf ('?')>0){
	url = url.substring (0,url.indexOf ('?'));
}


toUrl ();

function toUrl(){
	
	nextUrl = url + '?l=' + l + '&p=' + (parseInt(p)+1);
	
	prevUrl = url + '?l=' + l + '&p=' + (parseInt(p)-1);
	
	// correspondance avec lecon premiere vague
	//lecon= l;
	lecon =  leconActive(l);
	// concatene le numero de lecon
	if(lecon<=9){
				lecon = '00' + lecon;
			}
	else if(lecon<=99){
				lecon = '0' + lecon;
			}
	if(l==51 && p==2){p=3;}
	if (p==1) {
		// numero lecon
		
		showNumP= 0;
		phrase=0;
			}
	else if (p==2)
	 {
		// titre
	
		showNumP= 0;
		phrase=1;
	 }
	else {
		// phrase
		phrase=p-1;
		showNumP = (parseInt(p)-2);
		}
}
function next(){

	if(parseInt(p)>=(maxP)){
		exMotManquant();
		
	}
	else{
		p ++;
		toUrl();
		cacher();
		affiche();
	}

}
function prev(){

	if(parseInt(p)<=0 ){
		//alert('premiere phrase');
		}
	else{
		if(p>1){p -- ;}
		toUrl();
		cacher();
		affiche();
	}

}
var tabPhrasesText = new Array();

function parseXml(){
	if( ext=='.html'){
		var xslSheet =  'xml/apprentissage.xsl' ;
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
	

}
function affiche(){
if(tabPhrasesText[phrase]){

	leTexte = tabPhrasesText[phrase][1];
	laTraduction = tabPhrasesText[phrase][0];
	
	document.getElementById("numlec").value = showNumP;
	document.getElementById('affLangue').innerHTML = leTexte;
	document.getElementById('affMot').innerHTML = laTraduction;

	afficheLecon(2);
	showNumActive(l);
	clearText();
}
}
function complete(id){
	document.getElementById(id).innerHTML = laTraduction;
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
function cacher(){
	document.getElementById('affMot').style.visibility='hidden';

}
function motAmot(id){

	splitPhraseComplete = laTraduction.split(' ');
	affichage ='';
	if(posMot >= splitPhraseComplete.length){
		posMot = splitPhraseComplete.length -1;
	}
	for (j=0; j<=posMot; j++) {
		affichage = affichage + splitPhraseComplete[j] + ' ';
		}
	posMot++ ;
	document.getElementById(id).innerHTML = affichage;
	document.getElementById(id).style.visibility='visible';
}

function toPhrase(){
choice= parseInt(document.getElementById('numlec').value) ;
if(choice>0){
	choice = parseInt(choice) + 2; // decalage numero lecon et titre
}
	if(choice >maxP || choice<0 || isNaN(choice)){
		alert('cette phrase n\'existe pas.');
		document.getElementById('numlec').value = phrase-1;
	}
	else{
		nextUrl = url + '?l=' + l + '&p=' + choice + '&m=' + m;
		document.location = nextUrl;
	}
}
function leconActive(n){
	// correspondance lecon phase active / lecon
	//laLecon = n - 49 + Math.floor((n-50)/6);
	laLecon = tabActive[n];
	return laLecon;
}
function showNumActive(n){
	n = 'reprise de la le&#231;on ' + leconActive(n);
	document.getElementById('affLeconActive').innerHTML = n;
}

function aide(){
	// texte aide contextuelle
var textAide = '<p>Vous devez traduire la phrase en l\'inscrivant avec votre clavier dans la zone de droite situ&eacute;e sous la phrase.</p>';
 textAide= textAide + '<p>Vous pouvez &agrave; tout moment vous faire aider via la fonction Traduction mot &agrave; mot, et si vous s&eacute;chez vraiment, en obtenant la r&eacute;ponse en cliquant sur phrase compl&egrave;te.</p>';
 textAide= textAide + '<p>Pour passer d\'une phrase &agrave; l\'autre, vous devrez cliquer sur le bouton suivant <img src="../assimilV2commun/images/aide/Fdw.gif" alt="" align="absmiddle" />. Vous pourrez bien entendu revenir en arri&egrave;re <img src="../assimilV2commun/images/aide/Rw.gif" alt="" align="absmiddle" /> ou vous rendre directement sur une phase en ins&eacute;rant le chiffre en en cliquant sur OK <img src="../assimilV2commun/images/aide/Ok.gif" alt="" align="absmiddle" />.</p>';
 textAide= textAide + '<p>Une fois cet exercice termin&eacute;, vous pourrez vous rendre dans la partie Mots Manquants en cliquant sur <img src="../assimilV2commun/images/aide/Fdw.gif" alt="" align="absmiddle" /> lorsque vous &ecirc;tes &agrave; la derni&egrave;re phrase, ou directement en cliquant sur l\'image Mots Manquants <img src="../assimilV2commun/images/aide/MM.gif" alt="" align="absmiddle" /> en haut de la page, ';
 textAide = textAide + 'ou vous rendre &agrave; l\'exercice de traduction Allemand-Fran&ccedil;ais.<br/> </p>';
 document.getElementById('innerAide').innerHTML = textAide;
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
function clearText(){
 document.getElementById(idFocus).value='';
}