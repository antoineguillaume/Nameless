<?php
session_start();
include('functions.inc.php');
include('espace-membre/bdd_connexion.php');

if($_SESSION['logged_in'] != 'ok')
{
	$errors = [];

	if($_POST)
	{
	    $emailconnect = trim(htmlspecialchars($_POST['emailconnect']));
	    $passwordconnect = sha1($_POST['passwordconnect']);
	    $end = $_POST['end'];
	    $errors = [];

	    if(!empty($emailconnect) AND !empty($passwordconnect))
	    {
	        $requser = $bdd->prepare("SELECT * FROM membres WHERE mail = ? AND password = ? ");
	        $requser->execute(array($emailconnect, $passwordconnect));
	        $userexist = $requser->rowCount();

	        if($userexist == 1)
	        {
	            $userinfo = $requser->fetch();
	            $_SESSION['id'] = $userinfo['id'];
	            $_SESSION['mail'] = $userinfo['mail'];
	            $_SESSION['logged_in'] = 'ok';

				$connected = 1;
				if(isset($_SESSION['id']))
				{
					$req = $bdd->prepare(" SELECT connected FROM membres WHERE id = ? ");
					$req->execute(array($_SESSION['id']));
					$result = $req->fetch();
					if($result['id'] == 0)
					{
						$req = $bdd->prepare(" UPDATE membres SET connected = ? WHERE id = ? ");
						$req->execute(array($connected, $_SESSION['id']));
					}

					$req = $bdd->prepare(" UPDATE membres SET last_activity = NOW() WHERE id = ? ");
					$req->execute(array($_SESSION['id']));
				}

	            sleep(3);
	            header("Location: index.php");
	        }
	        else
	        {
	            $errors['pb-connexion'] = "Mauvais email ou mauvais mot de passe.";
	        }
	    }
	    else
	    {
	        $errors['empty'] = "Tous les champs doivent être complétés !";
	    }
	}

	include('espace-membre/connexion.view.php');
}
else
{
	include('prototype.view.php');
}
?>