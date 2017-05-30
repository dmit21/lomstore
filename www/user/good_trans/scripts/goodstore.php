<?php
  session_start();
  include("../../../bd_connect/index.php");
// товары
  try {
    $sql = "SELECT goodnum, gdisc, gweight, cname, idprice, goodid, gsumhand  
            FROM lzaloggood lz, lcatshop lc
            WHERE lz.idcatshop = lc.cid and lz.idshop = '$_SESSION[spoint]' and gact = 4";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($goodarr)){
        array_push($goodarr,array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['cname'],$row['idprice'],$row['goodid'],0,$row['gsumhand']));
      }
      else{
        $goodarr= array(array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['cname'],$row['idprice'],$row['goodid'],0,$row['gsumhand']));
      }
    }
    $rez[0] = $goodarr;
  }
    catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include '../../../bd_connect/error.html.php';
    exit();
  }
// пункты
  try {
    $sql = "SELECT *
            FROM lstores";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($storarr)){
        array_push($storarr,array($row['sid'],$row['sname']));
      }
      else{
        $storarr= array(array($row['sid'],$row['sname']));
      }
    }
    $rez[1] = $storarr;
  }
    catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include '../../../bd_connect/error.html.php';
    exit();
  }

    $cat=json_encode($rez);
    echo $cat;
?>