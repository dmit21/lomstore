<?php
session_start();
$ng = $_POST['png'];
$gs = $_POST['pgsale'];
$nid = $_POST['pnid'];
include("../../../bd_connect/index.php");
// ДЛЯ формирования накладной возврата
  //определение пункта, на который возвращаем товар и деньги
  try {
    $sql = "SELECT pointid
            FROM lnac
            where nid = '$nid'";
    $result = $pdo->query($sql);
    $row=$result->fetch();
    $pointidvoz = $row['pointid'];
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  //определение пункта, на который возвращаем товар и деньги
  // номер накладной возврата
  try {
    $sql = "SELECT max(nnum) AS num 
            FROM lnac
            where nact = 3";
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
  // номер накладной возврата
  // вставка информации в накладную возврата
  try {
    $sql="INSERT INTO lnac SET
        ndate = :mdate,
        ntime = curtime(),
        uid = :uid,
        nnum = :nnum,
        actid = 0,
        pointid = :pointid,
        nact = 3";
        $s = $pdo->prepare($sql);
        $s->bindValue(":uid", $_SESSION["suid"]);
        $s->bindValue(":mdate", $_SESSION["sdatecur"]);
        $s->bindValue(":nnum", $nnum);
        $s->bindValue(":pointid", $pointidvoz);
        $s->execute();
        $nidvoz=$pdo->lastInsertId();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  // вставка информации в накладную возврата
  // заполнение таблицы накладная товара    
  try {
    $sql="INSERT INTO lnactogood SET
        nid = :nid,
        goodid = :goodid,
        gsum = :gsum";
    $s = $pdo->prepare($sql);
    $s->bindValue(":nid", $nidvoz);
    $s->bindValue(":goodid", $ng);
    $s->bindValue(":gsum", $gs);
    $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  // заполнение таблицы накладная товара    
// ДЛЯ формирования накладной возврата
// на всякий случай когда, кто, вернул товар
try {
  $sql="INSERT INTO ldelstoregoodnac SET
        nid = :nid,
        goodid = :goodid,
        ddate = :ddate,
        dtime = curtime(),
        uid = :uid,
        gsalesum = :gsalesum";
        $s = $pdo->prepare($sql);
        $s->bindValue(":uid", $_SESSION["suid"]);
        $s->bindValue(":ddate", $_SESSION["sdatecur"]);
        $s->bindValue(":nid", $nid);
        $s->bindValue(":goodid", $ng);
        $s->bindValue(":gsalesum", $gs);
        $s->execute();
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}
// на всякий случай когда, кто, вернул товар

// возврат товара в активное состояние в lzaloggood
try {
    $sql="UPDATE lzaloggood SET
      gact = 4,
      gsumsale = 0,
      gdatesale = '2000-01-01',
      gsumsaleadm = 0
      WHERE goodid = :goodid";
    $s = $pdo->prepare($sql);
    $s->bindValue(":goodid", $ng);
    $s->execute();
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}
// возврат товара в активное состояние в lzaloggood

//запись в lmovegood о возврате товара
try {
  $sql="INSERT INTO lmovegoods SET
    gid = :gid,
    uid = :uid,
    mdate = :mdate,
    mtime = curtime(),
    mfrom = 0,
    mto = :mto,
    aid = :aid,
    moveid = 3";
  $s = $pdo->prepare($sql);
  $s->bindValue(":gid", $ng);
  $s->bindValue(":uid", $_SESSION["suid"]);
  $s->bindValue(":mdate", $_SESSION["sdatecur"]);
  $s->bindValue(":mto", $pointidvoz);
  $s->bindValue(":aid", $nidvoz);
  $s->execute();
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}
//запись в lmovegood о возврате товара

// возврат товара в табл. lnactogood
try {
    $sql="UPDATE lnactogood SET
      nact = 1
      WHERE goodid = :goodid and nid = :nid";
    $s = $pdo->prepare($sql);
    $s->bindValue(":goodid", $ng);
    $s->bindValue(":nid", $nid);
    $s->execute();
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}
// возврат товара в табл. lnactogood

// изменения в остатках соответствующего пункта
try {
  $sql = "SELECT osum FROM sostatok WHERE oact=0 AND odate='$_SESSION[sdatecur]' AND pointid='$pointidvoz'";
  $result = $pdo->query($sql);
  $count = $result->rowcount();
  $row = $result->fetch();
  if ($count==0) {
    try {
      $sql = "SELECT osum, odate FROM sostatok WHERE oact=1 AND odate<'$_SESSION[sdatecur]' AND pointid='$pointidvoz' ORDER BY odate DESC LIMIT 1";
      $result = $pdo->query($sql);
      $count1 = $result->rowcount();
      $row = $result->fetch();
      if ($count1==0) {
        $osum=0;
      }
      else{
        $osum=$row['osum'];
      }
      try{
        $sql="INSERT INTO sostatok SET
              pointid=:pointid,
              uid=:uid,odate=:odate,
              otime=curtime(),
              osum=:osum,
              oact=:oact";
        $s = $pdo->prepare($sql);
        $s->bindValue(":pointid", $pointidvoz);
        $s->bindValue(":odate", $_SESSION['sdatecur']);
        $s->bindValue(":uid", $_SESSION['suid']);
        $s->bindValue(":osum", $osum);
        $s->bindValue(":oact", 0);
        $s->execute();
      }
      catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ('../../../bd_connect/error/index.php');
        exit();
      }
      $osum = $osum-$gs;
      try{
        $sql="INSERT INTO sostatok SET
          pointid=:pointid,
          uid=:uid,odate=:odate,
          otime=curtime(),
          osum=:osum,
          oact=:oact";
        $s = $pdo->prepare($sql);
        $s->bindValue(":pointid", $pointidvoz);
        $s->bindValue(":odate", $_SESSION['sdatecur']);
        $s->bindValue(":uid", $_SESSION['suid']);
        $s->bindValue(":osum", $osum);
        $s->bindValue(":oact", 1);
        $s->execute();
      }
      catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ('../../../bd_connect/error/index.php');
        exit();
      }
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
  }
  else {
    $osum=$row['osum']-$gs;
    // изменение остатка
    try {
        $sql="UPDATE sostatok SET
          osum = :osum
          WHERE pointid = :pointid and odate = :odate and oact = :oact";
        $s = $pdo->prepare($sql);
        $s->bindValue(":osum", $osum);
        $s->bindValue(":pointid", $pointidvoz);
        $s->bindValue(":odate", $_SESSION['sdatecur']);
        $s->bindValue(":oact", 1);
        $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
    // изменение остатка
  }
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}
// проверка и формирования остатков
// изменения в остатках соответствующего пункта
?>