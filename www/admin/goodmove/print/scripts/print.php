<?php
session_start();
$nid = $_SESSION['snid'];
include("../../../../bd_connect/index.php");
try {
      $sql = "SELECT goodnum, gdisc, gweight, catname, goodtic, usurname, uname,usecname,nnum
              FROM lnac ln, lnactogood lg, lzaloggood lz, lcat lc, luser lu 
              WHERE ln.nid = '$nid' and ln.nid = lg.nid and lz.goodid = lg.goodid and lc.catid = lz.catid and lu.uid = lz.uid";
      $result = $pdo->query($sql);
      while ($row=$result->fetch()) {
        if (isset($garr)){
            array_push($garr,array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['catname'],$row['goodtic'],$row['nnum'],$row['usurname'].' '.$row['uname'].' '.$row['usecname']));
        }
        else{
          $garr= array(array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['catname'],$row['goodtic'],$row['nnum'],$row['usurname'].' '.$row['uname'].' '.$row['usecname']));
        }
      }
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../../bd_connect/error/index.php');
  exit();
}
$rez[0] = $garr[0][5];
$rez[1] = $_SESSION['suname'];
$rez[2] = $_SESSION['sdatecur'];
$rez[3] = $garr;
$r = json_encode($rez); // массив товаров
echo $r; // массив товаров
?>