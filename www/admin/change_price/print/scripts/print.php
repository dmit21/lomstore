<?php
	session_start();
	$nid = $_SESSION['scpnid'];
  include("../../../../bd_connect/index.php");
  try {
    $sql = "SELECT lz.goodnum, lz.gdisc, lc.catname, lz.gweight, sn.oldprice, sn.newprice, sn.olddiscont, sn.newdiscont,
    							 ls.sname
            FROM lzaloggood lz, lstores ls, lcat lc, snacpricetogood sn
            WHERE sn.nid = '$nid' and sn.gid = lz.goodid and lz.catid = lc.catid and lz.idshop = ls.sid";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($rez[0])){
        array_push($rez[0],array($row['goodnum'],$row['gdisc'],$row['catname'],$row['gweight'],$row['oldprice'],
                                 $row['newprice'],$row['olddiscont'],$row['newdiscont'],$row['sname']));
      }
      else{
        $rez[0]= array(array($row['goodnum'],$row['gdisc'],$row['catname'],$row['gweight'],$row['oldprice'],
                                 $row['newprice'],$row['olddiscont'],$row['newdiscont'],$row['sname']));
      }
    }
  }
    catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../../bd_connect/error/index.php');
    exit();
  }
  $rez[1] = $_SESSION['suname'];
  $rez[2] = $nid;
  $rez[3] = $_SESSION['scpdate'];
$ar = json_encode($rez);
echo $ar;
?>