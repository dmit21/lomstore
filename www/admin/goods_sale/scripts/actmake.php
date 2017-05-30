<?php
  session_start();
  $actid = $_POST['paid'];
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

  // определяем дату и пункт обрабатываемого акта
  try {
    $sql = "SELECT pointid, adate FROM lsaleact
            where aid = '$actid'";
    $result = $pdo->query($sql);
    $row=$result->fetch();
    $pid = $row['pointid'];
    $adate = $row['adate'];
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  // определяем дату и пункт обрабатываемого акта

  try {
    $sql="INSERT INTO lnac SET
      ndate = :mdate,
      ntime = curtime(),
      uid = :uid,
      nnum = :nnum,
      actid = :actid,
      pointid = :pointid,
      nact = 1";
      $s = $pdo->prepare($sql);
      $s->bindValue(":uid", $_SESSION["suid"]);
      $s->bindValue(":mdate", $adate);
      $s->bindValue(":nnum", $nnum);
      $s->bindValue(":actid", $actid);
      $s->bindValue(":pointid", $pid);
      $s->execute();
      $nid=$pdo->lastInsertId();
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

  $_SESSION['snid'] = $nid;

// заполнение таблицы накладная товара    
  try {
    $sql="INSERT INTO lnactogood (nid, goodid)
          select '$nid', ls.goodid from lsaleacttogood ls where ls.aid = '$actid'";
      $s = $pdo->prepare($sql);
      $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
// заполнение таблицы накладная товара    

  // заполнение перемещение товаров
  $uid = $_SESSION["suid"];
  $datecur = $_SESSION['sdatecur'];
  try {
    $sql="INSERT INTO lmovegoods (gid, uid, mdate, mtime, mfrom, mto, aid, moveid)
          select goodid, '$uid', '$datecur', curtime(),'$pid',0,'$nid',2 from lsaleacttogood ls where ls.aid = '$actid'";
      $s = $pdo->prepare($sql);
      $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  // заполнение перемещение товаров

  // цена администратора, там, где цена не была изменена - gsumsaleadm = 0
  try {
    $sql="UPDATE lzaloggood lz join (select goodid from lsaleacttogood lt where lt.aid = '$actid') t1 
          on t1.goodid = lz.goodid
          SET 
          lz.admsaleid = '$uid',
          lz.gact = 5";
    $s = $pdo->prepare($sql);
    $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }

  try {
    $sql="UPDATE lzaloggood lz join (select goodid from lsaleacttogood lt where lt.aid = '$actid') t1 
          on t1.goodid = lz.goodid
          SET 
          lz.gsumsaleadm = lz.gsumsale
          where lz.gsumsaleadm = 0";
    $s = $pdo->prepare($sql);
    $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  // цена администратора, там, где цена не была изменена - gsumsaleadm = 0

  // определяем значение корректировки
  try {
    $sql = "SELECT sum(gsumsale-gsumsaleadm) AS dsum 
            FROM lzaloggood lz, lsaleacttogood ls 
            where lz.goodid = ls.goodid and ls.aid = '$actid'";
    $result = $pdo->query($sql);
    $row=$result->fetch();
    $dsum = $row['dsum'];
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  // определяем значение корректировки

  if($dsum!=0){
    // проверка и формирования остатков
    try {
      $sql = "SELECT osum FROM sostatok WHERE oact=1 AND odate='$_SESSION[sdatecur]' AND pointid='$pid'";
      $result = $pdo->query($sql);
      $count = $result->rowcount();
      $row = $result->fetch();
      if ($count==0) {
        try {
          $sql = "SELECT osum, odate,osid FROM sostatok WHERE oact=1 AND odate<'$_SESSION[sdatecur]' AND pointid='$_SESSION[spoint]' ORDER BY odate DESC LIMIT 1";
          $result = $pdo->query($sql);
          $count1 = $result->rowcount();
          $row = $result->fetch();
          if ($count1==0) {
            $vsum=0;
          }
          else{
            $vsum=$row['osum'];
          }
        }
        catch (PDOException $e){
          $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
          include ("../bd_connect/error/index.php");
          exit();
        }
        try{ // входящий остаток
          $sql="INSERT INTO sostatok SET
          pointid=:pointid,
          uid=:uid,
          odate=:odate,
          otime=curtime(),
          osum=:osum,
          oact=:oact";
          $s = $pdo->prepare($sql);
          $s->bindValue(":pointid", $pid);
          $s->bindValue(":odate", $_SESSION['sdatecur']);
          $s->bindValue(":uid", $_SESSION['suid']);
          $s->bindValue(":osum", $vsum);
          $s->bindValue(":oact", 0);
          $s->execute();
        }
        catch (PDOException $e){
          $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
          include ("../bd_connect/error/index.php");
          exit();
        }
        try{// исходящий остаток
          $vsum = $vsum - $dsum;
          $sql="INSERT INTO sostatok SET
            pointid=:pointid,
            uid=:uid,odate=:odate,
            otime=curtime(),
            osum=:osum,
            oact=:oact";
          $s = $pdo->prepare($sql);
          $s->bindValue(":pointid", $pid);
          $s->bindValue(":odate", $_SESSION['sdatecur']);
          $s->bindValue(":uid", $_SESSION['suid']);
          $s->bindValue(":osum", $vsum);
          $s->bindValue(":oact", 1);
          $s->execute();
        }
        catch (PDOException $e){
          $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
          include ("../bd_connect/error/index.php");
          exit();
        }
      }
      else {
        $vsum=$row['osum']-$dsum;
        $osid = $row['osid'];
        try {
          $sql="UPDATE sostatok SET 
                osum = '$vsum'
                where osid = '$osid'";
          $s = $pdo->prepare($sql);
          $s->execute();
        }
        catch (PDOException $e){
          $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
          include ('../../../bd_connect/error/index.php');
          exit();
        }
      }
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../bd_connect/error/index.php");
      exit();
    }
    // проверка и формирования остатков
  }
  echo 'Готово';

?>