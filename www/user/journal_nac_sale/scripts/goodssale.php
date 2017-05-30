<?php
  session_start();
  $point = $_POST['ppoint'];
  $mdate = $_POST['pmydate'];
  include("../../../bd_connect/index.php");
  try {
    $sql = "SELECT goodnum, gdisc, gweight, cname, idprice, cdiscont, goodid, gact, gsumhand, gsumsale
            FROM lzaloggood lz, lcatshop lc
            WHERE lz.idcatshop = lc.cid and lz.idshop = '$point' and gact=7 and gdatesale = '$mdate'";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($goodarr)){
        array_push($goodarr,array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['cdiscont'],$row['gact'],$row['gsumhand'],$row['gsumsale']));
      }
      else{
        $goodarr= array(array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['cdiscont'],$row['gact'],$row['gsumhand'],$row['gsumsale']));
      }
    }
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/index.php');
    exit();
  }
  $cat=json_encode($goodarr);
  echo $cat;
?>