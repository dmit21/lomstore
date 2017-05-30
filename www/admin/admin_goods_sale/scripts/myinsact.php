<?php
  session_start();
  include("../../../bd_connect/index.php");
  // номер нового акта
  try {
    $sql = "SELECT max(anum) as manum
            FROM lsaleact
            WHERE pointid = 3";
    $result = $pdo->query($sql);
    $row=$result->fetch();
    if($row['manum']==0){
      $an = 1;
    }
    else{
      $an = $row['manum']+1;
    }
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  // номер нового акта

  // вставка новой записи акта
  try {
    $sql="INSERT INTO lsaleact SET 
      adate=:adate,
      uid=:uid,
      pointid = 3,
      anum = :anum,
      aact = 2";
    $s = $pdo->prepare($sql);
    $s->bindValue(":adate", $_SESSION['sdatecur']);
    $s->bindValue(":uid", $_SESSION['suid']);
    $s->bindValue(":anum", $an);
    $s->execute();
    $aid=$pdo->lastInsertId();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  // вставка новой записи акта
  // передача информации о новом акте в программу
  $rez[0] = $aid;
  $rez[1] = $_SESSION['sdatecur'];
  $rez[2] = $an;

  $cat=json_encode($rez);
  echo $cat;
  // передача информации о новом акте в программу
?>