function localS(){
	if(typeof localStorage!='undefined')
	{
		var flag = localStorage.getItem('flag');

		if(flag != 'true')
		{
			flag = 'true';
			localStorage.setItem('flag', flag);
			document.location.href="espace-membre/inscription.view.php";
			return;
		}
	}
}

localS();
