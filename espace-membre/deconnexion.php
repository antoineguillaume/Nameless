<?php
    session_start();

    // Effacer les fichiers stockant la session
    session_destroy();

    // Effacer la variable de session
    unset($_SESSION);

    // Redirige le navigateur vers la page d'accueil
    header('Location: ../index.php');
?>