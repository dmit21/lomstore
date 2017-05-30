<?php
session_start();
$rez[0] = $_SESSION['sstorarr'];
$db = $_POST['pdb'];
$de = $_POST['pde'];
include("../../../bd_connect/index.php");
try {
  $sql = "SELECT ln.*, sname, ls.pointid  
          FROM lsaleact ls, lstores lst, lnac ln 
          WHERE ln.actid = ls.aid AND ln.nact = 1 AND sid = ls.pointid and ln.ndate BETWEEN '$db' AND '$de'
          ORDER BY ls.adate, sname, ls.anum";
  $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($goodarr)){
        array_push($goodarr,array($row['nid'],$row['ndate'],$row['nnum'],$row['sname'],$row['pointid'],0));
      }
      else{
        $goodarr= array(array($row['nid'],$row['ndate'],$row['nnum'],$row['sname'],$row['pointid'],0));
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
    $sql = "SELECT goodnum, gdisc, gweight, cname, idprice, cdiscont, lz.goodid, gsumhand, gsumsale, idshop, ln.nid, ln.nact, gsumsaleadm
            FROM lzaloggood lz, lcatshop lc, lnactogood lng, lnac ln
            WHERE ln.ndate BETWEEN '$db' AND '$de' AND lng.nid = ln.nid AND lz.goodid = lng.goodid AND
                  lz.idcatshop = lc.cid and ln.nact = 1 
            ORDER BY ln.nid,goodnum";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($gooda)){
        array_push($gooda,array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['cdiscont'],$row['gsumhand'],
                                  $row['gsumsale'],$row['idshop'],$row['nid'],0,$row['nact'],$row['gsumsaleadm']));
      }
      else{
        $gooda= array(array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['cdiscont'],$row['gsumhand'],
                              $row['gsumsale'],$row['idshop'],$row['nid'],0,$row['nact'],$row['gsumsaleadm']));
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