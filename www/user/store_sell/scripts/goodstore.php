<?php
  session_start();
  include("../../../bd_connect/index.php");
  
  try {
    $sql = "SELECT goodnum, gdisc, gweight, cname, idprice, mdiscount, lz.goodid, gact, gsumhand, gsumsale
            FROM lzaloggood lz, lcatshop lc, lsaleacttogood ls
            WHERE ls.aid = '$_SESSION[ssaleact]' and ls.goodid = lz.goodid and lz.idcatshop = lc.cid";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($goodsarr)){
        array_push($goodsarr,array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['mdiscount'],$row['gact'],$row['gsumhand'],
          $row['gsumsale']));
      }
      else{
        $goodsarr= array(array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['mdiscount'],$row['gact'],$row['gsumhand'],$row['gsumsale']));
      }
    }
    $rez[0] = $goodsarr;
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  try {
    $sql = "SELECT goodnum, gdisc, gweight, cname, idprice, mdiscount, lz.goodid, gact, gsumhand  
            FROM lzaloggood lz left join (select goodid from lsaleacttogood where aid = '$_SESSION[ssaleact]') as t1 on t1.goodid = lz.goodid, lcatshop lc
            WHERE t1.goodid is null and lz.idcatshop = lc.cid and lz.idshop = '$_SESSION[spoint]' and (gact=4 or gact = 6)";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($goodarr)){
        array_push($goodarr,array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['mdiscount'],$row['gact'],$row['gsumhand'],0));
      }
      else{
        $goodarr= array(array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['mdiscount'],$row['gact'],$row['gsumhand'],0));
      }
    }
    $rez[1] = $goodarr;
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  $cat=json_encode($rez);
  echo $cat;
?>