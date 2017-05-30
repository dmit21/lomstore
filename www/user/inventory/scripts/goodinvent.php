<?php
  session_start();
  $gid = $_POST['pgid'];
  include("../../../bd_connect/index.php");
  try { 
    $sql = "INSERT INTO sinvent SET 
            goodid = :goodid,
            sid = :sid";
    $s = $pdo->prepare($sql);
    $s->bindValue(":goodid", $gid);
    $s->bindValue(":sid", $_SESSION['spoint']);
    $s->execute();
    $aid = $pdo->lastInsertId(); // идентификатор акта
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
?>