<?php
session_start();
include("../../../bd_connect/index.php");

try{
  $sql = "SELECT SUM(osum) AS summ FROM sorder WHERE opoint='$_SESSION[spoint]' AND  odate='$_SESSION[sdatecur]' AND oorder=1";
  $result = $pdo->query($sql);
  $row=$result->fetch();
  $_SESSION['ssumprih']=$row['summ'];
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ("../../../bd_connect/error/index.php");
  exit();
} 

try{
  $sql = "SELECT SUM(gsumsale) AS summ 
          FROM lsaleact la, lsaleacttogood ls, lzaloggood lz
          WHERE la.pointid = '$_SESSION[spoint]' and la.adate = '$_SESSION[sdatecur]' and la.aid = ls.aid and ls.goodid = lz.goodid";
  $result = $pdo->query($sql);
  $row=$result->fetch();
  $_SESSION['ssumsale']=$row['summ'];
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ("../../../bd_connect/error/index.php");
  exit();
} 

try{
  $sql = "SELECT SUM(osum) AS summ FROM sorder WHERE opoint='$_SESSION[spoint]' AND odate='$_SESSION[sdatecur]' AND oorder=0";
  $result = $pdo->query($sql);
  $row=$result->fetch();
  $_SESSION['ssumras']=$row['summ'];
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ("../../../bd_connect/error/index.php");
  exit();
} 

$_SESSION['sosumend']=$_SESSION['sosum']-$_SESSION['ssumras']+$_SESSION['ssumprih']+$_SESSION['ssumsale'];

try{
  $sql = "SELECT osid FROM sostatok WHERE pointid='$_SESSION[spoint]' AND odate='$_SESSION[sdatecur]' AND oact=1";
  $result = $pdo->query($sql);
  $row=$result->fetch();
  //$i=count($row);
  if ($row['osid']==0) {
    try{
      $sql="INSERT INTO sostatok SET
      pointid=:pointid,
      uid=:uid,
      odate=:odate,
      otime=curtime(),
      osum=:osum,
      oact=:oact";
      $s = $pdo->prepare($sql);
      $s->bindValue(":pointid", $_SESSION['spoint']);
      $s->bindValue(":odate", $_SESSION['sdatecur']);
      $s->bindValue(":uid", $_SESSION['suid']);
      $s->bindValue(":osum", $_SESSION['sosumend']);
      $s->bindValue(":oact", 1);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
  }
  else{
    try {
        $sql="UPDATE sostatok SET
        osum='$_SESSION[sosumend]',
        uid=:uid,
        otime=curtime()
        WHERE 
        osid=:osid";
        $s = $pdo->prepare($sql);
        $s->bindValue(":osid", $row['osid']);
        $s->bindValue(":uid", $_SESSION['suid']);
        $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
  }
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ("../../../bd_connect/error/index.php");
  exit();
} 
?>
