<?php
session_start();
unset($_SESSION['sgact']);
unset($_SESSION['sggact']);
$aid = $_POST['paid']; 

include("../../../bd_connect/index.php");
// номер пункта и билета
try{
      $sql = "SELECT  pnum, pphone, paddress, anum, adate, usurname, uname, usecname
              FROM  lpoint lp, lactisp la, luser lu
              WHERE aid='$aid' AND  lp.pid=la.apointid AND lu.uid = la.auid";
      $result = $pdo->query($sql);
      $row=$result->fetch();
      $_SESSION['spnum'] = $row['pnum'];//длина номера пункта
      $_SESSION['spphone'] = $row['pphone'];//длина номера пункта
      $_SESSION['spname'] = $row['paddress'];
      $_SESSION['sanum'] = $row['anum'];
      $_SESSION['sadate'] = $row['adate'];
      $_SESSION['sname'] = $row['usurname']." ".$row['uname']." ".$row['usecname'];
}
catch (PDOException $e){
              $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
              include ("../../../bd_connect/error/index.php");
              exit();
}
// массив для формы акта на исполнение
 try{
    $sql = "SELECT  lc.cinf AS mcid, cname, csurname, csecname, lz.tid as mtid, tnum, tsumcred, tsumhand, tdateopen, tdateplanclose, tweight as w 
         FROM  lclientinf lc, lzalogticket lz, lacttoticket lt WHERE lc.cinf=lz.cid  AND lt.aid = '$aid' and lt.tid = lz.tid
         ORDER BY lz.tid";
    $result = $pdo->query($sql);
      while ($row = $result->fetch()){
        if (isset($_SESSION['sgact'])){
          array_push($_SESSION['sgact'],array($row['mcid'],$row['csurname']." ".$row['cname']." ".$row['csecname'],$row['tnum'],$row['mtid'],$row['tsumcred'],$row['tdateopen'],$row['tdateplanclose'],$row['w'], $row['tsumhand']));
        }
        else{
          $_SESSION['sgact']= array(array($row['mcid'],$row['csurname']." ".$row['cname']." ".$row['csecname'],$row['tnum'],$row['mtid'],$row['tsumcred'],$row['tdateopen'],$row['tdateplanclose'],$row['w'], $row['tsumhand']));
        }
     }
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ("../../../bd_connect/error/index.php");
    exit();
  }

// массив для накладной

  try{
    $sql = "SELECT gdisc,  lz.tid AS mtid, tnum, tsumcred, tdateopen, tweight, catname, weight, sumcred, uname, usurname, usecname, lt.goodnum  
         FROM lzaloggood lg, lcat lc,  luser lu, lzalogticket lz, ltickettogood lt, lacttoticket lat 
         WHERE lg.goodid=lt.goodid AND lc.catid=lt.catid AND lu.uid=lz.uid  AND lt.tid = lz.tid AND lat.aid = '$aid' AND lat.tid=lz.tid 
         ORDER BY lz.tid, lt.goodnum";
    $result = $pdo->query($sql);
    while ($row = $result->fetch()){
        if (isset($_SESSION['sggact'])){
          array_push($_SESSION['sggact'],array($row['mtid'], $row['tdateopen'],$row['tnum'],$row['gdisc'],$row['catname'],$row['tweight'],$row['weight'],$row['tsumcred'],$row['sumcred'], $row['usurname']." ".$row['uname']." ".$row['usecname'],$row['goodnum'],1));
        }
        else{
          $_SESSION['sggact']= array(array($row['mtid'], $row['tdateopen'],$row['tnum'],$row['gdisc'],$row['catname'],$row['tweight'],$row['weight'],$row['tsumcred'],$row['sumcred'], $row['usurname']." ".$row['uname']." ".$row['usecname'],$row['goodnum'],1));
        }
    } 
   }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ("../../../bd_connect/error/index.php");
    exit();
  }


?>