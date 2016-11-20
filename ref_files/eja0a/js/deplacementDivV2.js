clicEnCours = false;
position_x = 50;
position_y = 280;
netscape = false; 
if (navigator.appName.substring(0,8) == "Netscape")
  { 
  netscape = true;
  } 


function boutonPresse() 
  {
  origine_x = x - position_x;
  origine_y = y - position_y;
  clicEnCours = true;
  }

function boutonRelache()
  {
  clicEnCours = false;
  }

function deplacementSouris(e)
  {
  x = (netscape) ? e.pageX : event.x + document.body.scrollLeft;
  y = (netscape) ? e.pageY : event.y + document.body.scrollTop;

  if (clicEnCours && document.getElementById)
    {
    position_x = x - origine_x ;
    position_y = y - origine_y ;
    window.status = (position_x + ' ' + position_y);
   
    document.getElementById("caracteres_speciaux").style.left = position_x +'px';
    document.getElementById("caracteres_speciaux").style.top = position_y +'px';
    }
  }

if (netscape)
  {
  document.captureEvents(Event.MOUSEMOVE);
  }

document.onmousemove = deplacementSouris;

var imgClMaj = new Image();
imgClMaj.src = 'images/clavierRusseMaj.gif';
var imgClMin = new Image();
imgClMin.src = 'images/clavierRusseMin.gif';

var caps=false
function maj(){
 if (caps==true)
	{caps=false;
	document.getElementById('leClavier').innerHTML = '<img src="images/clavierRusseMin.gif" id="imgClavier" alt="" usemap="#clavierEsp" style="border:none; width:414px; height:120px;"/>' ;
		}
else
	{caps=true;
	document.getElementById('leClavier').innerHTML = '<img src="images/clavierRusseMaj.gif" id="imgClavier" alt="" usemap="#clavierEspMaj" style="border:none; width:414px; height:120px;"/>' ;
	}
}