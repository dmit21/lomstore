<?php
  session_start();
  include("../../../bd_connect/index.php");
  $goodid = $_POST['png'];
  $price = $_POST['pprice'];
  $stoim = $_POST['pstoim'];

  try {
    $sql="UPDATE lzaloggood SET
      idprice = :idprice,
      gsumsale = :gsumsale
      WHERE goodid = :goodid";
    $s = $pdo->prepare($sql);
    $s->bindValue(":goodid", $goodid);
    $s->bindValue(":idprice", $price);
    $s->bindValue(":gsumsale", $stoim);
    $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  include ('../../../user/scripts/report.php');
?>