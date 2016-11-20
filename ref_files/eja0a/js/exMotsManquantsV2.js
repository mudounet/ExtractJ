// preload images 
var chemin = '../assimilV2commun/images/';
var liste_images = new Array('blank.gif','imgsMenu/btFw-down.gif','imgsMenu/btFw-over.gif','imgsMenu/btHelp-down.gif','imgsMenu/btHelp-over.gif','imgsMenu/btHome-down.gif','imgsMenu/btHome-over.gif','imgsMenu/btOk-down.gif','imgsMenu/btReload-down.gif','imgsMenu/btReload-over.gif','imgsMenu/btRw-down.gif','imgsMenu/btRw-over.gif','imgsMenu/btTools-down.gif','imgsMenu/btTools-over.gif','imgsExoTrad/ExoTradApp-over.gif','imgsExoTrad/ExoTradApp-down.gif','imgsExoTrad/ExoTradMot-over.gif','imgsExoMM/ExoMMTrad-over.gif','imgsExoMM/ExoMMTrad-over.gif','imgsExoMM/ExoMMLparL-over.gif','imgsExoMM/ExoMMMparM-over.gif','imgsExoMM/ExoMMTradComp-over.gif','phaseActive/BtPAVersion-over.gif','phaseActive/BtPAVersion-down.gif','images/aide.gif','edl0a/BtPAEspThemeO.gif','edl0a/BtPAEspThemeC.gif','edl0a/BtPAEspVersioO.gif','edl0a/BtPAEspVersioC.gif');


document.image_chargee = new Array();
function prechargement() {
	
	for ( i = 0; i < liste_images.length; i++ ) {
		document.image_chargee[i] = new Image;
		document.image_chargee[i].src = chemin + liste_images[i] ;
	}
}

// ouvre la fenetre en plein ecran (IE)
//window.resizeTo (window.screen.width,window.screen.height);

var xmlOutput='';

var leTexte;
var laTraduction;
var lesMots;
var posMot=0;
var motEnCours=1; // position lettre a lettre
var pComplete=''; //phrase reconstituee

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

var idFocus;
idFocus='';

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
	else{
			lecon=l ;
		}
		// son=phrase
		phrase=parseInt(p);
		if(p<=9){
		showNumP = parseInt(p);
			p = '0' + parseInt(p) ;
					}
	
		// nom du fichier ogg
		idSon = lecon + 'EA' + p ;
	
	
}
function nextPhrase(){
	
	p++;
	
	if(p>=maxP){
		// conclusion
		 conclusion();
	}
	else{
	
		phrase++;
		posMot=0;
		motEnCours=1;
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
		posMot=0;
		motEnCours=1;
		toUrl();
		cacher();
		affiche();
		
	}
}
function cacher(){
	document.getElementById('affTrad').style.visibility='hidden';

}
function changePhrase(){
	document.getElementById("numlec").value = showNumP;
	document.getElementById('affLangue').innerHTML = leTexte;
	document.getElementById('saisie').innerHTML = laTraduction;
}

var tabPhrasesText = new Array();

function parseXml(){

	if( ext=='.html'){
		var xslSheet =  'xml/exMotsManquants.xsl' ;
		var file = 'xml/Lesson_' + lecon + '.xml';
		var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
	 	var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
			
			xslDoc.async = false;
			xslDoc.load(xslSheet);  
			xmlDoc.validateOnParse = false;
			xmlDoc.preserveWhiteSpace = true;
			xmlDoc.load(file);
			
			var xslt = new ActiveXObject("Msxml2.XSLTemplate");
			xslt.stylesheet = xslDoc;
			var xslProc = xslt.createProcessor();
			xslProc.input = xmlDoc;
						
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
			nextUrl='exTraduction' + ext + '?l='+l;
		}
}

function affiche(){
	leTexte = tabPhrasesText[phrase][0];
	laTraduction = remplacePoints(tabPhrasesText[phrase][1]);
	lesMots = tabPhrasesText[phrase][2];
	changePhrase();

	afficheLecon();
}


