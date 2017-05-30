<?php
  session_start();
  $actid = $_POST['paid'];
  $goods = $_POST['prez'];
  include("../../../bd_connect/index.php");
  // номер накладной
  try {
    $sql = "SELECT max(nnum) AS num 
            FROM lnac
            where nact = 1";
    $result = $pdo->query($sql);
    $row=$result->fetch();
    if ($row['num']==0) {
      $nnum = 1;
    }
    else {
      $nnum = $row['num'] + 1;
    }
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  // номер накладной
    try {
      $sql="INSERT INTO lnac SET
        ndate = :mdate,
        ntime = curtime(),
        uid = :uid,
        nnum = :nnum,
        actid = :actid,
        nact = 1";
        $s = $pdo->prepare($sql);
        $s->bindValue(":uid", $_SESSION["suid"]);
        $s->bindValue(":mdate", $_SESSION["sdatecur"]);
        $s->bindValue(":nnum", $nnum);
        $s->bindValue(":actid", $actid);
        $s->execute();
        $nid=$pdo->lastInsertId();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }

  try {
    $sql = "SELECT pointid FROM lsaleact
            where aid = '$actid'";
    $result = $pdo->query($sql);
    $row=$result->fetch();
    $pid = $row['pointid'];
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }

  try {
    $sql="UPDATE lsaleact SET
      adateadm = :adateadm,
      atimeadm = curtime(),
      aact = 1,
      auid = :auid
      WHERE aid = :aid";
    $s = $pdo->prepare($sql);
    $s->bindValue(":auid", $_SESSION['suid']);
    $s->bindValue(":adateadm", $_SESSION['sdatecur']);
    $s->bindValue(":aid", $actid);
    $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }

  $n = count($goods);
  $_SESSION['nid'] = $nid;
  for($i=0;$i<$n;$i++){
// заполнение таблицы накладная товара    
    try {
      $sql="INSERT INTO lnactogood SET
        nid = :nid,
        goodid = :goodid";
        $s = $pdo->prepare($sql);
        $s->bindValue(":nid", $nid);
        $s->bindValue(":goodid", $goods[$i][0]);
        $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
// заполнение таблицы накладная товара    
    try {
      $sql="INSERT INTO lmovegoods SET
        gid = :gid,
        uid = :uid,
        mdate = :mdate,
        mtime = curtime(),
        mfrom = :mfrom,
        mto = 0,
        aid = :aid";
        $s = $pdo->prepare($sql);
        $s->bindValue(":gid", $goods[$i][0]);
        $s->bindValue(":aid", $actid);
        $s->bindValue(":mfrom", $pid);
        $s->bindValue(":uid", $_SESSION["suid"]);
        $s->bindValue(":mdate", $_SESSION["sdatecur"]);
        $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
    try {
      $sql="UPDATE lzaloggood SET
        gsumsaleadm = :gsumsaleadm,
        admsaleid = :admsaleid,
        gact = 5
        WHERE goodid = :goodid";
      $s = $pdo->prepare($sql);
      $s->bindValue(":admsaleid", $_SESSION['suid']);
      $s->bindValue(":gsumsaleadm", $goods[$i][1]);
      $s->bindValue(":goodid", $goods[$i][0]);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
  }
  echo 'Готово';
?>