/**
	variables globales
**/

// extensions des fichiers local / serveur
 var ext='.asp'; // serveur
//var ext='.html';  // local

//repertoire images communes
var pathImages = '../assimilV2commun/images/';

// repertoire wimba
var cheminWimba = '../assimilV2commun/wimba/';
var num = get('num');
/*
if(num == 0){ // local 
}
else {
	if(num='undefined'){
		var num = get('num');
	}
}
*/	
function recharger(){
	//parent.frames[1].window.location = url ;
	
	url = url.replace(/#/gi,'');
//	if(l>1){
		window.location = url + '?l=' +l + '&p=' + p + '&m=' + m + '&num=' + num;
//		}
//	else {
//		window.location = url;
//	}
}
function visite(n)
	{
	//	url='http://cours.toutapprendre.com/assimil/visite/visite-guidee-' + n +'.html';
		url = 'http://cours.toutapprendre.com/demo/assimil/eaz0a/demoAssimilV2.html';
		window.open (url,'','toolbar=no,menubar=no, location=no, width=760, height=500,top=100,left=100');
	}		
function faq(){

	popFaq = window.open ('http://www.toutapprendre.com/_faq/index.html','FAQ');
}

function suivant(){
 	document.location = nextUrl;
}
function precedent(){

	document.location = prevUrl;
}

function titre(t){
var tl = '';
	if (t) {
		}
	else {
	 t = document.title;
	}
	if(l && l>0){
		tl = '- le' + String.fromCharCode(231)+ 'on ' + l;
	}
	document.title = t + tl ;
}
           
function ecoute(){
	document.location = 'ecoute' + ext + '?l=' + l + '&m='  +  m + '&num=' + num;
	
	}

function exTraduction(){
	phaseActive='';
	if(parseInt(l)>49){
		phaseActive='Active';
	}
	document.location = 'exTraduction' + phaseActive + ext + '?l='+ l + '&m='  +  m + '&num=' + num;
	}
function Traduction(){
		// pas de phase active
	document.location = 'exTraduction' + ext + '?l='+ l + '&m='  +  m + '&num=' + num;
	}
function exTraductionTheme(){
	
	document.location = 'exTraductionTheme' + ext + '?l='+ l + '&m='  +  m + '&num=' + num;
	}
function apprentissage(){
	document.location = 'apprentissage' + ext + '?l='+ l + '&m='  +  m + '&num=' + num;
	}
function ex7Traduction(){
	document.location = 'exTraductionL7' + ext + '?l='+ l +'&m='  +  m + '&num=' + num;
	}      
function ex7dragdrop(){
	document.location = 'ex7Dragdrop' + ext + '?l='+ l + '&m='  +  m + '&num=' + num;
	}
function exMotManquant(){
	phaseActive='';
	if(parseInt(l)>49){
		phaseActive='Active';
	}
	document.location = 'exMotsManquants' + phaseActive + ext + '?l='+ l + '&m='  +  m + '&num=' + num;
	}   
function MotManquant(){
		//pas de phase active
	document.location = 'exMotsManquants' + ext + '?l='+ l + '&m='  +  m + '&num=' + num;
	}                 
function index(){
	document.location = 'assimil_index' + ext + '?l=' + l +  '&m='  +  m + '&num=' + num;
} 
function introduction(){
	document.location = 'introduction' + ext   + '?l=' + l +  '&m='  +  m + '&num=' + num;
} 

function prononciation(){
	document.location = 'prononciation' + ext  + '?l=' + l + '&m='  +  m + '&num=' + num;
} 

function grammaire(){
	document.location = 'appendiceGrammatical' + ext  + '?l=' + l + '&m='  +  m + '&num=' + num;
} 

function lexique(){
		document.location = 'lexiqueAF' + ext + '?l=' + l + '&m='  +  m + '&num=' + num;
		} 
function lexiqueAF(){
		document.location = 'lexiqueAF' + ext + '?l=' + l + '&m='  +  m + '&num=' + num;
		} 
function lexiqueFA(){
		document.location = 'lexiqueFA' + ext + '?l=' + l + '&m='  +  m + '&num=' + num;
		} 
function indexGram(){
	document.location = 'indexGrammatical' + ext + '?l=' + l + ' &m=' + m + '&num=' + num ;
} 
function indexTheme(){
	document.location = 'indexThematique' + ext + '?l=' + l + ' &m=' + m+ '&num=' + num;
} 
function lex(){
		document.location = 'lexique' + ext + '?l=' + l + '&m='  +  m + '&num=' + num;
		}
function dialogues(){
	document.location = 'dialoguesRecap' + ext  +'?l=' +l +'&m='  +  m + '&num=' + num;
}
function revisions(){
	document.location = 'revGrammaticale' + ext  +'?l=' +l +'&m='  +  m + '&num=' + num;
}
function conclusion(){
	document.location = 'conclusion' + ext +'?l=' +l +'&m='  +  m + '&num=' + num;
}
function afficheLecon(n){
// l: lecon p:phrase n:cas

	if(l){
	 l = (l*3)/3;
		if(n==0){ // affcihe uniquement le numero de lecon
			document.getElementById('affLecon').innerHTML='Le&ccedil;on ' + l ;
		}
		else {
			var nump='';
				if(p){
					if(n !='undefined'){
						if (n==1){
							switch(phrase){
							// pas de titre
									case 0 :
										nump='num&eacute;ro';
										break;
									default :
										nump = '&nbsp;&nbsp;(' + parseInt(p) + '/' + (maxP-2) +')';
								} 
							document.getElementById('affLecon').innerHTML='Le&ccedil;on ' + l + ' ' + nump;
							} 
						if (n==2){
							//numero de lecon et titre
							switch(phrase){
									case 0 :
										nump='num&eacute;ro';
										break;
									case 1 :
										nump='titre';
										break;
									default :
										nump = '&nbsp;&nbsp;(' + (parseInt(phrase)-1) + '/' + (maxP-2) +')';
								} 
								
							document.getElementById('affLecon').innerHTML='Le&ccedil;on ' + l + ' ' + nump;
						} 				
					else {
					
						// pas de titre ni numero (n=undefined)
						nump = '&nbsp;&nbsp;(' + parseInt(p) + '/' + (maxP-1) +')';
						document.getElementById('affLecon').innerHTML='Le&ccedil;on ' + l + ' ' + nump;
					
					} 
				} //n
			} //p
		} // n=0
	}//l
}

function appletCompare(){
		var w_p = new Object();
		w_p.Gui= cheminWimba + 'karaoke_gui.zip';
		w_p.width='529';
		w_p.height='239';
		w_p.Data= properties;
		w_lt_karaoke(w_p); 
}   

function appletKaraoke(){

		var w_p = new Object();
		w_p.AudioUrl= cheminSons + idSon + '-pcm44.ogg';
		w_p.Gui= cheminWimba + 'compare_gui.zip';
		w_p.width='30';
		w_p.height='90';
		w_p.Time='30';
			w_lt_compare(w_p);

}
// affichage Aide
var aideVisible = 0;

function montreAide(){

	var da =document.getElementById('divAide');
		if (aideVisible == 0) {
		
		da.style.display = 'block';
	//	cacheApplet('none');
		aideVisible = 1;
		}
	else {
		da.style.display = 'none';
	//	cacheApplet('block');
		aideVisible = 0;
		}
}

function cacheApplet(d){
	// masque l'applet ecoute pour affichage de l'aide
	var ap = document.getElementById('appletEcoute');
	if (ap){
			ap.style.display = d;
	}
}
// preload image aide
	document.imageAide = new Image;
	document.imageAide.src = '../assimilV2commun/images/aide/aide.gif' ;

// clic droit
function yaunclick()
	{
		alert('Copyright ToutApprendre.com - ASSIMIL');
	}
function noclick(scx)
	{
	if (navigator.appName == "Netscape" && scx.which == 3)
		{
		yaunclick();
		return false; 
		}
	if (navigator.appVersion.indexOf("MSIE") != -1 && event.button == 2)
		{
		yaunclick();
		return false; 
		}
		return(true);
	}
// document.onmousedown = noclick
// fin clic droit


	// bug affichage sur certains IE6 - 22/07/2005
function correctionIE(){
//	self.resizeBy(-2,-2);
//	setTimeout('self.resizeBy(2,2)',100);
}

function xhtml_flashKaraoke(){
	var w = 529;
	var h = 239;
	var color = 'E0E6D7';

	document.write ('<object type="application/x-shockwave-flash" data="karaoke_fr.swf" width="' + w + '" height="'+ h +'">');
	document.write ('<param name="allowScriptAccess" value="sameDomain" />');
	document.write ('<param name="movie" value="karaoke_fr.swf" />');
	document.write ('<param name="quality" value="high" />');
	document.write ('<param name="wmode" value="transparent" />');
	//document.write ('<param name="bgcolor" value="#feffed" />');
	document.write ('<param name="FlashVars" value="p_properties=' + properties + '&p_color=' + color +'" />');
	document.write ('<p>N&#233;cessite le plugin Flash <br /><a href="http://www.macromedia.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash&Lang=French&P5_Language=French" title="Plugin Macromedia Flash" onclick="window.open(this.href); return false;">http://www.macromedia.fr <img src="http://www.toutapprendre.fr/img/equip/get_flash_player.gif" alt="Plugin Macromedia Flash" /></a></p>');
	document.write ('</object>');

}

function xhtml_flashCompare(){
	var w = 215;
	var h = 138;
	var color = 'E0E6D7';
	var son = cheminSons + idSon + '-pcm44.mp3';
	document.write ('<object type="application/x-shockwave-flash" data="compare_fr_2.swf" width="' + w + '" height="'+ h +'">');
	document.write ('<param name="allowScriptAccess" value="sameDomain" />');
	document.write ('<param name="movie" value="compare_fr_2.swf" />');
	document.write ('<param name="quality" value="high" />');
	document.write ('<param name="wmode" value="transparent" />');
	//document.write ('<param name="bgcolor" value="#feffed" />');
	document.write ('<param name="FlashVars" value="p_url=' + son + '&p_color=' + color + '&p_id=' + num + '" />');
	document.write ('<p>N&#233;cessite le plugin Flash <br /><a href="http://www.macromedia.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash&Lang=French&P5_Language=French" title="Plugin Macromedia Flash" onclick="window.open(this.href); return false;">http://www.macromedia.fr <img src="http://www.toutapprendre.fr/img/equip/get_flash_player.gif" alt="Plugin Macromedia Flash" /></a></p>');
	document.write ('</object>');
}

function flashKaraoke(){
	var w = 529;
	var h = 239;
	var color = 'E0E6D7';
	document.write ('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + w + '" height="' + h + '" id="karaoke" align="middle">');
	document.write ('<param name="allowScriptAccess" value="sameDomain" />');
	document.write ('<param name="movie" value="karaoke_fr.swf" />');
	document.write ('<param name="quality" value="high" />');
	document.write ('<param name="wmode" value="transparent" />');
	//document.write ('<param name="bgcolor" value="#feffed" />');
	document.write ('<param name="FlashVars" value="p_properties=' + properties + '&p_color=' + color +'" />');
	document.write ('<embed src="karaoke_fr.swf" FlashVars="p_properties=' + properties + '&p_color=' + color + '" quality="high" wmode="transparent" width="' + w + '" height="' + h + '" name="karaoke" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
	document.write ('</object>	');

}

function flashCompare() {
	var w = 215;
	var h = 138;
	var color = 'E0E6D7';
	var son = cheminSons + idSon + '-pcm44.mp3';
	
	var swf = 'compare_fr_2.swf'; // location.protocol + '//' + location.hostname + '/flashAssimil/compare_fr_2.swf';

	document.write ('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + w + '" height="' + h + '" id="compare" align="middle">');
	document.write('<param name="allowscriptAccess" value="always" />');
    //	document.write ('<param name="movie" value="compare_fr_2.swf" />');
	document.write('<param name="movie" value=" ' + swf + '" />');
	document.write ('<param name="quality" value="high" />');
	document.write ('<param name="wmode" value="transparent" />');
	//document.write ('<param name="bgcolor" value="#feffed" />');
	document.write ('<param name="FlashVars" value="p_url=' + son + '&p_color=' + color + '&p_id=' + num + unique(num) + '" />');
	document.write('<embed src="' + swf + '" FlashVars="p_url=' + son + '&p_color=' + color + '&p_id=' + unique(num) + '" quality="high" wmode="transparent" width="' + w + '" height="' + h + '" name="compare" align="middle" allowscriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
	document.write ('</object>');
	
}

function flashCompare_xhtml() {
    // intération xhtml
    var w = 215;
    var h = 138;
    var color = 'E0E6D7';
    var son = cheminSons + idSon + '-pcm44.mp3';
	
    var swf = 'compare_fr_2.swf'; // location.protocol + '//' + location.hostname + '/flashAssimil/compare_fr_2.swf';
    document.write('<object type="application/x-shockwave-flash" data="' + swf + '" width="' + w + '" height="' + h + '">');
    document.write('<param name="allowscriptAccess" value="always" />');
    document.write ('<param name="movie" value="' + swf + '" />');
    document.write ('<param name="menu" value="false" />');
    document.write('<param name="quality" value="high" />');
    document.write('<param name="wmode" value="transparent" />');
    document.write('<param name="FlashVars" value="p_url=' + son + '&p_color=' + color + '&p_id=' + num + unique(num) + '" />');
    document.write('<p>N&#233;cessite le plugin Flash <br /><a href="http://get.adobe.com/fr/flashplayer/" title="Plugin Macromedia Flash" onclick="window.open(this.href); return false;">http://www.macromedia.fr <img src="http://www.toutapprendre.com/img/equip/get_flash_player.gif" alt="Plugin Macromedia Flash" /></a></p>');
    document.write ('</object>');
}



function flashCompareEN(){
	var w = 215;
	var h = 138;
	var color = 'E0E6D7';
	var son = cheminSons + idSon + '-pcm44.mp3';
	
	document.write ('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + w + '" height="' + h + '" id="compare" align="middle">');
	document.write ('<param name="allowScriptAccess" value="sameDomain" />');
	document.write ('<param name="movie" value="compare_gb.swf" />');
	document.write ('<param name="quality" value="high" />');
	document.write ('<param name="wmode" value="transparent" />');
	//document.write ('<param name="bgcolor" value="#feffed" />');
	document.write ('<param name="FlashVars" value="p_url=' + son + '&p_color=' + color + '&p_id=' + num + unique(num) + '" />');
	document.write ('<embed src="compare_gb.swf" FlashVars="p_url=' + son + '&p_color=' + color + '&p_id=' + unique(num) + '" quality="high" wmode="transparent" width="' + w +'" height="' + h + '" name="compare" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
	document.write ('</object>');
	
}


var aideFlashApp = '<p><img src="/assimilV2Commun/images/aide/compare.gif" alt="" style="float:right;" />Les boutons affich&#233;s vous permettent d\'&#233;couter la phrase, vous enregistrer et vous r&#233;&#233;couter.</p><p><strong>Enregistrement </strong><br />Un message vous averti que la fonction d\'enregistrement va acc&#232;der &#224; internet.<img src="/assimilV2Commun/images/aide/flash1.gif" alt="" style="float:right;" />Vous devez accepter.</p><p>Pour ne plus recevoir ce message faites un clic droit sur l\'un des boutons, choisissez "param&#232;tres"<img src="/assimilV2Commun/images/aide/flash4.gif" alt="" style="float:right;" /></p><p>Puis cochez la case m&#233;moriser.<img src="/assimilV2Commun/images/aide/flash3.gif" alt=""  style="float:right;" /><br />Pour règler votre microphone, cliquez sur l\'onglet repr&#233;sentant un micro, choisissez dans la liste d&#233;roulante la carte son sur laquelle il est branch&#233; (dans la plupart des cas vous n\'en avez qu\'une seule, sauf si vous utilisez un micro usb ou celui d\'une webcam) et utilisez le curseur pour augmenter le volume d\'enregistrement.<img src="/assimilV2Commun/images/aide/flash5.gif" alt=""  style="float:right;" /></p>';
var aideFlashEcoute = '<table><tr><td>Vous disposez alors d\'une interface pour contr&ocirc;ler le d&eacute;roulement de l\'&eacute;coute </td><td><img src="/assimilV2Commun/images/aide/ecou_2.gif" alt="Ecoute controles" /></td></tr><tr><td>Pour lancer l\'&eacute;coute et arr&ecirc;ter</td><td><img src="/assimilV2Commun/images/aide/ecou_1.gif" alt="Ecoute" /><img src="/assimilV2Commun/images/aide/ecou_2.gif" alt="Arr&ecirc;t" /></td></tr><tr><td>Pour arr&ecirc;ter l\'&eacute;coute et revenir au d&eacute;but</td><td><img src="/assimilV2Commun/images/aide/ecou_1.gif" alt="Ecoute" /> <img src="/assimilV2Commun/images/aide/ecou_9.gif" alt="Stop - reprise" /></td></tr><tr><td>Passer d\'une phrase &agrave; l\'autre </td><td><img src="/assimilV2Commun/images/aide/ecou_5.gif" alt="Phrase pr&eacute;c&eacute;dente"/> <img src="/assimilV2Commun/images/aide/ecou_7.gif" alt="Phrase suivante"/></td></tr><tr><td>Pause et reprise de l\'&eacute;coute d\'une phrase</td><td><img src="/assimilV2Commun/images/aide/ecou_6.gif" alt="Pause" /> <img src="/assimilV2Commun/images/aide/ecou_8.gif" alt="Reprise" /></td></tr></table>';

function fermerCours(){
	if(parent.frames.length>0){
		top.location='http://cours.toutapprendre.com/assimil/close.html';
	}
	else {
		self.close;
	}
}


function unique(n){
try {
	n = n + '-' + posteId;	
	return n ;
}
catch(e){
	return n ;
	
}
	
}


function oldunique(n){
	try {
		var s = '';
		s = GetCookie('assimil');
		if(s.length>0){
			//cookie existant		
		}
		else {
			var dateExpire = new Date();
			s = dateExpire.getSeconds();
			dateExpire.setMonth(dateExpire.getMonth()+1);
			setCook2 ( 'assimil', s,dateExpire);
				}
	}
	catch(e){ s='';}
	return n + '-' + s;
}


function setCook2(nom,valeur,expire) {
        document.cookie = nom + "=" + escape(valeur) + ";expires=" + expire;
 }

function GetCookie (name) {
         if (document.cookie) { // Le cookie est-il valide ?
                  index = document.cookie.indexOf( name);
                  if ( index != -1) {
                           nDeb = (document.cookie.indexOf( "=", index) + 1);
                           nFin = document.cookie.indexOf( ";", index);
                           if (nFin == -1) {nFin = document.cookie.length;}
                           return unescape(document.cookie.substring(nDeb, nFin));
                  }
         }
         return true;
}

function toPrint(){
	
		printF = window.open('../assimilV2Commun/print.html','Impression');
		innerPrint  = document.getElementById('central').innerHTML;
	}
