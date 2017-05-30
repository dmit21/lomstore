<?php
session_start();
$rez[0] = $_SESSION['spointname'];
$rez[1] = $_SESSION['strans'];
$r = json_encode($rez);
echo $r;
?>