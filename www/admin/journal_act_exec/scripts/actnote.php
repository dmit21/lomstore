<?php
  session_start();
  unset($_SESSION['starr']);
  $actid = $_POST['pdocid'];
  $_SESSION['sactnum'] = $_POST['pdocact'];
  $_SESSION['sactdate'] = $_POST['pdocdate'];
  $_SESSION['sactid'] = $actid;
  $_SESSION['sactpr'] = $_POST['pdocpr'];
  include("../../../bd_connect/index.php");
  try {
    $sql = "SELECT la.tid, tnum, pnum, tweight, tsumcred, tsumhand
            FROM lacttoticket la, lzalogticket lz, lpoint lp
            WHERE la.aid = '$actid' and la.tid = lz.tid and lz.pointid = lp.pid";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($_SESSION['starr'])){
        array_push($_SESSION['starr'],array($row['tid'],$row['tnum'],$row['pnum'],$row['tweight'],$row['tsumcred'],$row['tsumhand']));
      }
      else{
        $_SESSION['starr']= array(array($row['tid'],$row['tnum'],$row['pnum'],$row['tweight'],$row['tsumcred'],$row['tsumhand']));
      }
    }
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
?>