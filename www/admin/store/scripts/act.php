<?php
  session_start();
  unset($_SESSION['sactarr']);
  $dateb = $_POST['pdb'];
  $dateb = stripslashes($dateb);
  $dateb = htmlspecialchars($dateb);
  $_SESSION['sdb'] = $dateb;
  $datee = $_POST['pde'];
  $datee = stripslashes($datee);
  $datee = htmlspecialchars($datee);
  $_SESSION['sde'] = $datee;
  include("../../../bd_connect/index.php");
  try {
    $sql = "SELECT la.aid, anum, adate, pnum, uname,usecname,usurname,la.aact
            FROM lactisp la, lpoint lp, luser lu
            WHERE adate BETWEEN '$dateb' AND '$datee' AND (la.aact=0 OR la.aact=3) AND la.apointid=lp.pid and la.auid = lu.uid
            ORDER BY pnum,anum";
    $result = $pdo->query($sql);
	  while ($row=$result->fetch()) {
      if (isset($_SESSION['sactarr'])){
        $a=strlen($row['pnum']);//длина номера пункта
        $b=strlen($row['anum']);//длина номера билета
        $c=8-$a-$b;//рассчитываем количество недостающих символов
        $num=$row['pnum'].str_repeat("0", $c).$row['anum'];//определили еомер залогового билета
        array_push($_SESSION['sactarr'],array($row['aid'],$num,$row['adate'],$row['usurname']." ".$row['uname']." ".$row['usecname'],$row['aact']));
      }
      else{
        $a=strlen($row['pnum']);//длина номера пункта
        $b=strlen($row['anum']);//длина номера билета
        $c=8-$a-$b;//рассчитываем количество недостающих символов
        $num=$row['pnum'].str_repeat("0", $c).$row['anum'];//определили еомер залогового билета
        $_SESSION['sactarr']= array(array($row['aid'],$num,$row['adate'],$row['usurname']." ".$row['uname']." ".$row['usecname'],$row['aact']));
      }
    }
    $cat=json_encode($_SESSION['sactarr']);
    echo $cat;
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
    echo $e;
  }
//            WHERE adate BETWEEN '$dateb' AND '$datee' AND (la.aact=0 OR la.aact=3) AND la.apointid=lp.pid and la.auid = lu.uid
//            WHERE adate BETWEEN '$dateb' AND '$datee' AND (la.aact=4) AND la.apointid=lp.pid and la.auid = lu.uid

?>

