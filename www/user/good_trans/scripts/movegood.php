<?php
  session_start();
  $tarr = $_POST['ptarr'];
  include("../../../bd_connect/index.php");
// создание акта перемещения
    try { 
      $sql = "SELECT max(anum) as ma
              FROM lactmove
              WHERE pointid = '$_SESSION[spoint]'";
      $result = $pdo->query($sql);
      $row=$result->fetch();
      if ($row['ma']==0){
        $ma = 1;
      }
      else{
        $ma = $row['ma']+1;
      }
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
    try { 
      $sql = "INSERT INTO lactmove SET 
              adate = :adate,
              uid = :uid,
              pointid = :pointid,
              anum = :anum";
      $s = $pdo->prepare($sql);
      $s->bindValue(":adate", $_SESSION['sdatecur']);
      $s->bindValue(":uid", $_SESSION['suid']);
      $s->bindValue(":pointid", $_SESSION['spoint']);
      $s->bindValue(":anum", $ma);
      $s->execute();
      $aid = $pdo->lastInsertId(); // идентификатор акта
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
// создание акта перемещения


  $n = count($tarr);
  for($i=0;$i<$n;$i++){
    try { // изменение состояния товара в lzaloggood
      $sql="UPDATE lzaloggood SET
      gact = 6
      WHERE goodid = :goodid";
      $s = $pdo->prepare($sql);
      $s->bindValue(":goodid", $tarr[$i]);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include '../../../bd_connect/error/index.php';
      exit();
    }
    try {  // добавление товара в lmovelist
      $sql="INSERT INTO lmovelist SET
      aid = :aid,
      goodid = :goodid,
      mact = 1,
      mstore = :mstore";
      $s = $pdo->prepare($sql);
      $s->bindValue(":goodid", $tarr[$i]);
      $s->bindValue(":aid", $aid);
      $s->bindValue(":mstore", $_SESSION['spoint']);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include '../../../bd_connect/error/index.php';
      exit();
    }
  }
?>