<?php

// СКРИПТ ВЫТАСКИВАЕТ МАССИВ КАТЕГОРИЙ, ВИТРИН И МАССИВ СКИДОК ПО КАТЕГОРИЯМ И ВИТРИНАМ 

session_start();
$rez[0] = $_SESSION['sstorarr'];
$rez[1] = $_SESSION['scatarrshop'];
include("../../../bd_connect/index.php");
try {
  $sql = "SELECT ss.pointid, ss.catid, ss.discont, lc.cname, ss.sprice
          FROM sstoretodiscont ss, lcatshop lc
          WHERE ss.catid = lc.cid 
          ORDER BY pointid, catid";
  $result = $pdo->query($sql);
  while ($row=$result->fetch()) {
    if (isset($discont)){
      array_push($discont,array($row['pointid'],$row['catid'],$row['discont'], $row['cname'],$row['sprice']));
    }
    else{
      $discont = array(array($row['pointid'],$row['catid'],$row['discont'], $row['cname'],$row['sprice']));
    }
  }
  $rez[2] = $discont;
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
  echo $e;
}
$r=json_encode($rez);
echo $r;

// СКРИПТ ВЫТАСКИВАЕТ МАССИВ КАТЕГОРИЙ, ВИТРИН И МАССИВ СКИДОК ПО КАТЕГОРИЯМ И ВИТРИНАМ
?>