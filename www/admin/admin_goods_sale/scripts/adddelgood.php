<?php
  session_start();
  $pad = $_POST['pad'];
  $goodid = $_POST['png'];
  $aid = $_POST['paid'];

  include("../../../bd_connect/index.php");
  switch ($pad) {
    case '0'://delete record
      try {
        $sql = "DELETE FROM lsaleacttogood 
                WHERE  aid = '$aid' and goodid = '$goodid'";
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
          gact = 4
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
              $s->bindValue(":aid", $aid);
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
          gact = 7
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
  }
  include ('../../../user/scripts/report.php');
?>