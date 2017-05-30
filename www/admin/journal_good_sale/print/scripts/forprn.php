<?php
session_start();
$rez[0] = $_SESSION['svname'];
$rez[1] = $_SESSION['sgoods'];
$r = json_encode($rez); // массив товаров
echo $r; // массив товаров
?>