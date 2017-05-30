<?php
  session_start();
  $garr = $_POST['pgarr'];
  include("../../../bd_connect/index.php");
  $n = count($garr);
  for($i=0;$i<$n;$i++){
    $gid = $garr[$i][0];
    try {
      $sql="UPDATE lzaloggood SET
      idprice = :idprice,
      idshop = :idshop,
      idcatshop = :idcatshop
      WHERE goodid = :goodid";
      $s = $pdo->prepare($sql);
      $s->bindValue(":goodid", $gid);
      $s->bindValue(":idprice", $garr[$i][10]);
      $s->bindValue(":idcatshop", $garr[$i][4]);
      $s->bindValue(":idshop", $garr[$i][6]);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include '../../../bd_connect/error/index.php';
      exit();
    }
    try {
      $sql="UPDATE lmovegoods SET
      mto = :mto
      WHERE gid = :gid";
      $s = $pdo->prepare($sql);
      $s->bindValue(":gid", $gid);
      $s->bindValue(":mto", $garr[$i][6]);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include '../../../bd_connect/error/index.php';
      exit();
    }

  }
  echo "Готово.";
?>