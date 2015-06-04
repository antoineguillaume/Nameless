<?php
session_start();
include('../functions.inc.php');
include('bdd_connexion.php');

    $errors = [];

    if(count($_POST)>0)
    {
        $email = trim(htmlspecialchars($_POST['email']));
        $password = sha1($_POST['password']);
        $password2 = sha1($_POST['password2']);

        if(!empty($email) AND !empty($_POST['password']) AND !empty($_POST['password2']))
        {
            if(filter_var($email, FILTER_VALIDATE_EMAIL))
            {
                $reqemail = $bdd->prepare("SELECT * FROM membres WHERE mail = ?");
                $reqemail->execute(array($email));
                $mailexist = $reqemail->rowCount();

                if($mailexist == 0)
                {
                    if($password == $password2)
                    {
                        if(strlen($_POST['password']) > 5 )
                        {
                            $insertmbr = $bdd->prepare("INSERT INTO membres(mail, password) VALUES(?,?) ");
                            $insertmbr->execute(array($email, $password));
                            $_SESSION['inscription'] = 'new-member';
                            $connected = 1;
                            $req = $bdd->prepare(" UPDATE membres SET new_member = ? WHERE mail = ? ");
                            $req->execute(array($connected, $email));
                            header("Location: ../index.php");
                            exit();
                        }
                        else
                        {
                            $errors['password_length'] = "Le mot de passe doit être composé, au minimum, de 6 caractères.";
                        }
                    }
                    else
                    {
                        $errors['password'] = "Les mots de passes ne correspondent pas.";
                    }
                }
                else
                {
                    $errors['email_double'] = "L'adresse email est déjà utilisée !";
                }
            }
            else
            {
                $errors['email_wrong'] = "L'adresse email que vous avez indiquez n'est pas correcte !";
            }
        }
        else
        {
            $errors['empty'] = "Tous les champs n'ont pas été complétés !";
        }
    }
?>

<!doctype html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="description" content="Antoine Guillaume, développeur Front-End.">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon" type="image/png" href="../img/favicon.png" />
        <title>Inscription | Nameless | Antoine Guillaume</title>

        <!--           Feuilles de style              -->

        <link rel="stylesheet" href="../css/master.css">

         <!--          END Feuilles de style          -->
    </head>
    <body role="document" class="inscription-page">
        <div id="container-exp-1"></div>
        <div class="container">
          <header>
                <p>“  Bienvenue dans la préface matricielle. Je vous offre une opportunité, celle de participer à une expérience immersive. Soyez les artisants d’une oeuvre d’art collective. ”</p>
              <h2>Inscription</h2>
          </header>
          <main>
              <form action="#" method="post" class="inscription-form">
                  <fieldset>
                      <ol>
                          <li>
                              <label for="email">
                                  <span>Email<strong><abbr title="obligatoire">*</abbr></strong></span>
                                  <input type="email" name="email" id="email" placeholder="Votre adresse email." value="<?php if(isset($email)) {echo $email;} ?>" required="required" />
                                  <?php echo error_message($errors, 'email_double'); ?>
                                  <?php echo error_message($errors, 'email_wrong'); ?>
                              </label>
                          </li>
                          <li>
                              <label for="password">
                                  <span>Password<strong><abbr title="obligatoire">*</abbr></strong></span>
                                  <input type="password" name="password" id="password" placeholder="Votre mot de passe." required="required" />
                                  <?php echo error_message($errors, 'password'); ?>
                              </label>
                          </li>
                          <li>
                              <label for="password2">
                                  <span>Password<strong><abbr title="obligatoire">*</abbr></strong></span>
                                  <input type="password" name="password2" id="password2" placeholder="Confirmez votre mot de passe." required="required" />
                                  <?php echo error_message($errors, 'password'); ?>
                                  <?php echo error_message($errors, 'password_length'); ?>
                              </label>
                              <?php echo error_message($errors, 'empty'); ?>
                          </li>
                      </ol>
                      <div class="inssend">
                          <input type="submit" value="Je m'inscris" class="submit" id="inscription-submit" />
                          <a href="../index.php">Déjà membre ?</a>
                      </div>
                  </fieldset>
              </form>
          </main>
          <footer>
              <div class="information">
                  <span>?</span>
              </div>
              <div class="tooltip">
                  <div class="arrow-up"></div>
                  <div class="text">Ce projet est une expérimentation que j’ai réalisé dans la cadre de mes études. Ce travail a pour but d’expérimenter l’implémentation de la 3D dans un navigateur web, grâce notamment, à la librairie <a href="http://threejs.org/" target="_blank">Three.js</a>. Ce projet vous permet de vivre une expérience immersive dans un monde en 3 dimensions. Chacune des formes que vous verrez fait référence à un utilisateur.</div>
              </div>
          </footer>
        </div>        
    </body>
    <script type="text/javascript" src="../js/pace.min.js"></script>
    <script type="text/javascript" src="../three/three.min.js"></script>
    <script type="text/javascript" src="../js/libs/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../three/ConvexGeometry.js"></script>
    <script type="text/javascript" src="../three/tween.js"></script>
    <script type="text/javascript" src="../js/THREEx.WindowResize.js"></script>
    <script type="text/javascript" src="../js/inscription.js"></script>
</html>