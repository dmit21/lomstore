<?php
session_start();
include("../../../bd_connect/index.php");
$s = $_POST['psum'];
$s = stripslashes($s);
$s = htmlspecialchars($s);
$s = trim($s);
$_SESSION['ssumentord'] = $s;
try {
 $sql="INSERT INTO sorder SET
       odate=:odate, 
       otime=curtime(), 
       uid=:id, 
       onum=:num, 
       oosn=:osn, 
       osum=:su, 
       oorder=:ord, 
       opoint=:poin"; 
       $sq = $pdo->prepare($sql);
       $sq->bindValue(":odate", $_SESSION['sdatecur']);
       $sq->bindValue(":id", $_SESSION['suid']);
       $sq->bindValue(":num", $_SESSION['snumorder']);
       $sq->bindValue(":osn", "возврат аванса");
       $sq->bindValue(":su", $s);
       $sq->bindValue(":ord", 1);
       $sq->bindValue(":poin", $_SESSION['spoint']);
       $sq->execute();
}
 catch (PDOException $e)
{
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ("../../../bd_connect/error/index.php");
  exit();
}
include("../../scripts/report.php");
?>