
// preload images 
var chemin = '../assimilV2commun/images/';
var liste_images = new Array('blank.gif','imgsMenu/btFw-down.gif','imgsMenu/btFw-over.gif','imgsMenu/btHelp-down.gif','imgsMenu/btHelp-over.gif','imgsMenu/btHome-down.gif','imgsMenu/btHome-over.gif','imgsMenu/btOk-down.gif','imgsMenu/btReload-down.gif','images/imgsMenu/btReload-over.gif','imgsMenu/btRw-down.gif','imgsMenu/btRw-over.gif','imgsMenu/btTools-down.gif','imgsMenu/btTools-over.gif','annexes/AnxLexIntro-over.gif','annexes/AnxLexIntro-over.gif','annexes/AnxLexPron-over.gif','annexes/AnxLexPron-down.gif','AssimilV2Intro-over.gif','AssimilV2Intro-down.gif');

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

var l = 1 ; // get('l'); //numero lecon (asp)
var p = ''; // pas de phrase
var m = 1 ; // get('m'); // module

if (l<1) {
	l=1;
}

var url = new String(document.location);

if (url.indexOf ('?')>0){
	url = url.substring (0,url.indexOf ('?'));
	}

function aide(){
	// texte aide contextuelle	
 var textAide = '<p>Cette partie vous explique le fonctionnement et le cheminement p&eacute;dagogique de la m&eacute;thode,<br/>puis en cliquant sur suivant <img src="../assimilV2commun/images/aide/Fdw.gif" alt="" /> ou sur prononciation, vous &eacute;tudierez la prononciation allemande.</p>';
 document.getElementById('innerAide').innerHTML = textAide;
}

var idSon = 'INT01';
function son(n)
{
	if(n<=9){n= '0' +n;}
	idSon = 'INT' + n;
	document.getElementById('applet').style.display ='inline';	
	document.getElementById('frameApplet').src = 'frameApplet.html?idSon=' + idSon +'&n=' + num;
	
}

