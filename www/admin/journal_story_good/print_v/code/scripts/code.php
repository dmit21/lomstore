<?php
session_start();
$a=strlen($_SESSION['spointnum']);//длина номера пункта
$b=strlen($_SESSION['snumticket']);//длина номера билета
$c=8-$a-$b;//рассчитываем количество недостающих символов
$num=$_SESSION['spointnum'].str_repeat("0", $c).$_SESSION['snumticket'];//определили еомер залогового билета
$rez[0] = $num;
$rez[1] = $_SESSION['sdateopen'];;
$rez[2] = $_SESSION['szaluname'];
$rez[3] = $_SESSION['sclientname'];
$rez[4] = $_SESSION['sforprint'];
$rez[5] = $_SESSION['spointnum'];
$r = json_encode($rez);
echo $r;
unset($_SESSION['sforprint']);
?>