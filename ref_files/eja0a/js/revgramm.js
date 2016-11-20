
// preload images 
var chemin = '../assimilV2commun/images/';
var liste_images = new Array('blank.gif','imgsMenu/btFw-down.gif','imgsMenu/btFw-over.gif','imgsMenu/btHelp-down.gif','imgsMenu/btHelp-over.gif','imgsMenu/btHome-down.gif','imgsMenu/btHome-over.gif','imgsMenu/btOk-down.gif','imgsMenu/btReload-down.gif','images/imgsMenu/btReload-over.gif','imgsMenu/btRw-down.gif','imgsMenu/btRw-over.gif','imgsMenu/btTools-down.gif','imgsMenu/btTools-over.gif','imgsMenu/BtPrint-over.gif','imgsMenu/BtPrint-down.gif','imgsMenu/BtLoupe-over.gif','annexes/AnxGramLex-over.gif','annexes/AnxGramLex-down.gif','annexes/AnxLexGram-over.gif','annexes/AnxLexGram-down.gif','imgsL7/BtL7Recap-over.gif','imgsL7/BtL7Recap-down.gif','images/aide.gif');

// js commun
var chemin = 'images/';
document.image_chargee = new Array();
function prechargement() {
	
	for ( i = 0; i < liste_images.length; i++ ) {
		document.image_chargee[i] = new Image;
		document.image_chargee[i].src = chemin + liste_images[i] ;
	}
}

// ouvre la fenetre en plein ecran (IE)
//window.resizeTo (window.screen.width,window.screen.height);

var l = get('l'); //numero lecon (asp)
var p=''; // pas de phrase
var m = get('m'); // module
if (l<1) {
	l=1;
}

var url = new String(document.location);

if (url.indexOf ('?')>0){
	url = url.substring (0,url.indexOf ('?'));
	}
	
var nextUrl ='dialogueRecap' + ext + '?l=' + l + '&m=' + m + '&num=' + num; // url du bouton suivant
var loupeOn = false;
function loupe(){
	if(loupeOn==false){
		document.getElementById('central').className='centreloupe';
		loupeOn = true;
		}
	else{
		document.getElementById('central').className='centre';
		loupeOn = false ;
		}
}

function imprimer(){
	if (window.print){
		if (confirm('impimer cette page ?')){
		
			window.print();
		}
	}
}
var xmlOutput='';
function parseXml(){
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

	if( ext=='.html'){
		var xslSheet =  'xml/revGrammaticale.xsl' ;
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
						
		     //xslProc.addParameter("numero", document.form1.code.value);
		     xslProc.transform();
			xmlOutput = xslProc.output;
	
		}	

		tableaucree = true;
	
}

function affiche(){

	document.getElementById('central').innerHTML = xmlOutput ;
	numLecon();
}
function numLecon(){

	if(l){
			document.getElementById('affLecon').innerHTML='R&#233;visions le&#231;on ' + l ;
		}
}

function aide(){
	// texte aide contextuelle
var textAide ='<p>Vous pouvez lire ou imprimer si vous le souhaitez cette partie, en cliquant sur le bouton <img src="../assimilV2commun/images/aide/Print.gif" alt="" /></p>';
 textAide= textAide + '<p>Vous pouvez &eacute;galement agrandir la taille des caract&egrave;res en cliquant sur le bouton <img src="../assimilV2commun/images/aide/Loupe.gif" alt="" /></p>';
 textAide = textAide + '<p>Le bouton suivant, ainsi que le lien "exercices" vous emm&egrave:nent &agrave; l\'exercice.</p>';

 
  document.getElementById('innerAide').innerHTML = textAide;
}
