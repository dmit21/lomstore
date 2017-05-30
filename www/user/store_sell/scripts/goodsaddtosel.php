<?php
  session_start();
  include("../../../bd_connect/index.php");
  $tarr = $_POST['parr'];
  try {
    $sql="UPDATE lzaloggood SET
        gact = 4,
        gsumsale = 0,
        gdatesale = '2016-01-01'
        WHERE idshop = :idshop and gdatesale = :gdatesale";
        $s = $pdo->prepare($sql);
        $s->bindValue(":idshop", $_SESSION['spoint']);
        $s->bindValue(":gdatesale", $_SESSION['sdatecur']);
        $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  $n = count($tarr);
  for($i=0;$i<$n;$i++){
    try {
      $sql="UPDATE lzaloggood SET
        gact = 7,
        gsumsale = :gsumsale,
        gdatesale = :gdatesale,
        usaleid = :usaleid
        WHERE goodid = :goodid";
        $s = $pdo->prepare($sql);
        $s->bindValue(":goodid", $tarr[$i][0]);
        $s->bindValue(":gsumsale", $tarr[$i][1]);
        $s->bindValue(":gdatesale", $_SESSION['sdatecur']);
        $s->bindValue(":usaleid", $_SESSION['suid']);
        $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
  }
//  include("../../scripts/report.php");
  echo "Сохранено.";
?>