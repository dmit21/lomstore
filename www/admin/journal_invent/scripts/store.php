<?php
session_start();
$rez = $_SESSION['sstorarr'];
$r=json_encode($rez);
echo $r;
?>