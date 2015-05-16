<?php 

try{
  $bdd = new PDO('mysql:host=127.0.0.1;dbname=espace_membre', 'root', 'root');
  //$bdd = new PDO('mysql:host=antoineguillaume.be.mysql;dbname=antoineguillaum', 'antoineguillaum', 'Dx3vkRH6');
}catch(PDOException $e){
  echo $e->getMessage();
} 

?>