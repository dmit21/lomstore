<?php
session_start();
$rez[0] =  $_SESSION['spnum'];
$rez[1] = $_SESSION['spphone'];
$rez[2] = $_SESSION['spname'];
$rez[3] = $_SESSION['sanum'];
$rez[4] = $_SESSION['sadate'];
$rez[5] = $_SESSION['sgact'];
$rez[6] = $_SESSION['sname'];
$rez[7] = $_SESSION['sggact'];
unset($_SESSION['sgact']);
unset($_SESSION['sggact']);
$r = json_encode($rez);
echo $r;
?>