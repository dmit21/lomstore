<?php
session_start();
    $rez[0] = $_SESSION['sstorarr'];
    $rez[1] = $_SESSION['scatarrshop'];
    $cat1=json_encode($rez);
    echo $cat1;
?>