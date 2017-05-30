<?php
  session_start();
  $actid = $_POST['pactid'];
  $price = $_POST['pprice'];
  $discont = $_POST['pdiscont'];
  $store = $_POST['pstore'];
  $goodnum = $_POST['pgoodnum'];
  $goodtic = $_POST['pgoodtic'];
  $gsumhand = $_POST['pgsumhand'];
  $idcatshop = $_POST['pidcatshop'];
  $gid = $_POST['pgid'];

  include("../../../bd_connect/index.php");
    try {
      $sql="UPDATE lzaloggood SET
      actid = :actid,
      idprice = :idprice,
      idshop = :idshop,
      goodnum = :goodnum,
      goodtic = :goodtic,
      gsumhand = :gsumhand,
      gact = 3,
      idcatshop = :idcatshop,
      mdiscount = :mdiscount
      WHERE goodid = :goodid";
      $s = $pdo->prepare($sql);
      $s->bindValue(":goodid", $gid);
      $s->bindValue(":goodnum", $goodnum);
      $s->bindValue(":idprice", $price);
      $s->bindValue(":goodtic", $goodtic);
      $s->bindValue(":idcatshop", $idcatshop);
      $s->bindValue(":idshop", $store);
      $s->bindValue(":actid", $actid);
      $s->bindValue(":gsumhand", $gsumhand);
      $s->bindValue(":mdiscount", $discont);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
?>