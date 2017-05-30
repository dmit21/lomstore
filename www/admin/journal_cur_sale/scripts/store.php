<?php
session_start();
$rez[0] = $_SESSION['sstorarr'];
include("../../../bd_connect/index.php");
try {
  $sql = "SELECT ls.*, sname, ls.pointid  
          FROM lsaleact ls, lstores lst 
          WHERE   ((ls.aact = 0) OR (ls.aact = 2) OR (ls.aact = 3))  AND sid = ls.pointid 
          ORDER BY ls.adate, sname, ls.anum";
  $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($goodarr)){
        array_push($goodarr,array($row['aid'],$row['adate'],$row['anum'],$row['sname'],$row['pointid'],0));
      }
      else{
        $goodarr= array(array($row['aid'],$row['adate'],$row['anum'],$row['sname'],$row['pointid'],0));
      }
    }
    $rez[1] = $goodarr;
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}

try {
    $sql = "SELECT goodnum, gdisc, gweight, cname, idprice, cdiscont, lz.goodid, gsumhand, gsumsale, idshop, ls.aid, ls.aact, gsumsaleadm
            FROM lzaloggood lz, lcatshop lc, lsaleacttogood lsg, lsaleact ls
            WHERE  lsg.aid = ls.aid AND lz.goodid = lsg.goodid AND
                  lz.idcatshop = lc.cid and ((ls.aact = 0) OR (ls.aact = 2) OR (ls.aact = 3)) 
            ORDER BY ls.aid,goodnum";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($gooda)){
        array_push($gooda,array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['cdiscont'],$row['gsumhand'],
                                  $row['gsumsale'],$row['idshop'],$row['aid'],0,$row['aact'],$row['gsumsale']));
      }
      else{
        $gooda= array(array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['cdiscont'],$row['gsumhand'],
                                  $row['gsumsale'],$row['idshop'],$row['aid'],0,$row['aact'],$row['gsumsale']));
      }
    }
    $rez[2] = $gooda;
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}
$r=json_encode($rez);
echo $r;
?>