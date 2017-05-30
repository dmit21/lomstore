<?php
session_start();
  $point = $_POST['psel']; 
  setcookie('lomst_id', $point, time()+10*365*24*60*60,'/');
  echo "ready";
?>