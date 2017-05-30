<?php
session_start();
$rez[0] = $_SESSION['spointname'];
$rez[1] = $_SESSION['spointphone'];
$rez[2] = $_SESSION['snumorder'];
$rez[3] = $_SESSION['sdatecur'];
$rez[4] = $_SESSION['ssumentord'];
$rez[5] = $_SESSION['ssumentord'];
$rez[6] = $_SESSION['suname'];
$rez[7] = $_SESSION['spointnum'];
$r = json_encode($rez);
echo $r;
?>