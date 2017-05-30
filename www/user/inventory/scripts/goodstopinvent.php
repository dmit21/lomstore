<?php
  session_start();
  include("../../../bd_connect/index.php");
  try {
    $sql = "DELETE FROM sinvent WHERE sid = '$_SESSION[spoint]'";
    $result = $pdo->query($sql);
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }

  try {
    $sql = "SELECT goodnum, gdisc, gweight, goodid, idprice
            FROM lzaloggood lz
            WHERE lz.idshop = '$_SESSION[spoint]' and gact <> 5
            order by goodnum";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($goodarr)){
        array_push($goodarr,array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['idprice'],$row['goodid'],0));
      }
      else{
        $goodarr= array(array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['idprice'],$row['goodid'],0));
      }
    }
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  $cat=json_encode($goodarr);
  echo $cat;
?>