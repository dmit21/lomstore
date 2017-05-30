<?php
  session_start();
  $goodid = $_POST['pgoodid'];
  $mact = $_POST['pmact'];
  include("../../../bd_connect/index.php");

  try{ // проставляем в lMoveList в какой магазин пойдет товар
    $sql="UPDATE lmovelist SET 
          mact=0
          WHERE
          aid = :aid and goodid = :goodid";
          $s = $pdo->prepare($sql);
          $s->bindValue(":mstore", $vitnum);
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