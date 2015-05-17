<!doctype html>
<html>
    <head>
        <title>Nameless | Antoine Guillaume</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/master.css">
    </head>
    <body>
        
        <!-- Création d'un canvas dans ce container -->
        <div id="container-exp-1"></div>

<!--         <div class="connexion-links">
            <a href="#" class="disconnect">Se déconnecter</a>
        </div>  -->

        <div class="md-modal modal-chat">
            <div class="md-content">
                <div class="chat">
                    <ul class="chatroom"></ul>
                    <form id="chatForm" method="post" action="">
                       <fieldset>
                            <input type="text" name="message" id="message" placeholder="Write something..." />
                            <div class="error-length"><p class="errors-lign">Votre message doit contenir au maximum 130 caractères et il contient <span class="text-lenght"></span> caractères.</p></div>
                            <!--  <textarea name="fiche" id="fiche" placeholder="You can save here informations you receive from your interlocutor."></textarea>
                            <button class="md-save">Save</button> -->
                       </fieldset>
                    </form>
                    <form action="" method="post" id="chatFiche">
                        <fieldset>
                            
                        </fieldset>
                    </form>
                </div>
            </div>
            <button class="md-close md-close-chat">Close me!</button>
        </div>

        <div class="popup">
            <p>Une forme souhaite vous parler !</p>
            <div class="buttons">
                <button class="left-button">Accepter</button>
                <button class="right-button">Refuser</button>
            </div>
        </div>

        <div class="md-modal modal-welcome">
            <div class="md-content">
                <h2>Bienvenue,</h2>
                <p>Vous êtes actuellement dans une grande matrice de formes dans laquelle vous allez voyager. Chaque forme que vous voyez correspond à un utilisateur. Si vous voulez parler à cette personne, interragissez avec sa forme. Essayez de créer et de garder les connexions que vous faites avec les autres ! Chaque connexion contribue à la création de la matrice.</p>
                <p>Les formes qui sont moins visibles sont des formes inactives, vous ne pouvez donc pas interagir avec celles-ci. Pour discuter avec quelqu’un, il faut impérativement que vous soyez tous les deux connectés.</p>
                <p>Dans la matrice, vous allez remarquer qu’il y a une forme un peu plus particulière. La forme <span class="blackshape">noire</span>. Celle-ci est le seul et unique échappatoire mis à votre disposition. En interagissant avec elle, vous serez déconnecté de la matrice.</p>
                <p class="align-right">Voyagez, découvrez, créez.</p>
                <div class="new-shape">
                    <p>La matrice vient de vous créer une forme personnelle. Vous la verrez différamment des autres de manère à mieux la reconnaitre.</p>
                </div>
            </div>
            <button class="md-close">Close me!</button>
        </div>

        <div class="navigation-icons">
            <svg version="1.1" id="Calque_1" viewBox="60 301.5 830 542" enable-background="new 60 301.5 830 542" xml:space="preserve">
            <g id="Arrow">
                <polygon id="arrow-37-icon_4_" fill="#B5B5B5" points="791.359,712.5 724.086,739.112 724.086,685.889     "/>
                <polygon id="arrow-37-icon_6_" fill="#B5B5B5" points="468.736,398.951 495.349,466.224 442.123,466.224   "/>
                <polygon id="arrow-37-icon_5_" fill="#B5B5B5" points="468.737,746.137 442.123,678.864 495.349,678.864   "/>
                <polygon id="arrow-37-icon_7_" fill="#B5B5B5" points="151.201,712.5 218.474,685.888 218.474,739.112     "/>
            </g>
            <g id="Bordure">
                <path fill="none" stroke="#B5B5B5" stroke-width="20" stroke-miterlimit="10" d="M873.722,808.657
                    c0,10.959-8.884,19.843-19.843,19.843H661.565c-10.959,0-19.843-8.884-19.843-19.843V616.343c0-10.959,8.884-19.843,19.843-19.843
                    h192.314c10.959,0,19.843,8.884,19.843,19.843V808.657L873.722,808.657z"/>
                <path fill="none" stroke="#B5B5B5" stroke-width="20" stroke-miterlimit="10" d="M588.737,808.657
                    c0,10.959-8.884,19.843-19.843,19.843H376.578c-10.959,0-19.843-8.884-19.843-19.843V616.343c0-10.959,8.884-19.843,19.843-19.843
                    h192.314c10.959,0,19.843,8.884,19.843,19.843L588.737,808.657L588.737,808.657z"/>
                <path fill="none" stroke="#B5B5B5" stroke-width="20" stroke-miterlimit="10" d="M588.737,528.744
                    c0,10.959-8.884,19.843-19.843,19.843H376.578c-10.959,0-19.843-8.884-19.843-19.843V336.43c0-10.959,8.884-19.843,19.843-19.843
                    h192.314c10.959,0,19.843,8.884,19.843,19.843L588.737,528.744L588.737,528.744z"/>
                <path fill="none" stroke="#B5B5B5" stroke-width="20" stroke-miterlimit="10" d="M305.251,808.657
                    c0,10.959-8.884,19.843-19.843,19.843H93.094c-10.959,0-19.843-8.884-19.843-19.843V616.343c0-10.959,8.884-19.843,19.843-19.843
                    h192.314c10.959,0,19.842,8.884,19.842,19.843L305.251,808.657L305.251,808.657z"/>
            </g>
            </svg>

            <svg version="1.1" id="Calque_1" viewBox="0 0 349.109 406.77" enable-background="new 0 0 349.109 406.77"
                 xml:space="preserve">
            <path fill="none" stroke="#B5B5B5" stroke-width="20" stroke-miterlimit="10" d="M277.183,282.604
                c0,57.729-46.801,104.53-104.531,104.53l0,0c-57.73,0-104.531-46.801-104.531-104.53V121.166
                c0-57.729,46.801-104.531,104.531-104.531l0,0c57.729,0,104.531,46.802,104.531,104.531V282.604z"/>
            <circle fill="#B5B5B5" cx="172.652" cy="99.5" r="19.5"/>
            </svg>
        </div>

        <div class="statistiques">
            <div class="stats">
                <span class="chiffre1"></span>
                <p>formes présentes dans la matrice</p>
            </div>
            <div class="stats">
                <span class="chiffre2"></span>
                <p>formes actuellement connectées</p>
            </div>
            <div class="stats">
                <span class="chiffre3"></span>
                <p>connexions existantes dans la matrice</p>
            </div>
            <div class="stats">
                <span class="chiffre4"></span>
                <p>connexions dont vous êtes l'auteur</p>
            </div>
            <div class="stats">
                <span class="chiffre5"></span>
                <p>messages ont été postés</p>
            </div>            
        </div>

    </body>
    <script type="text/javascript" src="three/three.min.js"></script>
    <script type="text/javascript" src="js/libs/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="three/ConvexGeometry.js"></script>
    <script type="text/javascript" src="three/FirstPersonControls.js"></script>
    <script type="text/javascript" src="three/tween.js"></script>
    <script type="text/javascript" src="js/THREEx.WindowResize.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</html>