function remplacePoints(t){
	motsDeLaPhrase = tabPhrasesText[phrase][2].split(' ');
	pComplete='';
	c=0; //compteur points
	n=0; //compteur mots
	f=0; // focus
	r=''; 
	sp = t.split('');
	for (i=0; i<sp.length;i++){
				
		if(sp[i] != '.'){
		// lettre ou espace
			if (c>0){
				e = ((c*10)+2);
				if(c<=2){ e = e+3; }
				z ='<input type="text" style="width:' + e +'px;" id="input' + i + '" onclick="idFocus=this.id;"/> ';
				if(f==0){f='input' + i;}
				r = r + z ;
				pComplete = pComplete + '<b>' + motsDeLaPhrase[n] +'</b>';
				n++;
				c=0;
				
				
			}
			
				if( escape(sp[i])=='%20'){ 
					r = r + ' ' ;
					pComplete = pComplete + ' ' ;
					}
				else{
					r = r + sp[i] ;
					pComplete = pComplete + sp[i] ; 
					}
			
		}
		else {
			// point
			if(i==sp.length-1){
				e = ((c*10)+6);
				if(c==1){ e = e+5; }
				z ='<input type="text" style="width:' + e +'px;" id="input' + c + '" onclick="idFocus=this.id;"> ';
				r = r + z ;
				pComplete = pComplete + '<b>' + motsDeLaPhrase[n] +'</b>';
				n++;
			}
			else{
				c++;
			}
		}
	}
	idFocus= f ;
	return r;
}
function complete(id){
	//document.getElementById(id).innerHTML = lesMots;
	//pComplete = pComplete.replace(' '  + String.fromCharCode(8217) + ' ',String.fromCharCode(8217));
pComplete = noSpace(pComplete);
	document.getElementById(id).innerHTML = pComplete;
	montrer(id);
	}
	
function noSpace(w){
modele =' '  + String.fromCharCode(8217) + ' ';

a = w.indexOf(modele);
	while( a>0){
		w =  w.replace(modele,String.fromCharCode(8217));
		a = w.indexOf(modele);
	}

	return w;
}

function montrer(id){

	if(document.getElementById(id).style.visibility=='visible'){
		document.getElementById(id).style.visibility='hidden';
	}
	else {
		document.getElementById(id).style.visibility='visible';
	}
}
function motAmot(id){

	splitPhraseComplete = lesMots.split(' ');
	affichage ='';
	if(posMot >= splitPhraseComplete.length){
		posMot = splitPhraseComplete.length -1;
	}
		
			for (j=0; j<=posMot; j++) {
				affichage = affichage + splitPhraseComplete[j] + ' ';
			}
			posMot++ ;
			document.getElementById(id).innerHTML = affichage;
			if(document.getElementById(id).style.visibility=='hidden'){
					document.getElementById(id).style.visibility='visible';
				}
}

function Lettre(id){
lt='';	

		lt = lesMots.substring(0,motEnCours);
		motEnCours ++;
		document.getElementById(id).innerHTML = lt ;
		if(document.getElementById(id).style.visibility=='hidden'){
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
		motEnCours=1;
		phrase=parseInt(choice);
		toUrl();
		cacher();
		affiche();

	}
}

function aide(){
		// texte aide contextuelle
	var textAide = '<p>Dans cet exercice, vous devez saisir le ou les  mots manquants avec votre clavier dans la ou les zones de droite situ&eacute;e sous la phrase.</p>';
	 textAide= textAide + '<p>Vous pouvez &agrave; tout moment vous faire aider via la fonction Traduction lettre &agrave; lettre ou Traduction mot &agrave; mot, et si vous s&eacute;chez vraiment, en obtenant la r&eacute;ponse en cliquant sur traduction compl&egrave;te.</p>';
	 textAide= textAide + '<p>Pour passer d\'une phrase &agrave; l\'autre, vous devrez cliquer sur le bouton suivant <img src="../assimilV2commun/images/aide/Fdw.gif" alt="" align="absmiddle" />. Vous pourrez bien entendu revenir en arri&egrave;re <img src="../assimilV2commun/images/aide/Rw.gif" alt="" /> ou vous rendre directement sur une phase en ins&eacute;rant le chiffre en en cliquant sur OK <img src="../assimilV2commun/images/aide/OK.gif" alt="" align="absmiddle" />.</p>';
	 textAide= textAide + '<p>Une fois cet exercice termin&eacute;, vous pourrez allez vous rendre &agrave; la conclusion de la le&ccedil;on en cliquant sur <img src="../assimilV2commun/images/aide/Fdw.gif" alt="" align="absmiddle" /> lorsque vous &ecirc;tes &agrave; la derni&egrave;re phrase.</p>';
	
	 document.getElementById('innerAide').innerHTML = textAide;

}

function caractere(l)
	{
		btn = parseInt(l,16);
		btn = String.fromCharCode(btn);
		tempTexte = document.getElementById(idFocus).value;

		tempTexte = tempTexte + btn;
		document.getElementById(idFocus).value = tempTexte;
		document.getElementById(idFocus).focus();
	
	}