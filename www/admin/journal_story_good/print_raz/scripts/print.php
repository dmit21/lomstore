<?php
session_start();
$rez[0] = $_SESSION['sruc'];
$rez[1] = $_SESSION['sggact'];
$r = json_encode($rez);
echo $r;
?>