<?php
session_start();
$actid = $_SESSION['sractid'];
$vitid = $_SESSION['srvitid'];
include("../../../../bd_connect/index.php");
try {
  $sql = "SELECT anum,adate
          FROM lactisp
          where aid = '$actid'";
  $result = $pdo->query($sql);
  $row=$result->fetch();
  $rez[0] = $row['anum'];
  $rez[1] = $row['adate'];
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../../bd_connect/error/index.php');
  exit();
}
try {
  $sql = "SELECT sname
          FROM lstores
          where sid = '$vitid'";
  $result = $pdo->query($sql);
  $row=$result->fetch();
  $rez[2] = $row['sname'];
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../../bd_connect/error/index.php');
  exit();
}
try {
  $sql = "SELECT goodtic,goodnum,gdisc,lc.catname,gweight,idprice,mdiscount,gsumhand,lu.usurname,lu.uname,lu.usecname
          FROM lzaloggood lz, lcat lc,luser lu
          where lz.catid = lc.catid and lz.actid = '$actid' and lu.uid = lz.uid AND lz.idshop = '$vitid'
          order by goodtic,goodnum";
  $result = $pdo->query($sql);
  while($row=$result->fetch()){
    if (isset($garr)){
      array_push($garr,array($row['goodtic'],$row['goodnum'],$row['gdisc'],$row['catname'],$row['gweight'],$row['idprice'],
      											 $row['mdiscount'],$row['gsumhand'],$row['usurname']." ".$row['uname']." ".$row['usecname']));
    }
    else{
      $garr= array(array($row['goodtic'],$row['goodnum'],$row['gdisc'],$row['catname'],$row['gweight'],$row['idprice'],
      											 $row['mdiscount'],$row['gsumhand'],$row['usurname']." ".$row['uname']." ".$row['usecname']));
    }
  }
  $rez[3] = $garr;
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../../bd_connect/error/index.php');
  exit();
}
try {
  $sql = "SELECT ruc
          FROM lruc";
  $result = $pdo->query($sql);
  $row=$result->fetch();
  $rez[4] = $row['ruc'];
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../../bd_connect/error/index.php');
  exit();
}

$cat=json_encode($rez);
echo $cat;

?>