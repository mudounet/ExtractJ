if(ext =='.html') {
	var tMod = new Array(1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0);
	var tLecons = new Array(1,0,0,1);
	}
else { // asp
	//var tMod = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
}
var maxMod = tMod.length ;
var m = get('m');

if(m=='undefined'){m=1;}

var module1 = m;
var module2 ='';
var module3 ='';
var url = new String(document.location);
if (url.indexOf ('?')>0){
	url = url.substring (0,url.indexOf ('?'));
}

// ouvre la fenetre en plein ecran (IE)
// //window.resizeTo (window.screen.width,window.screen.height);


var maxLesson = 112 ; // nombre maxi de lecons
var phaseActive = 71; // phase active seule
var maxModule = Math.ceil (maxLesson/7);

// preload images 
var chemin = '../assimilV2commun/images/';
var liste_images = new Array('blank.gif','imgsBtIndex/BtIndexIndexEsp1.gif','imgsBtIndex/AssimilV2IndexBtTout-over.gif','imgsBtIndex/AssimilV2IndexBtPron-over.gif','imgsBtIndex/AssimilV2IndexBtComment-over.gif','imgsBtIndex/AssimilV2IndexBtAppendx-over.gif','imgsBtIndex/AssimilV2IndexBtQuit-over.gif');
document.image_chargee = new Array();
function prechargement() {
	
	for ( i = 0; i < liste_images.length; i++ ) {
		document.image_chargee[i] = new Image;
		document.image_chargee[i].src = chemin + liste_images[i] ;
	}
}

function recharger(){
	//parent.frames[1].window.location = url ;
	self.location = url;
}
function modUrl(n){
	nextUrl = url + '?l=' + l + '&m=' + n + '&num=' + num;
	document.location = nextUrl;
}
function showTitle(n){
	
	t = 'Phase active';
	if (n< phaseActive){
		t = tabTitres[n];
	}
	document.getElementById("titre").innerHTML = t;
}
function hideTitle(){
	//window.titre.innerHTML ='';
	document.getElementById("titre").innerHTML = '';
}

function showModule(n){
	//window.titre.innerHTML ='Aller au module ' + n ;
	document.getElementById("titre").innerHTML = 'Aller au module ' + n ;
}
function hideModule(n){
	//window.titre.innerHTML ='';
	document.getElementById("titre").innerHTML = '';
}

if(module1<1) {
	module1=1;
}
if (module1 >= maxMod-1) {
	module1=maxMod-2;
}

module2 = parseInt(module1) + 1;
module3 = parseInt(module1) + 2;

function modules(m){
l = ((m * 7) -6);
		
		for (i=0 ; i<=6; i++){
			if(l<= maxLesson){
				liens(m,l);
				if(tLecons[l-1]==1){
					// lecon terminee
					document.write('<a href="' + lien + '" class="termine" onMouseOver="showTitle(' + l + ');" onMouseOut="hideTitle();"> Le&ccedil;on ' + l + '</a><br />');
				}
				else {
					document.write('<a href="' + lien + '" class="lecon" onMouseOver="showTitle(' + l + ');" onMouseOut="hideTitle();"> Le&ccedil;on ' + l + '</a><br />');
				}
				l = l+1;
			}
		}
		
}
function liens(m,l){
	if(l<phaseActive){	
		if(l == (m*7) && l !=70){
			lien = 'revGrammaticale' + ext + '?l=' + l + '&m='  +  m + '&num=' + num;
		}
		else {
			lien = 'ecoute' + ext + '?l=' + l + '&m='  +  m + '&num=' + num;
		}
	}
	else {
		lien = 'revisionActive' + ext + '?l=' + l + '&m='  +  m + '&num=' + num;
	}
}

function writeModules(){
	for ( i = 0; i < tMod.length; i++ ) {
			document.write('<a href="javascript:modUrl(' + (parseInt(i)+1) + ')" onMouseOver="showModule(' + (parseInt(i)+1) +');" onMouseOut="hideModule();"');
			if (tMod[i]==0){
			document.write(' class="module">');
			
			}
			else {
			document.write(' class="moduleR">');
			}
			document.write (parseInt(i)+1);
			document.write('</a>&nbsp;');
		}
	}

function showModulesTitle(){
	if (document.getElementById ){
	document.getElementById("mod1").innerHTML  ='Module ' + module1;
	document.getElementById("mod2").innerHTML  ='Module ' + module2 ;
	document.getElementById("mod3").innerHTML  ='Module ' + module3 ;
	}
	else {
		window.mod1.innerHTML  ='Module ' + module2;
		window.mod2.innerHTML  ='Module ' + module1;
		window.mod3.innerHTML  ='Module ' + module3;
		
	}
}

function lexiqueRF(){
	document.location = 'lexiqueRF' + ext + '?l=' + l+'&m=' + m + '&num=' + num;
}