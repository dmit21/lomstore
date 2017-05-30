<?php
session_start();
include("../../../bd_connect/index.php");
$nid = $_POST['pnid'];
$gid = $_POST['pgid'];
$oldprice = $_POST['poldprice'];
$newprice = $_POST['pnewprice'];
$oldcat = $_POST['poldcat'];
$newcat = $_POST['pnewcat'];
$olddiscont = $_POST['polddiscont'];
$newdiscont = $_POST['pnewdiscont'];
$snact = $_POST['psnact'];
try{// удаление, если есть, строки с тем же id товара, что и текущий
  $sql="DELETE FROM snacpricetogood where nid = '$nid' and gid = '$gid'";
  $s = $pdo->prepare($sql);
  $s->execute();
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ("../../../bd_connect/error/index.php");
  exit();
}
try{
  $sql="INSERT INTO snacpricetogood SET 
    nid = :nid,
    gid = :gid,
    oldprice = :oldprice,
    newprice = :newprice,
    oldcat = :oldcat,
    newcat = :newcat,
    olddiscont = :olddiscont,
    newdiscont = :newdiscont,
    snact = :snact";
  $s = $pdo->prepare($sql);
  $s->bindValue(":nid", $nid);
  $s->bindValue(":gid", $gid);
  $s->bindValue(":oldcat", $oldcat);
  $s->bindValue(":oldprice", $oldprice);
  $s->bindValue(":olddiscont", $olddiscont);
  $s->bindValue(":newcat", $newcat);
  $s->bindValue(":newprice", $newprice);
  $s->bindValue(":newdiscont", $newdiscont);
  $s->bindValue(":snact", $snact);
  $s->execute();
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ("../../../bd_connect/error/index.php");
  exit();
}
?>