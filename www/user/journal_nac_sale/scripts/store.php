<?php
session_start();
$db = $_POST['pdb'];
$de = $_POST['pde'];
include("../../../bd_connect/index.php");
try {
  $sql = "SELECT ln.*  
          FROM lnac ln 
          WHERE ln.nact = 1 AND ln.pointid = '$_SESSION[spoint]' and ln.ndate BETWEEN '$db' AND '$de'
          ORDER BY ln.nnum";
  $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($goodarr)){
        array_push($goodarr,array($row['nid'],$row['ndate'],$row['nnum'],0));
      }
      else{
        $goodarr = array(array($row['nid'],$row['ndate'],$row['nnum'],0));
      }
    }
    $rez[0] = $goodarr;
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include '../../../bd_connect/error.html.php';
  exit();
}

try {
    $sql = "SELECT goodnum, gdisc, gweight, cname, idprice, cdiscont, lz.goodid, gsumhand, gsumsaleadm, ln.nid, lng.nact
            FROM lzaloggood lz, lcatshop lc, lnactogood lng, lnac ln
            WHERE ln.ndate BETWEEN '$db' AND '$de' AND lng.nid = ln.nid AND lz.goodid = lng.goodid AND
                  lz.idcatshop = lc.cid and ln.nact = 1 and lng.nact = 0 and ln.pointid = '$_SESSION[spoint]'
            ORDER BY ln.nid,goodnum";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($gooda)){
        array_push($gooda,array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['cdiscont'],$row['gsumhand'],
                                  $row['gsumsaleadm'],$row['nid'],0,$row['nact']));
      }
      else{
        $gooda= array(array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['cdiscont'],$row['gsumhand'],
                              $row['gsumsaleadm'],$row['nid'],0,$row['nact']));
      }
    }
    $rez[1] = $gooda;
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include '../../../bd_connect/error.html.php';
  exit();
}
$r=json_encode($rez);
echo $r;
?>