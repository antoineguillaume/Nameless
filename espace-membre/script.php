<?php 
session_start();
include('bdd_connexion.php');

	$idUser = $_SESSION['id'];
	$userMail = $_SESSION['mail'];
	$nameObj = trim( strip_tags ($_POST['name_object']));
	$id_conversation = trim( strip_tags ($_POST['id_conversation']));

	if($_POST['action'] == 'newMember')
	{
		$new = 1;
		$req = $bdd->prepare(" SELECT id FROM membres WHERE new_member = ? AND mail = ? ");
		$req->execute(array($new, $userMail));
		$statut = $req->rowCount();

		if($statut != 0)
		{
			$d['new_member'] = true;
		}
		else
		{
			$d['new_member'] = false;
		}

		echo json_encode($d);
	}
	else if($_POST['action'] == 'activeMember')
	{
        $connected = 0;
        $req = $bdd->prepare(" UPDATE membres SET new_member = ? WHERE mail = ? ");
        $req->execute(array($connected, $userMail));
	}
	else if($_POST['action'] == 'setMatrix')
	{
		$link_value = 1;
	    $req = $bdd->prepare(" SELECT user_a, user_b FROM discussions WHERE link = ? ");
	    $req->execute(array($link_value));
	   	while($link = $req->fetch())
	   	{
	   		$d['user_a'][] = $link['user_a'];
	   		$d['user_b'][] = $link['user_b'];
	   	}

	    $d['ID'] = $idUser;

		$individualPosition = $bdd->query(" SELECT positionXYZ FROM membres ");
		while($pos = $individualPosition->fetch())
		{
			$d['position'][] = $pos['positionXYZ'];
		}
		echo json_encode($d);
	}
	else if($_POST['action'] == 'setPositionShape')
	{
		$jsonPosition = trim( strip_tags (utf8_decode($_POST['userPosition'])));
		$reqPosition = $bdd->prepare("UPDATE membres SET positionXYZ = :position WHERE mail = :mailmember");
		$reqPosition->execute(array(
			'position' => $jsonPosition,
			'mailmember' => $userMail
		));
	}
	else if($_POST['action'] == 'setPositionPointsShape')
	{
		$jsonPoints = trim(strip_tags(utf8_decode($_POST['jsonPoints'])));
		$reqPosition = $bdd->prepare("UPDATE membres SET positionPoints = ? WHERE mail = ? ");
		$reqPosition->execute(array($jsonPoints, $userMail));
	}
	else if($_POST['action'] == 'createDiscussion')
	{
        $req = $bdd->prepare("SELECT * FROM discussions WHERE (user_a = ? OR user_a = ?) AND (user_b = ? OR user_b = ?)");
        $req->execute(array($idUser, $nameObj, $idUser, $nameObj,));

        $discussion_exist = $req->rowCount();
        $id_d = $req->fetch();
        $id_conversation = $id_d['id'];
        
        if($discussion_exist == 0 AND $nameObj != 'logout')
        {
		    $req = $bdd->prepare("INSERT INTO discussions(user_a, user_b, time) VALUES(?,?, NOW()) ");
		    $req->execute(array($idUser, $nameObj));

		    $req = $bdd->prepare("SELECT id FROM discussions WHERE user_a = ? AND user_b = ?");
		    $req->execute(array($idUser, $nameObj));
		    $new_id_conversation = $req->fetch();
		    $d['id_conversation'] = $new_id_conversation['id'];
        }
        else if($discussion_exist != 0 AND $nameObj != 'logout')
        {
			if(!empty($id_conversation))
			{
				$d['id_conversation'] = $id_conversation;
			}
        }

        $req = $bdd->prepare(" SELECT information FROM fiches WHERE user_a = ? AND id_discussion = ? ");
        $req->execute(array($idUser, $id_conversation));
        $info = $req->fetch();
        $d['information'] = $info['information'];

        echo json_encode($d);
	}
	else if($_POST['action'] == 'sendMessage')
	{
		$id_conversation = trim( strip_tags ($_POST['id_conversation']));
		$notif = trim(strip_tags($_POST['notif']));
		$link_value = 1;

		$req = $bdd->prepare(" SELECT user_a, user_b FROM discussions WHERE id = ? ");
		$req->execute(array($id_conversation));
		$data = $req->fetch();
		if($data['user_a'] != "$idUser")
		{
			$user_recept = $data['user_a'];
		}
		else if ($data['user_b'] != "$idUser")
		{
			$user_recept = $data['user_b'];
		}

		$req = $bdd->prepare("SELECT id FROM updatecontent WHERE user_send = ?");
	    $req->execute(array($nameObj));
	    $notif_exist = $req->rowCount();

	    if($notif_exist == 0){
			$uC = $bdd->prepare("INSERT INTO updatecontent(id_discussion, notification, user_send) VALUES(?, ?, ?)");
			$uC->execute(array($id_conversation, $notif, $nameObj));
		}

		$req = $bdd->prepare("UPDATE discussions SET link = ? WHERE id = ?");
	    $req->execute(array($link_value, $id_conversation));

		$message = trim(strip_tags($_POST['message']));
		$req = $bdd->prepare("INSERT INTO messages(id_discussion, message_send, user_emit, user_recept, time) VALUES(?,?,?,?, NOW()) ");
		$req->execute(array($id_conversation, $message, $idUser, $user_recept));
	}
	else if($_POST['action'] == 'setInformation')
	{
		$information = trim( strip_tags ($_POST['information']));

		$req = $bdd->prepare(" SELECT id FROM fiches WHERE id_discussion = ? AND user_a = ? ");
		$req->execute(array($id_conversation, $idUser));
		$fiches_count = $req->rowCount();

		if($fiches_count == 0)
		{
			$req = $bdd->prepare("INSERT INTO fiches(id_discussion, user_a, information) VALUES(?, ?, ?) ");
			$req->execute(array($id_conversation, $idUser, $information));
		}
		else
		{
			$req = $bdd->prepare("UPDATE fiches SET information = ? WHERE user_a = ? AND id_discussion = ? ");
			$req->execute(array($information, $idUser, $id_conversation));
		}

        $req = $bdd->prepare(" SELECT information FROM fiches WHERE user_a = ? AND id_discussion = ? ");
        $req->execute(array($idUser, $id_conversation));
        $info = $req->fetch();
        $d['infos'] = $info['information'];

        echo json_encode($d);
	}
	else if($_POST['action'] == 'getMessage')
	{
		$lastid = trim(strip_tags($_POST['lastid']));

		$req = $bdd->prepare("SELECT id, message_send FROM messages WHERE id > ? AND id_discussion = ?  AND time = (SELECT MAX(time) FROM messages WHERE id_discussion = ? ) ");
		$req->execute(array($lastid, $id_conversation, $id_conversation)) or die(print_r($req->errorInfo()));
		$msg = $req->fetch();

		$d['msg'] = $msg['message_send'];
		$d['id'] = $msg['id'];
		echo json_encode($d);
	}
	else if($_POST['action'] == 'getNotification')
	{
		$notif = 1;
		$req = $bdd->prepare(" SELECT id_discussion FROM updatecontent WHERE user_send = ? ");
		$req->execute(array($idUser));
		while($user_send = $req->fetch())
		{
			$d['id_room'][] = $user_send['id_discussion'];
		}

		echo json_encode($d);
	}
	else if($_POST['action'] == 'removeNotif')
	{
		$ID = trim(strip_tags($_POST['ID']));

		$req = $bdd->prepare(" DELETE FROM updatecontent WHERE user_send = ? ");
		$req->execute(array($ID));
	}
	else if($_POST['action'] == 'setCloseChat')
	{
		$closeToken = $_POST['closeToken'];

		$req = $bdd->prepare(" UPDATE discussions SET closechat = ? WHERE id = ?  ");
		$req->execute(array($closeToken, $id_conversation));
	}
	else if($_POST['action'] == 'getCloseChat')
	{
		$closeToken = $_POST['closeToken'];

		$req = $bdd->prepare(" SELECT closechat FROM discussions WHERE id = ? ");
		$req->execute(array($id_conversation));
		$result = $req->fetch();
		$d['closechat'] = $result['closechat'];
		echo json_encode($d);

		$req = $bdd->prepare(" UPDATE discussions SET closechat = ? WHERE id = ?  ");
		$req->execute(array($closeToken, $id_conversation));
	}
	else if($_POST['action'] == 'isNotConnected')
	{
		$connected = 0;
		$req = $bdd->prepare(" UPDATE membres SET connected = ? WHERE id = ? ");
		$req->execute(array($connected, $idUser));
	}
	else if($_POST['action'] == 'setStatistics')
	{
		$time = date("Y-m-d H:i:s");
		$duration = 30;
		$dateinsec = strtotime($time);
		$newdate = $dateinsec - $duration;
		$current_time = date('Y-m-d H:i:s',$newdate);
		$req = $bdd->prepare(" SELECT user_emit, user_recept FROM messages WHERE time > ? ");
		$req->execute(array($current_time));
		$d['date'][] = $data['user_recept'];
		while($data = $req->fetch())
		{
			$d['user_recept'][] = $data['user_recept'];
			$d['user_emit'][] = $data['user_emit'];
		}
		
		$connected = 1;
		$req = $bdd->prepare(" SELECT id FROM membres WHERE connected = ? ");
		$req->execute(array($connected));
		while($user = $req->fetch())
		{
			$d['user_connected'][] = $user['id'];
		}

		// Nombres de formes dans la matrice
		$req = $bdd->prepare(" SELECT id FROM membres ");
		$req->execute();
		$d['nbr_shapes'] = $req->rowCount();

		// Nombres de formes dans la matrice qui sont connectées
		$req = $bdd->prepare(" SELECT id FROM membres WHERE connected = ? ");
		$req->execute(array(1));
		$d['nbr_shapes_connected'] = $req->rowCount();

		// Nombres de liens qui ont été créé
		$req = $bdd->prepare(" SELECT id FROM discussions WHERE link = ? ");
		$req->execute(array(1));
		$d['nbr_link_created'] = $req->rowCount();

		// Nombres de liens personnels qui ont été créé
		$req = $bdd->prepare(" SELECT id FROM discussions WHERE link = ? AND (user_a = ? OR user_b = ?) ");
		$req->execute(array(1, $idUser, $idUser));
		$d['nbr_linkPerso_created'] = $req->rowCount();

		// Nombres de liens personnels qui ont été créé
		$req = $bdd->prepare(" SELECT id FROM messages ");
		$req->execute();
		$d['nbr_msg_sended'] = $req->rowCount();

		echo json_encode($d);
	}

?>