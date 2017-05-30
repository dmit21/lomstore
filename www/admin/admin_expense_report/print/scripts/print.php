<?php
session_start();
$rez[0] = $_SESSION['spointname'];
$rez[1] = $_SESSION['spointphone'];
$rez[2] = $_SESSION['spointnum'];
$rez[3] = $_SESSION['srdate'];
$rez[4] = $_SESSION['sosumday'];
$rez[5] = $_SESSION['ssumprih'];
$rez[6] = $_SESSION['ssumras'];
$rez[7] = $_SESSION['ssumsale'];
$rez[8] = $_SESSION['sosumend'];
$rez[9] = $_SESSION['suname'];
$rez[10] = $_SESSION['ssumcor'];
$rez[11] = $_SESSION['sosumendras'];
$rez[12] = $_SESSION['ssumvvoz'];
/*
$rez[0] = $_SESSION['spointname'];
$rez[1] = $_SESSION['spointphone'];
$rez[2] = $_SESSION['spointnum'];
$rez[3] = $_SESSION['srdate'];
$rez[4] = $_SESSION['sosumday'];
$rez[5] = $_SESSION['ssumprih'];
$rez[6] = $_SESSION['ssumras'];
$rez[7] = $_SESSION['ssumsale'];
$rez[8] = $_SESSION['sosumend'];
$rez[9] = $_SESSION['suname'];
*/
$r = json_encode($rez);
echo $r;
?>