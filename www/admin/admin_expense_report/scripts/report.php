<?php
session_start();
if (isset($_POST['pmydate'])) { $mydate = $_POST['pmydate']; }
$mydate= stripslashes($mydate);
$mydate= htmlspecialchars($mydate);
$_SESSION['srdate'] = $mydate;
$vid = $_POST['pvid'];
include("../../../bd_connect/index.php");
switch ($vid) {
  case '100000':
    $_SESSION['spointname'] = '';
    $_SESSION['spointphone'] = '';
    $_SESSION['spointnum'] = 'По предприятию';
    try {
      $sql = "select sum(osum) AS summ FROM ( select tt.* 
              from (SELECT pointid, osum, odate 
              FROM sostatok lo, lstores ls 
              WHERE oact=1 AND odate<'$_SESSION[srdate]' and ls.sid = lo.pointid
              ORDER BY pointid asc, odate desc) as tt group by pointid) AS tr";
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
      try{
        $sql = "SELECT SUM(osum) AS summ FROM sorder WHERE odate='$_SESSION[srdate]' AND oorder=1";
        $result = $pdo->query($sql);
        $row=$result->fetch();
        $_SESSION['ssumprih']=$row['summ'];
      }
      catch (PDOException $e) {
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ("../../../bd_connect/error/index.php");
        exit();
      } 

      try{
        $sql = "SELECT SUM(osum) AS summ FROM sorder WHERE odate='$_SESSION[srdate]' AND oorder=0";
        $result = $pdo->query($sql);
        $row=$result->fetch();
        $_SESSION['ssumras']=$row['summ'];
      }
      catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ("../../../bd_connect/error/index.php");
        exit();
      } 
      // продажи
      try{
        $sql = "SELECT SUM(gsumsale) AS summ 
                FROM lsaleact la, lsaleacttogood ls, lzaloggood lz
                WHERE la.adate = '$_SESSION[srdate]' and la.aid = ls.aid and ls.goodid = lz.goodid";
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
                WHERE la.pointid = 3 and la.ndate = '$_SESSION[srdate]' and la.nact = 1 AND la.nid = ls.nid and ls.goodid = lz.goodid";
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
      try {
        $sql = "SELECT sum(ncor) AS summ
                FROM lnac ln, lnactogood lna, lsaleact ls
                WHERE ls.adateadm = '$mydate' and ln.actid = ls.aid AND ln.nid=lna.nid AND ln.nact = 1";
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
      // возврат
      // возврат
      try {
        $sql = "SELECT sum(gsum) AS summ
                FROM lnac ln, lnactogood lna
                WHERE ln.ndate = '$mydate' AND ln.nid=lna.nid and ln.nact = 3";
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
      // исходящий остаток за выбранную дату
      try {
        $sql = "select sum(osum) AS summ FROM ( select tt.* 
                from (SELECT pointid, osum, odate 
                FROM sostatok lo, lstores ls 
                WHERE oact=1 AND odate<='$_SESSION[srdate]' and ls.sid = lo.pointid
                ORDER BY pointid asc, odate desc) as tt group by pointid) AS tr";
        $result = $pdo->query($sql);
        $row=$result->fetch();
        $_SESSION['sosumend']=$row['summ'];
      }
      catch (PDOException $e) {
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ("../../../bd_connect/error/index.php");
        exit();
      }
      $_SESSION['sosumendras']=$_SESSION['sosumday']-$_SESSION['ssumras']+$_SESSION['ssumprih']+$_SESSION['ssumsale'] + $_SESSION['ssumcor']-$_SESSION['ssumvvoz'];
    } 
    break;
  default:
    try{
      $sql = "SELECT * FROM lstores WHERE sid = '$vid'";
      $result = $pdo->query($sql);
      $row=$result->fetch();
      $_SESSION['spointname'] = $row['sadress'];
      $_SESSION['spointphone'] = $row['sphone'];
      $_SESSION['spointnum'] = $row['sname'];
    }
    catch (PDOException $e) {
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    } 
    try {
      $sql = "SELECT osum AS summ
              FROM sostatok
              WHERE pointid='$vid' AND  odate='$mydate'
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
      try{
        $sql = "SELECT SUM(osum) AS summ FROM sorder WHERE odate='$mydate' AND oorder=1 and opoint = '$vid'";
        $result = $pdo->query($sql);
        $row=$result->fetch();
        $_SESSION['ssumprih']=$row['summ'];
      }
      catch (PDOException $e) {
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ("../../../bd_connect/error/index.php");
        exit();
      } 

      try{
        $sql = "SELECT SUM(osum) AS summ FROM sorder WHERE odate='$mydate' AND oorder=0 and opoint = '$vid'";
        $result = $pdo->query($sql);
        $row=$result->fetch();
        $_SESSION['ssumras']=$row['summ'];
      }
      catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ("../../../bd_connect/error/index.php");
        exit();
      } 
      // продажи
      try{
        $sql = "SELECT SUM(gsumsale) AS summ 
                FROM lsaleact la, lsaleacttogood ls, lzaloggood lz
                WHERE la.pointid = '$vid' and la.adate = '$mydate' and la.aid = ls.aid and ls.goodid = lz.goodid";
        $result = $pdo->query($sql);
        $row=$result->fetch();
        $sumsale=$row['summ'];
      }
      catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ("../../../bd_connect/error/index.php");
        exit();
      }
      $_SESSION['ssumsale'] = $sumsale;
      try{
        $sql = "SELECT SUM(gsumsaleadm) AS summ 
                FROM lnac la, lnactogood ls, lzaloggood lz
                WHERE la.pointid = '$vid' and la.ndate = '$mydate' and la.nact = 1 AND la.nid = ls.nid and ls.goodid = lz.goodid";
        $result = $pdo->query($sql);
        $row=$result->fetch();
        $_SESSION['ssumsale']=$row['summ'];
      }
      catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ("../../../bd_connect/error/index.php");
        exit();
      }
      // продажи
      // корректировки
      /*
      try {
        $sql = "SELECT sum(gsumsaleadm - gsumsale) AS summ
                FROM lzaloggood lz, lnac ln, lnactogood lna, lsaleact ls
                WHERE ls.adateadm = '$mydate' and ln.actid = ls.aid AND ln.nid=lna.nid AND lna.goodid = lz.goodid AND ln.nact = 1 AND ln.pointid = '$vid'";
        $result = $pdo->query($sql);
        $row=$result->fetch();
        $_SESSION['ssumcor']=$row['summ'];
      }
      catch (PDOException $e) {
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ("../../../bd_connect/error/index.php");
        exit();
      }
      */
      try {
        $sql = "SELECT sum(ncor) AS summ
                FROM lnac ln, lnactogood lna, lsaleact ls
                WHERE ls.adateadm = '$mydate' and ln.actid = ls.aid AND ln.nid=lna.nid AND ln.nact = 1 AND ln.pointid = '$vid'";
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
      // возврат
      try {
        $sql = "SELECT sum(gsum) AS summ
                FROM lnac ln, lnactogood lna
                WHERE ln.ndate = '$mydate' AND ln.nid=lna.nid and ln.nact = 3 AND ln.pointid = '$vid'";
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
      $_SESSION['sosumendras'] = $_SESSION['sosumday']-$_SESSION['ssumras']+$_SESSION['ssumprih']+$_SESSION['ssumsale'] + $_SESSION['ssumcor']-$_SESSION['ssumvvoz'];
    } 
    else {
      try {
        $sql = "SELECT osum, odate FROM sostatok WHERE oact=1 AND odate<'$_SESSION[srdate]' AND pointid='$vid' ORDER BY odate DESC LIMIT 1";
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
    break;
}
?>