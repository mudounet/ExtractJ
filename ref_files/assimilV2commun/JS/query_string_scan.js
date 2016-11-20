/******************************************************
QUERY STRING SCANNER PAR L'EDITEUR JAVASCRIPT
http://www.editeurjavascript.com
*******************************************************
MERCI DE LAISSER CET AVERTISSEMENT EN CAS D'UTILISATION
******************************************************/

var ejs_list = new Array;
var ejs_list_valeur = new Array;
var ejs_place = document.location.href.indexOf("?",0);
if(ejs_place >= 0) {
    try {
        var ejs_query_string = document.location.href.substring(ejs_place + 1, document.location.href.length);
        var ejs_place_and = ejs_query_string.indexOf("&", 0);
        if (ejs_place_and >= 0)
            ejs_list = ejs_query_string.split("&");
        else
            ejs_list[0] = ejs_query_string;
        for (var ejs_i = 0; ejs_i < ejs_list.length; ejs_i++) {
            var ejs_temp = ejs_list[ejs_i].split("=");
            var ejs_variable = ejs_temp[0];
            var ejs_valeur = ejs_temp[1];
            var ejs_plus_place = ejs_valeur.indexOf("+", 0);
            while (ejs_plus_place > -1) {
                ejs_temp2 = ejs_valeur.substring(0, ejs_plus_place) + ' ' + ejs_valeur.substring(ejs_plus_place + 1, ejs_valeur.length);
                ejs_valeur = ejs_temp2;
                ejs_plus_place = ejs_valeur.indexOf("+", ejs_plus_place + 2);
            }
            ejs_list_valeur[ejs_variable] = ejs_valeur;
        }
    }
    catch (e) {alert(e);e = ull;}
	}

function get(ejs_get)
	{
	if(ejs_list_valeur[ejs_get])
		return(unescape(ejs_list_valeur[ejs_get]));
	else
		return("");
	}
