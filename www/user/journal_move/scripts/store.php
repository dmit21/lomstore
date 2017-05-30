<?php
session_start();
$mb =  $_POST['pmb'];
$me =  $_POST['pme'];
include("../../../bd_connect/index.php");
try {
  $sql = "SELECT *  
          FROM lnac ln 
          WHERE ln.pointid = '$_SESSION[spoint]' AND ndate BETWEEN '$mb' AND '$me' AND nact = 2
          ORDER BY nnum";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($act)){
        array_push($act,array($row['nid'],$row['ndate'],$row['nnum']));
      }
      else{
        $act= array(array($row['nid'],$row['ndate'],$row['nnum']));
      }
    }
    $rez[0] = $act;
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}
try{// массив товаров накладных
    $sql = "SELECT ln.nid,goodtic,goodnum, gdisc, gweight, idprice
            FROM lnac ln, lzaloggood lz, lnactogood lna
            WHERE ln.pointid = '$_SESSION[spoint]' AND ndate BETWEEN '$mb' AND '$me' AND
            ln.nid = lna.nid and lna.goodid = lz.goodid and ln.nact = 2 
            ORDER BY ln.nid,goodnum";
      $result = $pdo->query($sql);
      while ($row=$result->fetch()) {
        if (isset($garr)){
            array_push($garr,array($row['nid'],$row['goodtic'],$row['goodnum'],$row['gdisc'],$row['gweight'],$row['idprice']));
        }
        else{
          $garr= array(array($row['nid'],$row['goodtic'],$row['goodnum'],$row['gdisc'],$row['gweight'],$row['idprice']));
        }
      }
      $rez[1] = $garr; 
    }
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}
$r=json_encode($rez);
echo $r;
?>