<?php
  session_start();
  include("../../../bd_connect/index.php");
  try {
    $sql = "SELECT lz.goodnum, lz.gdisc, lz.gweight, lz.goodid, lz.idprice  
            FROM lzaloggood lz, sinvent si
            WHERE si.sid = '$_SESSION[spoint]' and si.goodid = lz.goodid and  gact <> 5
            order by goodnum";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($goodarr)){
        array_push($goodarr,array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['idprice'],$row['goodid'],1));
      }
      else{
        $goodarr= array(array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['idprice'],$row['goodid'],1));
      }
    }
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }

  try {
    $sql = "SELECT goodnum, gdisc, gweight, lz.goodid, idprice
            FROM lzaloggood lz left join sinvent si on lz.goodid=si.goodid
            WHERE lz.idshop = '$_SESSION[spoint]' and gact <> 5 and si.goodid is null
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