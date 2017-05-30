<?php
  $mdb = $_POST['pmb'];
  $mde = $_POST['pme'];
  include("../../../bd_connect/index.php");
  try {
    $sql = "SELECT *
          FROM snacprice
          WHERE snact = 1 and (nact = 1 or nact = 3) and ndate BETWEEN '$mdb' AND '$mde'
          ORDER BY nid";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($act)){
        array_push($act,array($row['nid'],$row['ndate'],$row['nact']));
      }
      else{
        $act= array(array($row['nid'],$row['ndate'],$row['nact']));
      }
    }
    $rez[0] = $act;
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  $r=json_encode($rez);
  echo $r;
?>