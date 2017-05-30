<?php
session_start();
include("../../../bd_connect/index.php");
try {
  $sql = "SELECT ss.catid as mcatid, ss.pointid as mpointid, ss.sprice as msprice, ss.discont as sdiscont, lc.cname as mcname
          FROM lcatshop lc, sstoretodiscont ss
          where lc.cid = ss.catid
          ORDER BY ss.pointid,ss.catid";
  $result = $pdo->query($sql);
  while ($row=$result->fetch()) {
    if (isset($catarr)){
      array_push($catarr,array($row['mcatid'],$row['mpointid'],$row['msprice'],$row['sdiscont'],$row['mcname']));
    }
    else{
      $catarr= array(array($row['mcatid'],$row['mpointid'],$row['msprice'],$row['sdiscont'],$row['mcname']));
    }
  }
  $cat=json_encode($catarr);
  echo $cat;
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include '../../../bd_connect/error/';
  exit();
}
?>