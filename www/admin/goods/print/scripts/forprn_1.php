<?php
session_start();
$rez[0] = $_SESSION['suname'];
$rez[1] = $_SESSION['sprnar'];
$rez[2] = $_SESSION['svname'];
$rez[3] = $_SESSION['sdatecur'];
echo json_encode($rez); // массив товаров
?>