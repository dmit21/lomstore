<?php
session_start();
$rez[0] = $_SESSION['spointnum'];
$rez[1] = $_SESSION['snumticket'];
$a=strlen($_SESSION['spointnum']);//длина номера пункта
$b=strlen($_SESSION['snumticket']);//длина номера билета
$c=8-$a-$b;//рассчитываем количество недостающих символов
$num=$_SESSION['spointnum'].str_repeat("0", $c).$_SESSION['snumticket'];//определили еомер залогового билета
$rez[2] = $num;
$rez[3] = $_SESSION['spaddress'];
$rez[4] = $_SESSION['spphone'];
$rez[5] = $_SESSION['szaluname'];
$rez[6] = $_SESSION['snumlic'];
$rez[7] = $_SESSION['siin'];
$rez[8] = $_SESSION['sclientname'];
$rez[9] = $_SESSION['sdoc'];
$rez[10] = $_SESSION['snumdoc'];
$rez[11] = $_SESSION['scdataget'];
$rez[12] = $_SESSION['swhoname'];
$rez[13] = $_SESSION['sccityname'];
$rez[14] = $_SESSION['scstreetname'];
$rez[15] = $_SESSION['schomenum'];
$rez[16] = $_SESSION['scflatnum'];
$rez[17] = $_SESSION['scphonenum'];
$rez[18] = $_SESSION['scmobilenum'];
$rez[19] = $_SESSION['ssumo'];
$rez[20] = $_SESSION['ssumk'];
$rez[21] = $_SESSION['ssumks'];
$rez[22] = $_SESSION['ssumv'];
$rez[23] = $_SESSION['ssumr'];
$rez[24] = $_SESSION['ssrok'];
$rez[25] = $_SESSION['sdateopen'];
$rez[26] = $_SESSION['stdatelgot'];
$rez[27] = $_SESSION['scred_date_end'];
$rez[28] = $_SESSION['sbonus'];
$rez[29] = $_SESSION['sforprint'];
$r = json_encode($rez);
echo $r;
?>