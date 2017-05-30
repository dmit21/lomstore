<?php
session_start();
$rez[0] = $_SESSION['sstorarr'];
include("../../../bd_connect/index.php");
try {
  $sql = "SELECT ls.*, sname  
          FROM lsaleact ls, lstores lst 
          WHERE (aact = 0 AND adate<'$_SESSION[sdatecur]' OR aact = 3)  AND sid = ls.pointid 
          ORDER BY ls.adate, sname, ls.anum";
  $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($goodarr)){
        array_push($goodarr,array($row['aid'],$row['adate'],$row['uid'],$row['pointid'],$row['anum'],$row['sname'],0));
      }
      else{
        $goodarr= array(array($row['aid'],$row['adate'],$row['uid'],$row['pointid'],$row['anum'],$row['sname'],0));
      }
    }
    $rez[1] = $goodarr;
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include("../../../bd_connect/error/index.php");
  exit();
}

try {
    $sql = "SELECT goodnum, gdisc, gweight, cname, idprice, mdiscount, lz.goodid, gsumhand, gsumsale, idshop, ls.aid
            FROM lzaloggood lz, lcatshop lc, lsaleacttogood ls, lsaleact lsa
            WHERE (lsa.aact = 0 AND lsa.adate<'$_SESSION[sdatecur]' OR lsa.aact = 3) AND lz.idcatshop = lc.cid AND lsa.aid = ls.aid AND ls.goodid = lz.goodid
            ORDER BY ls.aid,goodnum";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($gooda)){
        array_push($gooda,array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['mdiscount'],$row['gsumhand'],
                                  $row['gsumsale'],$row['idshop'],$row['aid'],0));
      }
      else{
        $gooda= array(array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['mdiscount'],$row['gsumhand'],
                              $row['gsumsale'],$row['idshop'],$row['aid'],0));
      }
    }
    $rez[2] = $gooda;
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include("../../../bd_connect/error/index.php");
  exit();
}
$r=json_encode($rez);
echo $r;
?>