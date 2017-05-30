<?php
session_start();
include("../../../bd_connect/index.php");
try {
  $sql = "SELECT ss.catid, ss.pointid, ss.sprice, ss.discont,lc.cname
          FROM sstoretodiscont ss, lcatshop lc
          where lc.cid = ss.catid
          ORDER BY pointid,catid";
  $result = $pdo->query($sql);
  while ($row=$result->fetch()) {
    if (isset($catarr)){
      array_push($catarr,array($row['pointid'],$row['catid'],$row['sprice'],$row['discont'],$row['cname']));
    }
    else{
      $catarr= array(array($row['pointid'],$row['catid'],$row['sprice'],$row['discont'],$row['cname']));
    }
  }
  $cat=json_encode($catarr);
  echo $cat;
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}
?>