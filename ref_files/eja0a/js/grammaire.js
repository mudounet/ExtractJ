
// preload images 
var chemin = '../assimilV2commun/images/';
var liste_images = new Array('blank.gif','imgsMenu/btFw-down.gif','imgsMenu/btFw-over.gif','imgsMenu/btHelp-down.gif','imgsMenu/btHelp-over.gif','imgsMenu/btHome-down.gif','imgsMenu/btHome-over.gif','imgsMenu/btOk-down.gif','imgsMenu/btReload-down.gif','images/imgsMenu/btReload-over.gif','imgsMenu/btRw-down.gif','imgsMenu/btRw-over.gif','imgsMenu/btTools-down.gif','imgsMenu/btTools-over.gif','annexes/AnxGramLex-over.gif','annexes/AnxGramLex-down.gif','annexes/AnxGramLex-over.gif','annexes/AnxLexGram-down.gif','imgsMenu/btLexFA.gif','imgsMenu/btLexAF-over.gif','imgsMenu/btLexFA-over.gif');

// js commun

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
	
var nextUrl =''; // url du bouton suivant

var urlOrigine = get('url');
if (urlOrigine==''){
	//swicth grammaire /lexique
	if(url.indexOf ('lexique')>0){
		nextUrl = 'appendiceGrammatical' + ext +'?l=' + l +'&m=' + m + '&url=' + urlOrigine ;
		}
	else {
		nextUrl = 'lexiqueAF' + ext +'?l=' + l +'&m=' + m + '&url=' + urlOrigine ;

	}
}
else {
	//retour page origine
	nextUrl = urlOrigine +'?l=' + l + '&m=' +m + '&num=' + num;
}

function lexiqueRF(){
	document.location = 'lexiqueRF' + ext + '?l=' + l+'&m=' + m + '&num=' + num;
} 
function lexiqueFR(){
	document.location = 'lexiqueFR' + ext + '?l=' + l+'&m=' +m + '&num=' + num;
} 
function aide(){
	// texte aide contextuelle
 
var textAide = '<p>Cette partie vous explique de mani&egrave;re synth&eacute;tique les &eacute;l&eacute;ments principaux de la grammaire de la langue.</p><p>Vous pouvez vous rendre &agrave; la partie Lexique en cliquant sur <img src="../assimilV2commun/images/aide/Fdw.gif" alt="" align="absmiddle" />.ou sur <img src="../assimilV2commun/images/aide/Lexique.gif" alt="" align="absmiddle" /> . Vous pouvez &eacute;galement vous rendre sur la page d\'accueil du cours en cliquant sur <img src="../assimilV2commun/images/aide/Home.gif" alt="" align="absmiddle" />.</p>'
textAide = textAide + '<p>Le lexique comprend plusieurs centaine de mots. Le ou les chiffres situ&eacute;s juste apr&egrave;s le mot anglais correspondent &agrave; la le&ccedil;on dans laquelle ils sont utilis&eacute;s.<br/>';
textAide = textAide + 'Vous pouvez passer du Lexique russe-fran&ccedil;ais au lexique lexique fran&ccedil;ais-russe en cliquant sur l\'image <img src="images/btLexFR.gif" alt="" align="absmiddle" /><br/>';
textAide = textAide + 'Vous devez maintenant vous rendre sur la page d\'accueil du cours en cliquant sur <img src="../assimilV2commun/images/aide/Home.gif" alt="" align="absmiddle" /></p>';

 document.getElementById('innerAide').innerHTML = textAide;
}
function toAppendice(n){
	document.location = 'appendiceGrammatical' + ext +'?l=' + n +'&m='  +  m + '&num=' + num;
  }
function toApprentissageNote(n,mm,pp){
	document.location = 'apprentissage' + ext +'?l=' + n +'&m='  +  mm + '&p=' + (parseInt(pp)+2) + '&num=' + num;
  }
function toRevisions(n,mm){
	document.location = 'revGrammaticale' + ext +'?l=' + n +'&m='  +  mm + '&num=' + num;
  }
function imprimer(){
	if (window.print){
		if (confirm('impimer cette page ?')){
		
			window.print();
		}
	}
}