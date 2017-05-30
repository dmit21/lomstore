<?php
session_start();
$db =  $_POST['pdb'];
$de =  $_POST['pde'];
$numstore = $_POST['pstore'];
include("../../../bd_connect/index.php");
try {
  if ($numstore == 0) {
    $sql = "SELECT ls.sname, ln.nnum, ln.ndate, sum(lz.gweight) AS gw, sum(gsumhand) AS gsumh, sum(gsumsaleadm) AS gsums
	  	    FROM  lnac ln, lzaloggood lz, lstores ls, lnactogood lg
            WHERE ln.ndate between '$db' and '$de' and ln.pointid = ls.sid and ln.nid = lg.nid and lg.goodid = lz.goodid
            group by sname, nnum
            order by sname, nnum";
  }
  else {
    $sql = "SELECT ls.sname, ln.nnum, ln.ndate, sum(lz.gweight) AS gw, sum(gsumhand) AS gsumh, sum(gsumsaleadm) AS gsums
		  FROM  lnac ln, lzaloggood lz, lstores ls, lnactogood lg
          WHERE ln.ndate between '$db' and '$de' and ln.pointid = ls.sid and ln.nid = lg.nid and lg.goodid = lz.goodid AND ls.sid = '$numstore'
          group by sname, nnum
          order by sname, nnum";
  }	
  $result = $pdo->query($sql);
  while ($row=$result->fetch()){
    if (isset($summove)) {
      array_push($summove,array($row['sname'],$row['nnum'],$row['ndate'],$row['gw'],$row['gsumh'],$row['gsums']));
    }
    else {
      $summove = array(array($row['sname'],$row['nnum'],$row['ndate'],$row['gw'],$row['gsumh'],$row['gsums']));
    }
  }
}
catch (PDOException $e) {
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ("../../../bd_connect/error/index.php");
  exit();
}
$r=json_encode($summove);
echo $r;
?>