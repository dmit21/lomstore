<?php
session_start();
if (isset($_POST['pmydate'])) { $mydate = $_POST['pmydate']; }
$mydate= stripslashes($mydate);
$mydate= htmlspecialchars($mydate);
$_SESSION['srdate'] = $mydate;
include("../../../bd_connect/index.php");
try {
  $sql = "SELECT osum AS summ
          FROM sostatok
          WHERE pointid=3 AND  odate='$mydate'
          ORDER BY oact";
   $result = $pdo->query($sql);
}
catch (PDOException $e) {
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ("../../../bd_connect/error/index.php");
  exit();
}
$cs=$result->rowcount();
  if ($cs!=0) { 
    $row=$result->fetch();
    $_SESSION['sosumday'] = $row['summ'];
    $row=$result->fetch();
    $_SESSION['sosumend'] = $row['summ'];    
  
    // приход
    try{
      $sql = "SELECT SUM(osum) AS summ FROM sorder WHERE opoint=3 AND  odate='$mydate' AND oorder=1";
      $result = $pdo->query($sql);
      $row=$result->fetch();
      $_SESSION['ssumprih']=$row['summ'];
    }
    catch (PDOException $e) {
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    } 
    // приход

    // расход
    try{
      $sql = "SELECT SUM(osum) AS summ FROM sorder WHERE opoint=3 AND odate='$mydate' AND oorder=0";
      $result = $pdo->query($sql);
      $row=$result->fetch();
      $_SESSION['ssumras']=$row['summ'];
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    } 
    // расход

    // продажи
    try{
      $sql = "SELECT SUM(gsumsale) AS summ 
              FROM lsaleact la, lsaleacttogood ls, lzaloggood lz
              WHERE la.pointid = 3 and la.adate = '$mydate' and la.aid = ls.aid and ls.goodid = lz.goodid";
      $result = $pdo->query($sql);
      $row=$result->fetch();
      $sumsale=$row['summ'];
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
    try{
      $sql = "SELECT SUM(gsumsaleadm) AS summ 
              FROM lnac la, lnactogood ls, lzaloggood lz
              WHERE la.pointid = 3 and la.ndate = '$mydate' and la.nact = 1 AND la.nid = ls.nid and ls.goodid = lz.goodid";
      $result = $pdo->query($sql);
      $row=$result->fetch();
      $saleopt=$row['summ'];
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
    $_SESSION['ssumsale'] = $saleopt + $sumsale;
    // продажи

    // корректировки
    /*try {
      $sql = "SELECT sum(ncor) AS summ
              FROM lnac ln, lnactogood lna, lsaleact ls
              WHERE ls.adateadm = '$mydate' and ln.actid = ls.aid AND ln.nid=lna.nid AND ln.nact = 1 AND ln.pointid = 3";
      $result = $pdo->query($sql);
      $row=$result->fetch();
      $_SESSION['ssumcor']=$row['summ'];
    }
    catch (PDOException $e) {
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
    // корректировки
*/
    // возврат
    try {
      $sql = "SELECT sum(gsum) AS summ
              FROM lnac ln, lnactogood lna
              WHERE ln.ndate = '$mydate' AND ln.nid=lna.nid and ln.nact = 3 AND ln.pointid = 3";
      $result = $pdo->query($sql);
      $row=$result->fetch();
      $_SESSION['ssumvvoz']=$row['summ'];
    }
    catch (PDOException $e) {
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
    // возврат
    $_SESSION['sosumendras'] = $_SESSION['sosumday']-$_SESSION['ssumras']+$_SESSION['ssumprih']+$_SESSION['ssumsale']-$_SESSION['ssumvvoz'];
    //$_SESSION['sosumendras'] = $_SESSION['sosumday']-$_SESSION['ssumras']+$_SESSION['ssumprih']+$_SESSION['ssumsale'] + $_SESSION['ssumcor']-$_SESSION['ssumvvoz'];
  } 
  else {
    try {
      $sql = "SELECT osum, odate FROM sostatok WHERE oact=1 AND odate<'$mydate' AND pointid=3 ORDER BY odate DESC LIMIT 1";
      $result = $pdo->query($sql);
      $count1 = $result->rowcount();
      $row = $result->fetch();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
    $_SESSION['ssumprih']=0;
    $_SESSION['ssumras']=0;
    $_SESSION['sosumday']=$row['osum'];
    $_SESSION['sosumend']=$row['osum'];
    $_SESSION['sosumendras'] = $row['osum'];
    $_SESSION['ssumvvoz'] = 0;
    $_SESSION['ssumcor']=0;
  }

?>