<?php
session_start();
$nid =  $_POST['pnid'];
include("../../../bd_connect/index.php");
try {
  $sql = "SELECT lz.goodnum, lz.gdisc, lc.catname,lz.gweight,sn.oldprice,sn.newprice, sn.olddiscont, sn.newdiscont,
                 lz.gsumhand, ls.sname
          FROM snacpricetogood sn, lzaloggood lz, lcat lc, lstores ls
          WHERE sn.nid = '$nid' and lz.goodid = sn.gid and lz.catid = lc.catid and lz.idshop = ls.sid";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($act)){
        array_push($act,array($row['goodnum'],$row['gdisc'],$row['catname'],$row['gweight'], $row['oldprice'], 
                              $row['newprice'], $row['olddiscont'], $row['newdiscont'],$row['gsumhand'],$row['sname']));
      }
      else{
        $act= array(array($row['goodnum'],$row['gdisc'],$row['catname'],$row['gweight'], $row['oldprice'], 
                              $row['newprice'], $row['olddiscont'], $row['newdiscont'],$row['gsumhand'],$row['sname']));
      }
    }
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}
$r=json_encode($act);
echo $r;
?>