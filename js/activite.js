$(document).ready(function(){

	var activite_detectee = false;
	var intervalle = 100;
	var temps_inactivite = 0;
	var inactivite_persistante = true;
	var body = $('body');

	$(body).keydown(function()
	{
		activite_detectee = true;
		statut('actif');
	});

	$(body).mousemove(function()
	{
		activite_detectee = true;
		statut('actif');
	});

	function testerActivite()
	{
		if(activite_detectee)
		{
			activite_detectee = false;
			temps_inactivite = 0;
			inactivite_persistante = false;
		}
		else
		{
			statut('inactif');

			if(inactivite_persistante)
			{
				temps_inactivite += intervalle;

				if(temps_inactivite >= 60000)
				{
					$.ajax({
						url: 'espace-membre/script.php',
						type: 'POST',
						data: 'action=' + 'isNotConnected',
						success: function(data){
							document.location.href="espace-membre/deconnexion.php";
						}
					});
				}
			}
			else
			{
				inactivite_persistante = true;
			}
		}
		setTimeout(testerActivite, intervalle);
	}

	function statut(statut)
	{
		if(statut == 'inactif')
		{
			var temps_secondes = temps_inactivite / 1000;
		}
	}

	setTimeout(testerActivite, intervalle);

});