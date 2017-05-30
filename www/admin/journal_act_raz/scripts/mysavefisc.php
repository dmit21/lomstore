<?php
  session_start();
  $oldprice = $_POST['poldprice'];
  $newprice = $_POST['pnewprice'];
  $oldcat  = $_POST['poldcat'];
  $newcat = $_POST['pnewcat'];
  $oldstore = $_POST['poldstore'];
  $newstore = $_POST['pnewstore'];
  $gid = $_POST['pgid'];
  $nid = $_POST['pnid'];
  include("../../../bd_connect/index.php");
  // запись фискалки
  try {
    $sql="INSERT INTO sraztrack SET
      uid = :uid,
      tdate = curdate(),
      ttime = curtime(),
      oldprice = :oldprice,
      newprice = :newprice,
      oldcat = :oldcat,
      newcat = :newcat,
      oldstore = :oldstore,
      newstore = :newstore,
      nid = :nid,
      goodid = :goodid";
      $s = $pdo->prepare($sql);
      $s->bindValue(":uid", $_SESSION["suid"]);
      $s->bindValue(":oldprice", $oldprice);
      $s->bindValue(":newprice", $newprice);
      $s->bindValue(":oldcat", $oldcat);
      $s->bindValue(":newcat", $newcat);
      $s->bindValue(":oldstore", $oldstore);
      $s->bindValue(":newstore", $newstore);
      $s->bindValue(":nid", $nid);
      $s->bindValue(":goodid", $gid);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
  // запись фискалки

  // запись изменений
  try {
    $sql="UPDATE lzaloggood SET
      idprice = :idprice,
      idshop = :idshop,
      idcatshop = :idcatshop
      WHERE goodid = :goodid";
      $s = $pdo->prepare($sql);
      $s->bindValue(":goodid", $gid);
      $s->bindValue(":idprice", $newprice);
      $s->bindValue(":idcatshop", $newcat);
      $s->bindValue(":idshop", $newstore);
      $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  try {
    $sql="UPDATE lmovegoods SET
      mto = :mto
      WHERE gid = :gid";
      $s = $pdo->prepare($sql);
      $s->bindValue(":gid", $gid);
      $s->bindValue(":mto", $newstore);
      $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }

  try {
    $sql="UPDATE lnactogood SET
      gsum = :gsum
      WHERE goodid = :goodid AND nid = :nid";
      $s = $pdo->prepare($sql);
      $s->bindValue(":goodid", $gid);
      $s->bindValue(":nid", $nid);
      $s->bindValue(":gsum", $newprice);
      $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }

  // запись изменений
?>