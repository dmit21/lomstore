<?php
session_start();
$mf = $_SESSION['smf'];
include("../../../../bd_connect/index.php");
switch ($mf) {
  case '0': // передать все
    try {
      $sql = "SELECT lz.goodnum, lz.gdisc, lz.gweight, lz.goodid, lz.idprice  
              FROM lzaloggood lz
              WHERE idshop = '$_SESSION[spoint]' AND gact<>5
              order by goodnum";
      $result = $pdo->query($sql);
      while ($row=$result->fetch()) {
        if (isset($goodarr)){
          array_push($goodarr,array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['idprice'],$row['goodid'],0));
        }
        else{
          $goodarr= array(array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['idprice'],$row['goodid'],0));
        }
      }
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../../bd_connect/error/index.php');
      exit();
    }
    break;
	case '1': // найденные
    try {
      $sql = "SELECT lz.goodnum, lz.gdisc, lz.gweight, lz.goodid, lz.idprice  
              FROM lzaloggood lz, sinvent si
              WHERE si.sid = '$_SESSION[spoint]' AND lz.goodid = si.goodid
              order by goodnum";
      $result = $pdo->query($sql);
      while ($row=$result->fetch()) {
        if (isset($goodarr)){
          array_push($goodarr,array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['idprice'],$row['goodid'],0));
        }
        else{
          $goodarr= array(array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['idprice'],$row['goodid'],0));
        }
      }
    }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../../bd_connect/error/index.php');
    exit();
  }
	break;
	case '2': // не найденные
	  $goodarr = $_SESSION['starr'];
	break;
}
$rez[0] = $_SESSION['sdatecur'];
$rez[1] = $_SESSION['spointnum'];
$rez[2] = $_SESSION['spointname'];
$rez[3] = $_SESSION['spointadress'];
$rez[4] = $_SESSION['spointadress'];
$rez[5] = $_SESSION['smf'];
$rez[6] = $goodarr;
$ar = json_encode($rez);
echo $ar;
?>