<?php
session_start();
include("../../../../bd_connect/index.php");
try{
  $sql ="SELECT sname, sadress, sphone FROM lstores WHERE sid = 3";
  $result = $pdo->query($sql);
  $row=$result->fetch();
  $rez[0] = $row['sname'];
  $rez[1] = $row['sadress'];
  $rez[2] = $row['sphone'];
}
catch (PDOException $e) {
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ("../../../../bd_connect/error/index.php");
  exit();
}
$rez[3] = $_SESSION['snumorder'];
$rez[4] = $_SESSION['suname'];
$rez[5] = $_SESSION['sdatecur'];
$rez[6] = $_SESSION['ssumentord'];
$r = json_encode($rez);
echo $r;
?>