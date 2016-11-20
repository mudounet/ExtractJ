// preload images 

var liste_images = new Array('blank.gif','imgsMenu/btFw-down.gif','imgsMenu/btFw-over.gif','imgsMenu/btHelp-down.gif','imgsMenu/btHelp-over.gif','imgsMenu/btHome-down.gif','imgsMenu/btHome-over.gif','imgsMenu/btOk-down.gif','imgsMenu/btReload-down.gif','imgsMenu/btReload-over.gif','imgsMenu/btRw-down.gif','imgsMenu/btRw-over.gif','imgsMenu/btTools-down.gif','imgsMenu/btTools-over.gif','imgsExoTrad/ExoTradApp-over.gif','imgsExoTrad/ExoTradApp-down.gif');
var chemin = '../assimilV2commun/images/';

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
var lesMots;
var tabAlea;
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
// variables gestion deplacer           
var resultat=0;
var currentMot='';
var motSelectionne='';
var spanMotSelectionne='';
var destination='';
var click=false;
var tabResult = new Array();

var showNumP=''
var maxP ; // phrase maxi (asp /js)

if (url.indexOf ('?')>0){
	url = url.substring (0,url.indexOf ('?'));
}


toUrl ();

function toUrl(){

		lecon=l;
		showNumP = parseInt(p);
		p = parseInt(p) ;

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
		toUrl();
		cacher();
		affiche();
		
	}
}

var tabPhrasesText = new Array();

