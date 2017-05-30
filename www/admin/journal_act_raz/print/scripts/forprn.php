<?php
session_start();
include("../../../../bd_connect/index.php");
$nid = $_SESSION['sprnar'];
$pid = $_SESSION['snnum'];
$rez[0] = $_SESSION['sruc'];
try{
  $sql = "SELECT anum, adate, uname, usurname, usecname
          FROM lnac ln, luser lu, lactisp la
          WHERE ln.nid = '$nid' AND ln.uid = lu.uid and ln.actid = la.aid";
  $result = $pdo->query($sql);
  $row=$result->fetch();
  $rez[1] = $row['anum'];
  $rez[2] = $row['adate'];
  $rez[3] = $row['usurname']." ".$row['uname']." ".$row['usecname'];
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}

try{
  $sql = "SELECT sname
          FROM lstores
          WHERE sid = '$pid'";
  $result = $pdo->query($sql);
  $row=$result->fetch();
  $rez[4] = $row['sname'];
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}

try{
	$sql = "SELECT  ls.goodnum, ls.goodtic, gdisc, lc.catname, gweight, mto, gsumhand, lu.usurname, lu.uname, lu.usecname, ln.gsum
	      FROM lzaloggood ls, luser lu, lcat lc, lmovegoods lm, lnactogood ln
	      WHERE lm.aid = '$nid' and lm.gid = ls.goodid and ls.uid = lu.uid and ls.catid = lc.catid and ln.nid = lm.aid and ln.goodid = lm.gid AND ls.idshop = '$pid'
	      ORDER BY ls.goodtic,ls.goodnum";
	$result = $pdo->query($sql);
	while ($row=$result->fetch()) {
		if (isset($sgoodarr)){
		  array_push($sgoodarr,array($row['goodtic'], $row['goodnum'],$row['gdisc'],$row['catname'],$row['gweight'], $row['gsum'], $row['gsumhand'], 
		                             $row['usurname']." ".$row['uname']." ".$row['usecname']));
		}
		else{
		  $sgoodarr= array(array($row['goodtic'], $row['goodnum'],$row['gdisc'],$row['catname'],$row['gweight'], $row['gsum'], $row['gsumhand'], 
		                             $row['usurname']." ".$row['uname']." ".$row['usecname']));
		}
    }
    $rez[5] = $sgoodarr;
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}

echo json_encode($rez); 
?>