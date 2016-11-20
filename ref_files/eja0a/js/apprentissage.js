// preload images 
var chemin = '../assimilV2commun/images/';
var liste_images = new Array('blank.gif','imgsMenu/btFw-down.gif','imgsMenu/btFw-over.gif','imgsMenu/btHelp-down.gif','imgsMenu/btHelp-over.gif','imgsMenu/btHome-down.gif','imgsMenu/btHome-over.gif','imgsMenu/btOk-down.gif','imgsMenu/btReload-down.gif','imgsMenu/btReload-over.gif','imgsMenu/btRw-down.gif','imgsMenu/btRw-over.gif','imgsMenu/btTools-down.gif','imgsMenu/btTools-over.gif','imgsAppTrad/AppPronBtNotes-over.gif','imgsAppTrad/AppPronBtTrad-over.gif','imgsAppTrad/AppPronExo-down.gif','imgsAppTrad/AppPronExo-over.gif','imgsAppTrad/AppPronEcou-over.gif','imgsAppTrad/AppPronEcou-down.gif','aide.gif');


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
var laPrononciation;
var laTraduction;
var noteVisible = false;

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


if(l==52 && p==2){p=3;} //pas de titre lecon 52

var phrase;	
var lecon='';                  
var url = new String(document.location);
url = url.replace(/#/gi,'');
var nextUrl;               
var prevUrl;               
var idSon ='';

var showNumP=''
var maxP ; // phrase maxi 

if (url.indexOf ('?')>0){
	url = url.substring (0,url.indexOf ('?'));
}


toUrl ();

function toUrl(){
	
	nextUrl = url + '?l=' + l + '&p=' + (parseInt(p)+1) +'&m=' + m + '&num=' + num;

	
	prevUrl = url + '?l=' + l + '&p=' + (parseInt(p)-1)+'&m=' + m + '&num=' + num;
	
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
	if (p==1) {
		// son=numero lecon
		idSon = lecon ;
		showNumP= 0;
		phrase=0;
			}
	else if (p==2)
	 {
		// son=titre
		idSon = lecon + 'T' ;
		showNumP= 0;
		phrase=1;
	 }
	else {
		// son=phrase
		phrase=parseInt(p)-1;
			if(parseInt(p)<=11){
			// nom du fichier ogg
			idSon = lecon + 'D' +'0' + (parseInt(p)-2) ;
		}
		else {
			// nom du fichier ogg
			idSon = lecon + 'D' + (parseInt(p)-2) ;
		}
		
		showNumP = (parseInt(p)-2);
	
	}

}
// var tabPhrasesText = new Array();
// var tabNotes = new Array();

function parseXml(){
	if( ext=='.html'){
		var xslSheet =  'xml/apprentissage.xsl' ;
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
			document.writeln ('<script type="text/javascript">'); 
			document.writeln (xmlOutput);
			document.writeln ('</script>');
	}	
		tableaucree = true;
		maxP = tabPhrasesText.length;

		if(phrase && phrase>=(maxP-1)){
			// change l'url "suivant"
			if(l>49){
				nextUrl='exTraductionActive' + ext + '?l=' + l +'&m=' + m + '&num=' + num;
			}
			else {
				nextUrl='exTraduction' + ext + '?l=' + l +'&m=' + m + '&num=' + num;
			}
		}
}
function affiche(){
	cacheNote();
	leTexte = tabPhrasesText[phrase][0];
	laTraduction = tabPhrasesText[phrase][1];
	laPrononciation = tabPhrasesText[phrase][2];
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
if(choice>0){
	choice = parseInt(choice) + 2;
}

	if(choice >maxP || choice<0 || isNaN(choice)){
		alert('cette phrase n\'existe pas.');
		document.getElementById('numlec').value = phrase-1;
	}
	else{
		nextUrl = url + '?l=' + l + '&p=' + choice +'&m=' + m + '&num=' + num;
		document.location = nextUrl;
	}
}


function montrerNote(){

 n=(parseInt(p)-1);

 if(noteVisible==false){
// entete = '<div class="teteNote"><span class="titreNote">Notes de la le&#231;on<a href="javascript:fermerNote();" title="Fermer"></span><img src="images/closeNote.gif" alt="Fermer" align="middle"></a></div>';
entete = '';
document.getElementById('affNotes').style.backgroundImage = 'url(../assimilV2Commun/images/notes/Notes.gif)';
 	if(tabNotes[n]){
		if (tabNotes[n]=='' || tabNotes[n] =='undefined'){
			//alert('pas de note');
			fermerNote();
			}
		else { 
			//entete = document.getElementById('affNotes').innerHTML;
			document.getElementById('innernote').innerHTML = entete + '<div id="lanote" class="note">' + tabNotes[n] +'</div>' ;
			document.getElementById('affNotes').style.display = 'block';	
			noteVisible=true;	
			}
		}
	else { 
			//alert('pas de note');
			fermerNote();
		}
	}
	else {
		noteVisible= false;
		fermerNote();
	}

}
function fermerNote(){
	noteVisible= false;
	document.getElementById('affNotes').style.display='none';
}
function cacheNote(){
	n=(parseInt(p)-1);
	if(!tabNotes[n]){ 
	
	document.getElementById('notes').innerHTML = '<img src="../assimilV2Commun/images/notes/cacheNote.gif" width="125" height="19" alt="" />';
	}
}
function lesNotes(){
	for (i=0;i<tabNotes.length;i++){
	
		alert(i + ' :: ' + tabNotes[i] );
	}
}


function aide(){
	// texte aide contextuelle
var textAide ='<p><img src="/assimilV2Commun/images/aide/compare.gif" alt="" style="float:right;" />Les boutons affich&#233;s vous permettent d\'&#233;couter la phrase, vous enregistrer et vous r&#233;&#233;couter.</p><p><strong>Enregistrement </strong><br />Un message vous averti que la fonction d\'enregistrement va acc&#232;der &#224; internet.<img src="/assimilV2Commun/images/aide/flash1.gif" alt="" style="float:right;" />Vous devez accepter.</p><p>Pour ne plus recevoir ce message faites un clic droit sur l\'un des boutons, choisissez "param&#232;tres"<img src="/assimilV2Commun/images/aide/flash4.gif" alt="" style="float:right;" /></p><p>Puis cochez la case m&#233;moriser.<img src="/assimilV2Commun/images/aide/flash3.gif" alt=""  style="float:right;" /></p>';
 document.getElementById('innerAide').innerHTML = textAide;
}


function commentaires(){
	if(commentaire != ''){
		document.getElementById('commpron').innerHTML = '<a href=\'javascript:aff_commentaires();\' title=\'Informations sur la prononciation\'><img src=\'images/imgPrononciation.gif\' alt=\'Informations sur la prononciation\'></a>';
	}
}
function aff_commentaires(){
entete = '';

	document.getElementById('affNotes').style.backgroundImage = 'url(images/commentaire.gif)';
	document.getElementById('innernote').innerHTML = entete + '<div id="lanote" class="note">' + commentaire +'</div>' ;
	document.getElementById('affNotes').style.display = 'block';	
		
}

function cachePrononciation(){
	if(laPrononciation == ''){
		document.getElementById('prononciation').innerHTML = '<img src=\'images\\cachePrononciation.gif\' alt=\'\'/>';	
	}
}

