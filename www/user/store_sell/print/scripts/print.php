<?php
  session_start();
  include("../../../../bd_connect/index.php");
  try {
    $sql = "SELECT goodnum, gdisc, gweight, cname, idprice, mdiscount, gsumsale
            FROM lzaloggood lz, lcatshop lc, lsaleacttogood ls
            WHERE ls.aid = '$_SESSION[ssaleact]' and ls.goodid = lz.goodid and lz.idcatshop = lc.cid";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($goodarr)){
        array_push($goodarr,array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['idprice'],$row['mdiscount'],$row['gsumsale']));
      }
      else{
        $goodarr= array(array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['idprice'],$row['mdiscount'],$row['gsumsale']));
      }
    }
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../../bd_connect/error/index.php');
    exit();
  }
$rez[0] = $_SESSION['spointname'];
$rez[1] = $goodarr;
$rez[2] = $_SESSION['sdatecur'];
$r = json_encode($rez);
echo $r;
?>