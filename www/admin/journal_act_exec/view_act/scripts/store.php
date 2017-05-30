<?php
session_start();
    $cat1=json_encode($_SESSION['sstorarr']);
    echo $cat1;
?>