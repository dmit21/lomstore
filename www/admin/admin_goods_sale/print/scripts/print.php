<?php
session_start();
include("../../../../bd_connect/index.php");
$aid = $_SESSION['sactid'];
$rez[0] = 'оптовики';

try {
$sql = "SELECT goodnum, gdisc, gweight, idprice, gsumhand, gsumsale
        FROM lsaleacttogood lg, lzaloggood lz
        WHERE lg.aid='$aid' and lg.goodid = lz.goodid";
$result = $pdo->query($sql);
while ($row=$result->fetch()) {
  if (isset($salearr)){
    array_push($salearr,array($row['goodnum'],$row['gdisc'],$row['gsumhand'],$row['gweight'],$row['idprice'],$row['gsumsale']));
  }
  else{
    $salearr= array(array($row['goodnum'],$row['gdisc'],$row['gsumhand'],$row['gweight'],$row['idprice'],$row['gsumsale']));
  }
}
$rez[1] = $salearr;
}
catch (PDOException $e){
$error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
include ('../../../../bd_connect/error/index.php');
exit();
}
$rez[2] = $_SESSION['sdatecur'];
$r = json_encode($rez);
echo $r;
?>