function parseXml(){

	if( ext=='.html'){
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

		var xslSheet =  'xml/ex7dragdrop.xsl' ;
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
phrases ();
}
var lesMots = new Array();
var lesPhrases = '' ;

function affiche(){
	document.getElementById('central').innerHTML = lesPhrases ;
	afficheMots();
	afficheLecon(0);
}

function montrer(id){

	if(document.getElementById(id).style.visibility=='visible'){
		document.getElementById(id).style.visibility='hidden';
	}
	else {
		document.getElementById(id).style.visibility='visible';
	}
}


function phrases (){
	
	for (i=1;i<maxP;i++){
		unePhrase (i);
		unMot (i);
	}
	
}
function unePhrase  (j){
	
	laphrase = tabPhrasesText[j][1]	
		// suppression du dernier point
	
	if(laphrase.charAt(parseInt(laphrase.length)-1)=='.' && laphrase.charAt(parseInt(laphrase.length)-2)!='.'){
		laphrase = laphrase.substr(0,(laphrase.length-1));
	}	

	ph = laphrase.split('.') ;
	
	var pComplete = '';
	var emplacement='';
	var longueur=0;
	for (k=0;k<ph.length;k++){
	
		if(ph[k]==''){
					
			longueur ++ ;
			emplacement = tabPhrasesText[j][2];
		}
		else {
			if(emplacement != ''){
				if (longueur>1){
				 // span emplacement du mot
				emplacement = '<span id="emp' + j +'" class="emplacement" onclick="leClick(this.id,' + j + ');" onselectstart="return(false);" >' + '...........' + '</span>';
				pComplete = pComplete + ' ' +  emplacement + '&nbsp;';
				emplacement = '';
				longueur = 0;
				}
			}
			pComplete = pComplete + ph[k];
		}
	}
	pComplete = '<div class="phrase" id="phrase' + j + '" onselectstart="return(false);" title="' + tabPhrasesText[j][0] + '"><div id="result' + j + '" class="result" style="display:inline;"></div> ' + pComplete + '</div>';
	
	lesPhrases = lesPhrases + pComplete ;
}

function unMot(j){
	// place les mots dans un tableau
	leMot = tabPhrasesText[j][2] ;
	lesMots[j] =  leMot 
	}

function afficheMots (){
	var textBulle = 'Cliquez sur le mot choisi puis sur l\'emplacement où le placer.';
	aff='';
	alea(parseInt(lesMots.length)-1); // cree le tableau de classement aleatoire
	
	for (i=0; i<tabAlea.length; i++){
		aff = aff + '<div id="mot' + tabAlea[i] + '" class="mot" style="position:relative;left:0px; top:0px," onmousedown="motchoisi(this.id,' + i + ');" onselectstart="return(false);" title="Cliquez sur le mot choisi puis sur l\'emplacement o&#xF9; le placer.">' +  lesMots[tabAlea[i]+1] + '</div>';
	}
	aff= aff + '<span id="annuler" class="annuler" onclick="annulerDernier()">Annuler</span>';
	document.getElementById('mots').innerHTML = aff;

}



function alea(n){

	tabAlea = new Array(n) ;
	var j='x';
	
	for (i=0; i<tabAlea.length; i++){
		var c = 0;		
				while (c==0){
				
						j = Math.floor((Math.random()*n));
						for (k=0; k<tabAlea.length; k++){
						// elimine numeros deja pris
							if(tabAlea[k]==j){
								 c=0; // numero deja dans le tableau on recommence		
								 break; 					
							}
							else {
								c=1; // numero non pris continue le parcours du tableau
							}
						}
				}
			tabAlea[i]=j;
	}
}


// gestion deplacement et resultats

function motchoisi(id,i){
	// un mot est selectionne
	if(click){
		// un mot est deja selectionne remet la couleur de fond d'origine
		document.getElementById(spanMotSelectionne).style.backgroundColor='#FFFFFF';
	}
	document.getElementById(id).style.backgroundColor='#98987A';
	click=true; // clik en cours
	spanMotSelectionne=id;
	motSelectionne=id.substr(3,id.length-1);
	document.getElementById('annuler').style.display = 'none';
}

function leClick(id,j){
	mt = lesMots[parseInt(motSelectionne) +1 ];
	if(click){
		if(isNaN(tabResult[j])||tabResult[j]==''){
			document.getElementById(id).style.width='';
			document.getElementById(id).innerHTML=mt;
			document.getElementById(id).style.color='#98987A';
			document.getElementById(id).style.fontWeight='bold';
			destination=id;
				// renseigne le tableau de resultats 
			tabResult[j]=parseInt(motSelectionne)+1;
			resultat ++;
			clearMotPlace();
			if (resultat==(maxP-1)){
				fin();
			}
		}
		else {
			//place occupée
		}
	}
	else {
		// annuler ce mot ? > affiche la fonction annuler
		annuleUnMot(id);
	}
}

function clearMotPlace(){

	click=false;
	document.getElementById(spanMotSelectionne).style.backgroundColor='#FFFFFF';
	document.getElementById(spanMotSelectionne).style.visibility = 'hidden';
	// affiche la fonction annuler
	//document.getElementById('annuler').style.display = 'inline';
}

function annulerDernier(){
	if(spanMotSelectionne){
		// annule le dernier mouvement;
		document.getElementById(spanMotSelectionne).style.backgroundColor='#FFFFFF';
		document.getElementById(spanMotSelectionne).style.visibility = 'visible';
		document.getElementById('annuler').style.display = 'none';
		
		i = destination.substr(3,destination.length);
		document.getElementById(destination).innerHTML = tabPhrasesText[i][2];
		document.getElementById(destination).style.color ='#E0E6D7';
		document.getElementById(destination).style.width='40px';
		tabResult[i]='';
		resultat --;
	}
	
}

function annuleUnMot(id){

	motasupprimer =tabResult[id.substr(3,id.length)]-1 ;
	if(isNaN(motasupprimer)){ }
	else{
		destination = id;
		spanMotSelectionne= 'mot' + motasupprimer;
		document.getElementById('annuler').style.display = 'inline';
	}
}

function fin(){
	//tous les champs sont renseignés
	r=0;
	for (i=1;i<tabResult.length;i++){
		if(parseInt(tabResult[i])==i){
		r++;			
		}
	}
	msg = r + ' sur ' + (parseInt(tabResult.length)-1);
	if(r ==(parseInt(tabResult.length)-1)) {
		msg =  msg +'<br/>Bravo, ';
	}
	msg='Vous avez termin&#233;<br/>R&#233;sultat :<br/>' + msg + '<br/><ul class="fin"><li><a href="javascript:reponses();" class="fin">voir les r&#233;ponses</a></li><li><a href="javascript:recharger();" class="fin">recommencer</a></li></ul>';
	document.getElementById('fin').innerHTML = msg;
	document.getElementById('fin').style.display='block';
	
}
function montreResultats(){
	for (i=1;i<=tabAlea.length;i++){
			sp = 'result'+ i  ;
			document.getElementById(sp).style.display = 'inline';	
	}
	
}
function reponses(){
	couleur='';
	for (i=1;i<=tabAlea.length;i++){
		destination = 'emp' + i;
		if(parseInt(tabResult[i])==i){
			couleur ='#05BA15';
		}
		else {couleur='#AD230C'; }
		
		document.getElementById(destination).innerHTML = tabPhrasesText[i][2];
		document.getElementById(destination).style.color = couleur;
		document.getElementById(destination).style.fontWeight='normal';
		montreResultats;
	}

}
function aide(){
	// texte aide contextuelle	
 var textAide = '<p>Dans cet exercice, vous devez replacer les mots de la colonne de droite (les mots &agrave; replacer), dans les bons emplacements gris situ&eacute; dans chacune des phrases.</p>';
	textAide = textAide + '<p>Pour cela, il faut s&eacute;lectionner un mot de la partie droite en cliquant une fois dessus, puis d&eacute;placer votre curseur jusqu\'au bon emplacement gris de l\'une des phrases, et cliquer sur cet emplacement gris.<br />Le mot se positionnera alors dans la case.</p>';
	textAide = textAide + '<p>En cas d\'erreur vous pouvez annuler le placement d\'un mot en cliquant sur le mot puis sur le lien "annuler" qui apparait &agrave; droite.</p>';
	textAide = textAide + '<p>Une fois tous les mots replac&eacute;s, votre r&eacute;sultat s\'affichera, et vous pourrez alors soit voir les bonnes r&eacute;ponses, soit recommencer.</p>';
	textAide = textAide + '<p>En cas d\'erreur vous pouvez annuler le placement d\'un mot en cliquant sur le mot puis sur le lien "annuler" qui apparait &agrave; droite.</p>';
	textAide = textAide + '<p>Une fois cet exercice termin&eacute;, vous vous rendrez &agrave; la conclusion en cliquant sur <img src="../assimilV2commun/images/aide/Fdw.gif" alt="" align="absmiddle" />.</p<';
	
 document.getElementById('innerAide').innerHTML = textAide;
}