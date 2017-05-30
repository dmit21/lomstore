<?php
  session_start();
  include("../../../bd_connect/index.php");
  $aid = $_POST['paid'];
  try {
    $sql="UPDATE lsaleact SET
      aact = 3
      WHERE aid = :aid";
    $s = $pdo->prepare($sql);
    $s->bindValue(":aid", $aid);
    $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  echo "Проведено.";
  include ('../../../user/scripts/report.php');
?>