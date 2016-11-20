

// Paramétrage du déplacement des Divs-Layers et des onmousemove & onmouseup pendant le onmousedown
// le (e) indique au programme qu'il utilise les évenements.
function ma_fonction(e) {

	//Récupération de la position de la souris
	window.lastX=event.clientX;
	window.lastY=event.clientY;
	// lance doDrag tant que l'on appuie sur le bouton de la souris en la bougeant
	window.onmousemove=doDrag;
	// lance endDrag quand on relache le bouton de la souris
	window.onmouseup=endDrag;

}
// Déplacement des Divs-Layers
function doDrag(e) {

	// Calcul de l'écart de position de la souris
	var difX=event.clientX-window.lastX;
	var difY=event.clientY-window.lastY;
	//Récupération de la position du div et ajout de l'écart de position de la souris
	var newX1 = parseInt(document.getElementById(currentId).style.left)+difX;
	var newY1 = parseInt(document.getElementById(currentId).style.top)+difY;
	// Assignation des nouvelles coordonnées au div
	document.getElementById(currentId).style.left=newX1+"px";
	document.getElementById(currentId).style.top=newY1+"px";
	//Assignation de l'anciènne position de la souris
	window.lastX=event.clientX;
	window.lastY=event.clientY;
 
}
function endDrag(e) {


	//Réinitialisation du onmousemove
	window.onmousemove=null;

}