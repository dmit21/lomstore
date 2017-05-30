<?php
  session_start();
  unset($_SESSION['sgoodarr']);
  $num = $_POST['pnum'];
  include("../../../bd_connect/index.php");
  try {
    switch ($num) {
      case '0':
        $sql =  "SELECT gdisc, gweight, catname, lg.goodid,sumhand, lt.goodnum, tnum, pnum 
                 FROM lactisp la, lacttoticket lat, ltickettogood lt, lzaloggood lg, lzalogticket lz, lpoint lp, lcat lc
                 WHERE (la.aact = 0 OR la.aact = 3) AND la.aid = lat.aid AND lat.tid = lz.tid AND lz.tid = lt.tid AND lt.goodid = lg.goodid AND lz.pointid = lp.pid AND lg.catid = lc.catid
                 ORDER BY gdisc";
        $result = $pdo->query($sql);
        while ($row=$result->fetch()) {
          $a=strlen($row['pnum']);//длина номера пункта
          $b=strlen($row['tnum']);//длина номера билета
          $c=8-$a-$b;//рассчитываем количество недостающих символов
          $gtic=$row['pnum'].str_repeat("0", $c).$row['tnum'];//определили еомер залогового билета
          $a=strlen($row['pnum']);//длина номера пункта
          $b=strlen($row['goodnum']);//длина номера билета
          $c=12-$a-$b;//рассчитываем количество недостающих символов
          $gnum=$row['pnum'].str_repeat("0", $c).$row['goodnum'];//определили еомер залогового билета
          if (isset($_SESSION['sgoodarr'])){
            array_push($_SESSION['sgoodarr'],array($row['goodid'],$row['gdisc'],$gnum,0,$row['gweight'],'не разукомплектован',$row['catname'],
                                                   $gtic,$row['sumhand'],0));
          }
          else{
            $_SESSION['sgoodarr']= array(array($row['goodid'],$row['gdisc'],$gnum,0,$row['gweight'],'не разукомплектован',$row['catname'],
                                                   $gtic,$row['sumhand'],0));
          }
        }
      break;
      case '100000':
        $sql = "SELECT goodnum, gdisc, gweight, idprice, catname, sname, goodid, goodtic, gsumhand, snum  
                FROM lzaloggood lz, lcat lc, lstores ls
                WHERE lz.catid = lc.catid and lz.idshop = ls.sid and gact <> 5 AND gact>3
                ORDER BY snum,goodtic,goodnum";
        $result = $pdo->query($sql);
        while ($row=$result->fetch()) {
          if (isset($_SESSION['sgoodarr'])){
            array_push($_SESSION['sgoodarr'],array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['idprice'],$row['gweight'],$row['sname'],$row['catname'],
                                                   $row['goodtic'],$row['gsumhand'],$row['idprice']));
          }
          else{
            $_SESSION['sgoodarr']= array(array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['idprice'],$row['gweight'],$row['sname'],$row['catname'],
                                                   $row['goodtic'],$row['gsumhand'],$row['idprice']));
          }
        }
      break;
      default:
        $sql = "SELECT goodnum, gdisc, gweight, idprice, catname, sname, goodid, goodtic, gsumhand
                FROM lzaloggood lz, lcat lc, lstores ls
                WHERE lz.catid = lc.catid and lz.idshop = ls.sid and lz.idshop = '$num' and gact <> 5 AND gact>3
                ORDER BY goodtic,goodnum";
        $result = $pdo->query($sql);                
        while ($row=$result->fetch()) {
          if (isset($_SESSION['sgoodarr'])){
            array_push($_SESSION['sgoodarr'],array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['idprice'],$row['gweight'],$row['sname'],$row['catname'],
                                                   $row['goodtic'],$row['gsumhand'],$row['idprice']));
          }
          else{
            $_SESSION['sgoodarr']= array(array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['idprice'],$row['gweight'],$row['sname'],$row['catname'],
                                                   $row['goodtic'],$row['gsumhand'],$row['idprice']));
          }
        }
      break;
    }    
    $cat=json_encode($_SESSION['sgoodarr']);
    echo $cat;
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
?>