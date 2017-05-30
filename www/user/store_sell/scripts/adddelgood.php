<?php
  session_start();
  $pad = $_POST['pad'];
  $goodid = $_POST['pgoodid'];
  $gsale = $_POST['pgsale'];

  include("../../../bd_connect/index.php");
  switch ($pad) {
    case '0'://delete record
      try {
        $sql = "DELETE FROM lsaleacttogood 
                WHERE  aid = '$_SESSION[ssaleact]' and goodid = '$goodid'";
        $s = $pdo->prepare($sql);
        $s->execute();
      }
      catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ('../../../bd_connect/error/index.php');
        exit();
      }
      try {
        $sql="UPDATE lzaloggood SET
            gact = 4,
            gsumsale = 0,
            gdatesale = '2016-01-01'
            WHERE goodid = :goodid";
        $s = $pdo->prepare($sql);
        $s->bindValue(":goodid", $goodid);
        $s->execute();
      }
      catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ('../../../bd_connect/error/index.php');
        exit();
      }
      break;
    case '1':// add record
      try {
        $sql="INSERT INTO lsaleacttogood SET 
              aid=:aid,
              goodid=:goodid";
              $s = $pdo->prepare($sql);
              $s->bindValue(":aid", $_SESSION['ssaleact']);
              $s->bindValue(":goodid", $goodid);
              $s->execute();
      }
      catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ('../../../bd_connect/error/index.php');
        exit();
      }
      try {
        $sql="UPDATE lzaloggood SET
            gact = 7,
            gsumsale = :gsumsale,
            gdatesale = :gdatesale,
            usaleid = :usaleid,
            gsumsaleadm = 0
            WHERE goodid = :goodid";
        $s = $pdo->prepare($sql);
        $s->bindValue(":goodid", $goodid);
        $s->bindValue(":gsumsale", $gsale);
        $s->bindValue(":gdatesale", $_SESSION['sdatecur']);
        $s->bindValue(":usaleid", $_SESSION['suid']);
        $s->execute();
      }
      catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ('../../../bd_connect/error/index.php');
        exit();
      }
      break;
  }
  include("../../scripts/report.php");
?>