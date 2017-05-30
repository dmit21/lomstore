<?php
session_start();
if ($_SESSION['sfr']==0) {
  include("../../../bd_connect/index.php");
  try{
    $sql ="SELECT max(onum) AS lor FROM sorder WHERE oorder = 0 AND opoint='$_SESSION[spoint]'";
    $result = $pdo->query($sql);
    $row=$result->fetch();
    $_SESSION['snumorder'] = $row['lor']+1;
    $rez[0] = $_SESSION['snumorder'];
    $rez[1] = $_SESSION['suname'];
    $rez[2] = $_SESSION['sdatecur'];
    $r = json_encode($rez);
    echo $r; 
  }
  catch (PDOException $e) {
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ("../../../bd_connect/error/index.php");
    exit();
  } 
  $_SESSION['sfr'] = 1;
}
else{
  echo "1";
}
?>
