<?php
session_start();
$aid = $_POST['paid'];
unset($_SESSION['sggact']); 
include("../../../bd_connect/index.php");

try{// определяем тип операции разукомплектация, перемещение, реализация, возврат
  $sql = "SELECT moveid
         FROM lmovegoods
         WHERE aid ='$aid'";
  $result = $pdo->query($sql);
  $row = $result->fetch();
  $moveid = $row['moveid'];
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ("../../../bd_connect/error/index.php");
  exit();
}
switch ($moveid) {
  case 0:// разукомплектация
    try{
      $sql = "SELECT goodtic,goodnum,gdisc,catname, gweight, idprice, gsumhand, uname, usurname, usecname,sname, nnum, ndate  
           FROM lzaloggood lg, lcat lc, luser lu, lstores ls, lnac ln, lmovegoods lmg
           WHERE ln.nid ='$aid' AND ln.nid = lmg.aid and lg.goodid = lmg.gid and lc.catid=lg.catid AND lu.uid=ln.uid and ls.sid = lmg.mto  
           ORDER BY goodtic, goodnum";
      $result = $pdo->query($sql);
      while ($row = $result->fetch()){
        if (isset($_SESSION['sggact'])){
          array_push($_SESSION['sggact'],array($row['goodtic'], $row['goodnum'], $row['gdisc'], $row['catname'], $row['gweight'], $row['idprice'], $row['gsumhand'], $row['uname'],
                     $row['usurname'], $row['usecname'], $row['sname'], $row['nnum'], $row['ndate']));
          }
        else{
          $_SESSION['sggact']= array(array($row['goodtic'], $row['goodnum'], $row['gdisc'], $row['catname'], $row['gweight'], $row['idprice'], $row['gsumhand'], $row['uname'],
                              $row['usurname'], $row['usecname'], $row['sname'], $row['nnum'], $row['ndate']));
        }
      } 
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
  break;
  case 1:// перемещение
    try{
      $sql = "SELECT goodtic,goodnum,gdisc,catname, gweight, idprice, gsumhand, uname, usurname, usecname,sname, nnum, ndate  
           FROM lzaloggood lg, lcat lc, luser lu, lstores ls, lnac ln, lmovegoods lmg
           WHERE ln.nid ='$aid' AND ln.nid = lmg.aid and lg.goodid = lmg.gid and lc.catid=lg.catid AND lu.uid=ln.uid and ls.sid = lmg.mto  
           ORDER BY goodtic, goodnum";
      $result = $pdo->query($sql);
      while ($row = $result->fetch()){
        if (isset($_SESSION['sggact'])){
          array_push($_SESSION['sggact'],array($row['goodtic'], $row['goodnum'], $row['gdisc'], $row['catname'], $row['gweight'], $row['idprice'], $row['gsumhand'], $row['uname'],
                     $row['usurname'], $row['usecname'], $row['sname'], $row['nnum'], $row['ndate']));
          }
        else{
          $_SESSION['sggact']= array(array($row['goodtic'], $row['goodnum'], $row['gdisc'], $row['catname'], $row['gweight'], $row['idprice'], $row['gsumhand'], $row['uname'],
                              $row['usurname'], $row['usecname'], $row['sname'], $row['nnum'], $row['ndate']));
        }
      } 
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
  break;
  case 2:// продажа
    try{
      $sql = "SELECT goodtic,goodnum,gdisc,catname, gweight, idprice, gsumhand, uname, usurname, usecname,sname, nnum, ndate, lcs.cdiscont, gsumsaleadm  
           FROM lzaloggood lg, lcat lc, luser lu, lstores ls, lnac ln, lmovegoods lmg, lcatshop lcs
           WHERE ln.nid ='$aid' AND ln.nid = lmg.aid and lg.goodid = lmg.gid and lc.catid=lg.catid AND lu.uid=ln.uid and ls.sid = lmg.mfrom and lcs.cid = lg.idshop
           ORDER BY goodtic, goodnum";
      $result = $pdo->query($sql);
      while ($row = $result->fetch()){
        if (isset($_SESSION['sggact'])){
          array_push($_SESSION['sggact'],array($row['goodtic'], $row['goodnum'], $row['gdisc'], $row['catname'], $row['gweight'], $row['idprice'], $row['gsumhand'], $row['uname'],
                     $row['usurname'], $row['usecname'], $row['sname'], $row['nnum'], $row['ndate'], $row['cdiscont'], $row['gsumsaleadm']));
          }
        else{
          $_SESSION['sggact']= array(array($row['goodtic'], $row['goodnum'], $row['gdisc'], $row['catname'], $row['gweight'], $row['idprice'], $row['gsumhand'], $row['uname'],
                              $row['usurname'], $row['usecname'], $row['sname'], $row['nnum'], $row['ndate'], $row['cdiscont'], $row['gsumsaleadm']));
        }
      } 
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
  break;
  case 3:// возврат
    try{
      $sql = "SELECT goodtic,goodnum,gdisc,catname, gweight, idprice, gsumhand, uname, usurname, usecname, sname, nnum, ndate, lcs.cdiscont,   
              (select gsum from lnactogood where nid = ln.nid and goodid = lg.goodid) as gssum, 
              (select concat(usurname,' ',uname) from luser lr where lr.uid = ln.uid) as unname
              FROM lzaloggood lg, lcat lc, luser lu, lnac ln, lmovegoods lmg, lcatshop lcs, lstores ls
              WHERE ln.nid = '$aid' AND ln.nid = lmg.aid and lg.goodid = lmg.gid and lc.catid=lg.catid AND lu.uid=lg.uid and lcs.cid = lg.idshop and ln.pointid = ls.sid
              ORDER BY goodtic, goodnum";
      $result = $pdo->query($sql);
      while ($row = $result->fetch()){
        if (isset($_SESSION['sggact'])){
          array_push($_SESSION['sggact'],array($row['goodtic'], $row['goodnum'], $row['gdisc'], $row['catname'], $row['gweight'], $row['idprice'], $row['gsumhand'], $row['uname'].
                                          ' '.$row['usurname'].' '.$row['usecname'], $row['sname'], $row['nnum'], $row['ndate'], $row['cdiscont'], $row['gssum'], $row['unname']));
          }
        else{
          $_SESSION['sggact']= array(array($row['goodtic'], $row['goodnum'], $row['gdisc'], $row['catname'], $row['gweight'], $row['idprice'], $row['gsumhand'], $row['uname'].
                                          ' '.$row['usurname'].' '.$row['usecname'], $row['sname'], $row['nnum'], $row['ndate'], $row['cdiscont'], $row['gssum'], $row['unname']));
        }
      } 
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
  break;
}
echo $moveid;
?>