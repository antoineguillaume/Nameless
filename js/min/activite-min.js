$(document).ready(function(){function e(){t?(t=!1,o=0,i=!1):(n("inactif"),i?(o+=c,o>=6e4&&$.ajax({url:"espace-membre/script.php",type:"POST",data:"action=isNotConnected",success:function(e){document.location.href="espace-membre/deconnexion.php"}})):i=!0),setTimeout(e,c)}function n(e){if("inactif"==e)var n=o/1e3}var t=!1,c=100,o=0,i=!0,a=$("body");$(a).keydown(function(){t=!0,n("actif")}),$(a).mousemove(function(){t=!0,n("actif")}),setTimeout(e,c)});