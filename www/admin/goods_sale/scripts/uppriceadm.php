<?php
  session_start();
  $goodid = $_POST['pgoodid'];
  $sum    = $_POST['psum'];
  include("../../../bd_connect/index.php");
  try {
    $sql="UPDATE lzaloggood SET
      gsumsaleadm = :gsumsaleadm
      WHERE goodid = :goodid";
    $s = $pdo->prepare($sql);
    $s->bindValue(":gsumsaleadm", $sum);
    $s->bindValue(":goodid", $goodid);
    $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }

  try {
    $sql="INSERT INTO suserchangeprice SET
          uid = :uid,
          cdate = :cdate,
          ctime = curtime(),
          goodid = :goodid,
          oldprice = :oldprice,
          newprice = :newprice,
          uact = 1";
    $s = $pdo->prepare($sql);
    $s->bindValue(":uid", $_SESSION['suid']);
    $s->bindValue(":cdate", $_SESSION['sdatecur']);
    $s->bindValue(":goodid", $goodid);
    $s->bindValue(":oldprice", $oldprice);
    $s->bindValue(":newprice", $newprice);
    $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
?>