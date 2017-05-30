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
    $sql = "SELECT nid, nnum, ndate, lp.pnum as pn,la.anum as an, la.adate
            FROM lnac ln, lactisp la, lpoint lp
            WHERE  ndate BETWEEN '$dateb' AND '$datee'  and ln.actid = la.aid and lp.pid = la.apointid and ln.nact = 0
            ORDER BY ndate, nnum";
    $result = $pdo->query($sql);
	  while ($row=$result->fetch()) {
      if (isset($actarr)){
        $a=strlen($row['pn']);//длина номера пункта
        $b=strlen($row['an']);//длина номера билета
        $c=8-$a-$b;//рассчитываем количество недостающих символов
        $num=$row['pn'].str_repeat("0", $c).$row['an'];//определили еомер залогового билета
        array_push($actarr,array($row['nid'],$row['nnum'],$row['ndate'],$num, $row['pn'],$row['an'], $row['adate']));
      }
      else{
        $a=strlen($row['pn']);//длина номера пункта
        $b=strlen($row['an']);//длина номера билета
        $c=8-$a-$b;//рассчитываем количество недостающих символов
        $num=$row['pn'].str_repeat("0", $c).$row['an'];//определили еомер залогового билета
        $actarr= array(array($row['nid'],$row['nnum'],$row['ndate'],$num, $row['pn'],$row['an'], $row['adate']));
      }
    }
    $cat=json_encode($actarr);
    echo $cat;
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
    echo $e;
  }
?>

