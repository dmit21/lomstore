<?php
  $pid = $_POST['ppoint'];
  $mdb = $_POST['pdb'];
  $mde = $_POST['pde'];
  include("../../../bd_connect/index.php");
  try {
    if ($pid=='0'){
      $sql = "SELECT aid, anum, pnum, adate, auid, uname, usecname, usurname, aact, rdate
              FROM lactisp la, lpoint lp, luser lu
              WHERE la.apointid = lp.pid and la.auid = lu.uid and la.adate BETWEEN '$mdb' AND '$mde' AND lp.pact = 1
              ORDER BY pnum, anum";
    }
    else{
      $sql = "SELECT aid, anum, pnum, adate, auid, uname, usecname, usurname, aact, rdate
              FROM lactisp la, lpoint lp, luser lu
              WHERE la.apointid = lp.pid and la.auid = lu.uid and la.adate BETWEEN '$mdb' AND '$mde' and la.apointid = '$pid'
              ORDER BY pnum, anum";
    }
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($aarr)){
        array_push($aarr,array($row['aid'],$row['anum'],$row['pnum'],$row['adate'],$row['auid'],$row['uname'],$row['usecname'],$row['usurname'],$row['aact'],
          $row['rdate']));
      }
      else{
        $aarr= array(array($row['aid'],$row['anum'],$row['pnum'],$row['adate'],$row['auid'],$row['uname'],$row['usecname'],$row['usurname'],$row['aact'],
          $row['rdate']));
      }
    }
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  $rez=json_encode($aarr);
  echo $rez;
?>