<?php
session_start();
include("../../../bd_connect/index.php");
$nid  = $_POST['pnid'];
$db  = $_POST['pdb'];
try{
  $sql="UPDATE snacprice SET 
    ndate = :ndate,
    ntime = curtime(),
    snact = 0
    where nid = '$nid'";
    $s = $pdo->prepare($sql);
    $s->bindValue(":ndate", $db);
    $s->execute();
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ("../../../bd_connect/error/index.php");
  exit();
}

if($db==$_SESSION['sdatecur']){
  try {
    $sql="UPDATE lzaloggood lz join (select * from snacpricetogood where nid = '$nid' and snact = 1) t1 on lz.goodid = t1.gid
    SET
      lz.idcatshop = t1.newcat,
      lz.idprice = t1.newprice,
      lz.mdiscount = t1.newdiscont,
      lz.gind = 1";
      $s = $pdo->prepare($sql);
      $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ("../../../bd_connect/error/index.php");
    exit();
  }

  try {
    $sql="UPDATE lzaloggood lz join (select * from snacpricetogood where nid = '$nid' and snact = 2) t1 on lz.goodid = t1.gid
    SET
      lz.idcatshop = t1.newcat,
      lz.idprice = t1.newprice,
      lz.mdiscount = t1.newdiscont,
      lz.gind = 0";
      $s = $pdo->prepare($sql);
      $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ("../../../bd_connect/error/index.php");
    exit();
  }

  try{
    $sql="UPDATE snacprice
    SET
      snact = 1
    where nid = '$nid'";
    $s = $pdo->prepare($sql);
    $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ("../../../bd_connect/error/index.php");
    exit();
  }
}
?>