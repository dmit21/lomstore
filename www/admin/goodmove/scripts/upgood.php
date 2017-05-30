<?php
  session_start();
  $goodid = $_POST['pgoodid'];
  $mact = $_POST['pmact'];
  $actid = $_POST['pactid'];
  include("../../../bd_connect/index.php");

  try{ // проставляем в lMoveList в какой магазин пойдет товар
    $sql="UPDATE lmovelist SET 
          mact=:mact
          WHERE
          aid = :aid and goodid = :goodid";
          $s = $pdo->prepare($sql);
          $s->bindValue(":mact", $mact);
          $s->bindValue(":goodid", $goodid);
          $s->bindValue(":aid", $actid);
          $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  $cat1=json_encode($rez);
  echo $cat1;
?>