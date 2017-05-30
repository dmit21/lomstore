<?php
session_start();
$tid = $_POST['ptid'];
unset($_SESSION['sforprint']); 
include("../../../bd_connect/index.php");
// номер пункта и билета
try{
      $sql = "SELECT tnum, pnum, pointid, paddress, pphone, usurname,uname,usecname,unumlic, ciin, li.csurname, li.cname, li.csecname, docname, li.cndoc,
              li.cdataget, whoname, li.ccityname, li.cstreetname, li.chomenum, li.cflatnum, li.cphonenum, li.cmobilenum, lz.tsummark, lz.tsumcred, lz.tsumcom,
              lz.tsumrew, lz.tsumhand, tdateopen, tdateplanclose, tdatelgot, lc.cdoc AS pbon, lc.cndoc AS numbon, cdategetbon
              FROM lzalogticket lz, lpoint lp, luser lu, lclient lc, lclientinf li, ldoc ld, lwhogive lw
              WHERE lz.pointid = lp.pid and lz.tid = '$tid' and lz.uid = lu.uid and lz.cid = li.cinf and li.cid = lc.cid and ld.docid=li.cdoc and li.cwhogive = lw.whoid";
      $result = $pdo->query($sql);
      $row=$result->fetch();
      $_SESSION['spointnum'] = $row['pnum'];//длина номера пункта
      $_SESSION['snumticket'] = $row['tnum'];//длина номера билета
      $_SESSION['spaddress'] = $row['paddress'];
      $_SESSION['spphone'] = $row['pphone'];
      $_SESSION['szaluname'] = $row['usurname']." ".$row['uname']." ".$row['usecname'];
      $_SESSION['snumlic'] = $row['unumlic'];
      $_SESSION['siin'] = $row['ciin'];
      $_SESSION['sclientname'] = $row['csurname']." ".$row['cname']." ".$row['csecname'];
      $_SESSION['sdoc'] = $row['docname'];
      $_SESSION['snumdoc'] = $row['cndoc'];
      $_SESSION['scdataget'] = $row['cdataget'];
      $_SESSION['swhoname'] = $row['whoname'];
      $_SESSION['sccityname'] = $row['ccityname'];
      $_SESSION['scstreetname'] = $row['cstreetname'];
      $_SESSION['schomenum'] = $row['chomenum'];
      $_SESSION['scflatnum'] = $row['cflatnum'];
      $_SESSION['scphonenum'] = $row['cphonenum'];
      $_SESSION['scmobilenum'] = $row['cmobilenum'];
      $_SESSION['ssumo']=$row['tsummark'];
      $_SESSION['ssumk']=$row['tsumcred'];
      $_SESSION['ssumks']=$row['tsumcom'];
      $_SESSION['ssumv']=$row['tsumrew'];
      $_SESSION['ssumr']=$row['tsumhand'];
      $_SESSION['ssrok']=  round((strtotime($row['tdateplanclose'])-strtotime($row['tdateopen']))/60/60/24)+1;
      $_SESSION['sdateopen']=$row['tdateopen']; // дата выдачи
      $_SESSION['stdatelgot']=$row['tdatelgot']; // дата выдачи
      $_SESSION['scred_date_end']=$row['tdateplanclose']; // дата выдачи
      $pid = $row['pointid'];
      if (($row['pbon']!=0) AND ($row['numbon']!=0) AND ($row['cdategetbon']<=$row['tdateopen'])) {
         $a=strlen($row['pbon']);//длина номера пункта
         $b=strlen($row['numbon']);//длина номера билета
         $c=8-$a-$b;//рассчитываем количество недостающих символов
         $bonus=$row['pbon'].str_repeat("0", $c).$row['numbon'];//определили еомер залогового билета
         if ($row['cdategetbon'] = $row['tdateopen']) {
           $_SESSION['sbonus'] = "№ бонусной карты ".$bonus." получил: <span class='span5'>________ ____________________</span></p><p class='span6'><span class='span7'>подпись</span>
         <span class='span8'>ФИО</span></p>";
         }
         else {
         $_SESSION['sbonus'] = "№ бонусной карты ".$bonus;
         }
      }
      else {
        $_SESSION['sbonus'] = '';
      }

}
catch (PDOException $e){
              $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
              include ("../../../bd_connect/error/index.php");
              exit();
}
// список товаров
try{
      $sql = "SELECT gdisc, catname, gweight, summark, sumcred, sumcom, sumvoz, sumhand, lt.goodnum
              FROM ltickettogood lt, lzaloggood lz, lcat lc
              WHERE lt.tid = '$tid' and lz.goodid = lt.goodid and lc.catid = lz.catid";
      $result = $pdo->query($sql);
      while($row=$result->fetch()) {
        if (isset($_SESSION['sforprint'])){
          array_push($_SESSION['sforprint'],array($row['gdisc'],$row['catname'],$row['gweight'],$row['summark'],$row['sumcred'],$row['sumcom'],$row['sumvoz'],$row['sumhand'], $row['goodnum']));
        }
        else{
          $_SESSION['sforprint']= array(array($row['gdisc'],$row['catname'],$row['gweight'],$row['summark'],$row['sumcred'],$row['sumcom'],$row['sumvoz'],$row['sumhand'], $row['goodnum']));
        }
      }
}
catch (PDOException $e){
              $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
              include ("../../../bd_connect/error/index.php");
              exit();
}
?>