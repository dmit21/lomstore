<?php
session_start();
    $store=json_encode($_SESSION['sstorarr']);
    echo $store;
?>