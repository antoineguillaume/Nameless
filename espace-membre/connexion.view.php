<!doctype html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Connexion | Nameless</title>
        <meta name="description" content="Connexion au prototype Nameless qui est un réseau fonctionnel de discussions. Il invite ses utilisateurs à créer des liens de manière à former une œuvre collective en trois dimensions. Ce réseau est essentiellement basé sur les échanges et le mouvement.">
        <meta name="author" content="Antoine Guillaume" />
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Favicon -->
        <link rel="icon" type="image/png" href="img/favicon.png" />

        <!-- Javascript -->
        <script type="text/javascript" src="js/min/detector-min.js"></script>
        <script type="text/javascript" src="js/min/localStorage-min.js"></script>

        <!-- CSS -->
        <link rel="stylesheet" href="css/master.css">
    </head>
    <body role="document">
        <noscript>
            L'activation du javascript est indispensable au bon fonctionnement de cette application web !
        </noscript>
        <div id="container-exp-1"></div>
        <div class="container">
            <header>
                <p class="intro">“ Bienvenue dans la préface matricielle. Je vous offre une opportunité, celle de participer à une expérience immersive. Créez des liens en participant à l’élaboration d’une oeuvre d'art collective. ”</p>
            </header>
            <main>
                <h2>Connexion</h2>
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
                            <a href="espace-membre/inscription.view.php">Pas encore inscrit ?</a>
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
                    <div class="text">Ce projet est une expérimentation que j’ai réalisée dans la cadre de mes études. Celle-ci a pour but d’expérimenter l’implémentation de la 3D dans un navigateur web, grâce notamment à la librairie <a href="http://threejs.org/" target="_blank">Three.js</a>. Le projet vous permet de vivre une expérience immersive dans un monde en 3 dimensions. <a href="https://medium.com/@AKG_Antoine/nameless-99f877e7933b" target="_blank">Un article a été écrit à ce sujet et vous permettra d'en savoir plus.</a></div>
                </div>
            </footer>
        </div>         
    </body>
    <script type="text/javascript" src="three/three.min.js"></script>
    <script type="text/javascript" src="js/libs/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="three/ConvexGeometry.js"></script>
    <script type="text/javascript" src="three/tween.js"></script>
    <script type="text/javascript" src="js/min/THREEx.WindowResize-min.js"></script>
    <script type="text/javascript" src="js/min/inscription-min.js"></script>
</html>