<?php 

try{
  $bdd = new PDO('mysql:host=127.0.0.1;dbname=espace_membre', 'root', 'root');
}catch(PDOException $e){
  echo $e->getMessage();
} 

?>
