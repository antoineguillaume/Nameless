<!doctype html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="description" content="Antoine Guillaume, développeur Front-End.">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon" type="image/png" href="img/favicon.png" />
        <title>Connexion | Nameless | Antoine Guillaume</title>

        <script type="text/javascript" src="js/detector.js"></script>
        <script type="text/javascript" src="js/localStorage.js"></script>

        <!--           Feuille de style              -->

        <link rel="stylesheet" href="css/master.css">

         <!--          END Feuille de style          -->
    </head>
    <body role="document">
        <div id="container-exp-1"></div>
        <div class="container">
            <header>
                <p>“ Bienvenue dans la préface matricielle. Je vous offre une opportunité, celle de participer à une expérience immersive. Je vous offre l’occasion de sortir de ce monde endossé de préjugés. Découvrez cet environnement où l’anonymat couvre votre identité. ”</p>
                <h2>Connexion</h2>
            </header>
            <main>
                <form action="" method="post" class="inscription-form connexion-form">
                    <fieldset>
                        <ol>
                            <li>
                                <label for="email">
                                    <span>Email<strong><abbr title="obligatoire">*</abbr></strong></span>
                                    <input type="email" name="emailconnect" id="emailconnect" placeholder="Votre adresse email." required="required" />
                                </label>
                            </li>
                            <li>
                                <label for="password">
                                    <span>Password<strong><abbr title="obligatoire">*</abbr></strong></span>
                                    <input type="password" name="passwordconnect" id="passwordconnect" placeholder="Votre mot de passe." required="required" />
                                    <?php echo error_message($errors, 'pb-connexion'); ?>
                                </label>
                                <?php echo error_message($errors, 'empty'); ?>
                            </li>
                        </ol>
                        <div class="inssend">
                            <input type="submit" value="Se connecter" class="submit" id="connexion-button" />
                            <a href="espace-membre/inscription.view.php">Pas encore inscris ?</a>
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
    <script type="text/javascript" src="three/three.min.js"></script>
    <script type="text/javascript" src="js/libs/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="three/ConvexGeometry.js"></script>
    <script type="text/javascript" src="three/tween.js"></script>
    <script type="text/javascript" src="js/THREEx.WindowResize.js"></script>
    <script type="text/javascript" src="js/inscription.js"></script>
</html>