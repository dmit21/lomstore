<?php
include("../../../bd_connect/index.php");
try {
    $sql = "SELECT *
            FROM lpoint
            WHERE pact = 1
            order by pnum";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($parr)){
        array_push($parr,array($row['pid'],$row['pnum'],$row['paddress'],$row['pphone']));
      }
      else{
        $parr= array(array($row['pid'],$row['pnum'],$row['paddress'],$row['pphone']));
      }
    }
	$rez=json_encode($parr);
    echo $rez;
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  ?>