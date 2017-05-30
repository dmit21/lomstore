<?php
session_start();
$rez[0] = $_SESSION['snid'];
$nid = $_SESSION['snid'];
include("../../../../bd_connect/index.php");
try {
    $sql = "SELECT goodnum,gdisc,catname,gweight,gsumhand,idprice,cdiscont,gsumsaleadm, lu.usurname,lu.uname,lu.usecname,lna.nnum,lst.sname
            FROM lnactogood ln, lzaloggood lz, luser lu, lcat lc, lcatshop ls, lnac lna, lstores lst
            WHERE ln.nid = '$nid' AND lz.goodid = ln.goodid AND lz.catid = lc.catid and lz.idcatshop = ls.cid and lz.uid = lu.uid and ln.nid = lna.nid and lst.sid = lz.idshop AND ln.nact = 0" ;
    $result = $pdo->query($sql);
    while($row=$result->fetch()){
      if (isset($nac)){
        array_push($nac,array($row['goodnum'],$row['gdisc'],$row['catname'],$row['gweight'],$row['gsumhand'],$row['idprice'],$row['cdiscont'],$row['gsumsaleadm'],
        					  $row['usurname']." ".$row['uname']." ".$row['usecname'],$row['nnum'],$row['sname']));
      }
      else{
        $nac= array(array($row['goodnum'],$row['gdisc'],$row['catname'],$row['gweight'],$row['gsumhand'],$row['idprice'],$row['cdiscont'],$row['gsumsaleadm'],
        				  $row['usurname']." ".$row['uname']." ".$row['usecname'],$row['nnum'],$row['sname']));
      }
    };
}
catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
}
$rez[1] = $nac;
$rez[2] = $_SESSION['suname'];
$rez[3] = $_SESSION['sdatecur'];
$r = json_encode($rez); // массив товаров
echo $r; // массив товаров
?>