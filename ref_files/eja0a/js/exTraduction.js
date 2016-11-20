
// preload images 
var chemin = '../assimilV2commun/images/';
var liste_images = new Array('blank.gif','imgsMenu/btFw-down.gif','imgsMenu/btFw-over.gif','imgsMenu/btHelp-down.gif','imgsMenu/btHelp-over.gif','imgsMenu/btHome-down.gif','imgsMenu/btHome-over.gif','imgsMenu/btOk-down.gif','imgsMenu/btReload-down.gif','imgsMenu/btReload-over.gif','imgsMenu/btRw-down.gif','imgsMenu/btRw-over.gif','imgsMenu/btTools-down.gif','imgsMenu/btTools-over.gif','imgsExoTrad/ExoTradApp-over.gif','imgsExoTrad/ExoTradApp-down.gif','edl0a/BtPAEspMMC.gif','edl0a/BtPAEspMMO.gif','imgsExoTrad/AppPronBtMot-over.gif','imgsExoTrad/AppPronBtPhrase-over.gif','images/aide.gif','edl0a/BtPAEspThemeC.gif','edl0a/BtPAEspMMC.gif');


document.image_chargee = new Array();
function prechargement() {
	
	for ( i = 0; i < liste_images.length; i++ ) {
		document.image_chargee[i] = new Image;
		document.image_chargee[i].src = chemin + liste_images[i] ;
	}
}

// ouvre la fenetre en plein ecran (IE)
//window.resizeTo (window.screen.width,window.screen.height);
// fichiers sons
var cheminSons = 'eja0a/sons/';

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
	
	nextUrl = url + '?l=' + l + '&p=' + (parseInt(p)+1) +'&m=' + m + '&num=' + num;

	
	prevUrl = url + '?l=' + l + '&p=' + (parseInt(p)-1) +'&m=' + m + '&num=' + num;
	
	// concatene le numero de lecon
	if(l<=9){
				lecon = '00' + l;
			}
	else if(l<=99){
				lecon = '0' + l;
			}
			
	else {
		lecon = l;
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
var tabPhrasesText = new Array();

function parseXml(){
	if( ext=='.html'){
		var xslSheet =  'xml/exTraduction.xsl' ;
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
			if(l>=49){
				nextUrl='exTraductionTheme' + ext + '?l=' + l + '&m=' + m + '&num=' + num;
				}
			else {
				nextUrl='exMotsManquants' + ext + '?l=' + l + '&m=' + m + '&num=' + num;
			}
			
		}

}


function affiche(){
	leTexte = tabPhrasesText[phrase][0];
	laTraduction = tabPhrasesText[phrase][1];
	
	document.getElementById("numlec").value = showNumP;
	document.getElementById('affLangue').innerHTML = leTexte;
	document.getElementById('affMot').innerHTML = laTraduction;
	afficheLecon();
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
	choice = choice;
}

	if(choice >=maxP || choice<0 || isNaN(choice)){
		alert('cette phrase n\'existe pas.');
		document.getElementById('numlec').value = phrase-1;
	}
	else{
		nextUrl = url + '?l=' + l + '&p=' + choice +'&m=' + m + '&num=' + num;
		document.location = nextUrl;
	}
}
function aide(){
	// texte aide contextuelle
var textAide ='<p><img src="/assimilV2Commun/images/aide/compare.gif" alt="" style="float:right;" />Les boutons affich&#233;s vous permettent d\'&#233;couter la phrase, vous enregistrer et vous r&#233;&#233;couter.</p><p><strong>Enregistrement </strong><br />Un message vous averti que la fonction d\'enregistrement va acc&#232;der &#224; internet.<img src="/assimilV2Commun/images/aide/flash1.gif" alt="" style="float:right;" />Vous devez accepter.</p><p>Pour ne plus recevoir ce message faites un clic droit sur l\'un des boutons, choisissez "param&#232;tres"<img src="/assimilV2Commun/images/aide/flash4.gif" alt="" style="float:right;" /></p><p>Puis cochez la case m&#233;moriser.<img src="/assimilV2Commun/images/aide/flash3.gif" alt=""  style="float:right;" /></p>';
 document.getElementById('innerAide').innerHTML = textAide;
}
