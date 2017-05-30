<?php
session_start();
$actid = $_SESSION['sactid'];
include("../../../../../bd_connect/index.php");
if($_SESSION['sactpr']=='1'){
  try{
    $sql = "SELECT tnum, lg.goodid as gi, lg.gdisc as gd, catname, lt.weight as gw, lt.goodnum, lp.pnum, lz.tid, lt.sumhand, lu.usurname,
           lu.uname, lu.usecname, lu.uid, ls.sname, lg.idprice
          FROM lacttoticket la, ltickettogood lt, lzaloggood lg, lcat lc, lzalogticket lz, lpoint lp, luser lu, lstores ls
          WHERE  aid = '$actid' and la.tid = lt.tid and lg.goodid = lt.goodid and lc.catid = lt.catid 
                 and lz.tid = lt.tid and lz.pointid = lp.pid and lz.uid = lu.uid and ls.sid = lg.idshop
          ORDER BY lp.pnum, tnum, lt.goodnum";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
        $a=strlen($row['pnum']);//длина номера пункта
        $b=strlen($row['goodnum']);//длина номера товара
        $c=12-$a-$b;//рассчитываем количество недостающих символов
        $num=$row['pnum'].str_repeat("0", $c).$row['goodnum'];//определили номер товара (штрих-код)
        $b=strlen($row['tnum']);//длина номера билета
        $c=8-$a-$b;//рассчитываем количество недостающих символов
        $numt=$row['pnum'].str_repeat("0", $c).$row['tnum'];//определили еомер , билета
        if (isset($goodarr)){
          array_push($goodarr,array($row['gi'],$num,$numt,$row['gd'],$row['catname'],$row['gw'],0,1,$row['sumhand'],$row['usurname']." ".$row['uname']." ".$row['usecname'],
                                    $row['uid'],0,$row['sname'],$row['idprice']));
        }
        else{
          $goodarr= array(array($row['gi'],$num,$numt,$row['gd'],$row['catname'],$row['gw'],0,1,$row['sumhand'],$row['usurname']." ".$row['uname']." ".$row['usecname'],
                                $row['uid'],0,$row['sname'],$row['idprice']));
        }
    }
    $rez[0] = $_SESSION['sactnum'];
    $rez[1] = $_SESSION['sactdate'];
    $rez[2] = $goodarr;
    $rez[3] = $_SESSION['sactpr'];
    $cat=json_encode($rez);
    echo $cat;
  }
    catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include '../../../../../bd_connect/error/index.php';
    exit();
  }
}
else{
  try{
    $sql = "SELECT tnum, lg.goodid as gi, lg.gdisc as gd, catname, lt.weight as gw, lt.goodnum, lp.pnum, lz.tid, lt.sumhand, lu.usurname,
           lu.uname, lu.usecname, lu.uid
          FROM lacttoticket la, ltickettogood lt, lzaloggood lg, lcat lc, lzalogticket lz, lpoint lp, luser lu
          WHERE  aid = '$actid' and la.tid = lt.tid and lg.goodid = lt.goodid and lc.catid = lt.catid 
                 and lz.tid = lt.tid and lz.pointid = lp.pid and lz.uid = lu.uid
          ORDER BY lp.pnum, tnum, lt.goodnum";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
        $a=strlen($row['pnum']);//длина номера пункта
        $b=strlen($row['goodnum']);//длина номера товара
        $c=12-$a-$b;//рассчитываем количество недостающих символов
        $num=$row['pnum'].str_repeat("0", $c).$row['goodnum'];//определили номер товара (штрих-код)
        $b=strlen($row['tnum']);//длина номера билета
        $c=8-$a-$b;//рассчитываем количество недостающих символов
        $numt=$row['pnum'].str_repeat("0", $c).$row['tnum'];//определили еомер , билета
        if (isset($goodarr)){
          array_push($goodarr,array($row['gi'],$num,$numt,$row['gd'],$row['catname'],$row['gw'],0,1,$row['sumhand'],$row['usurname']." ".$row['uname']." ".$row['usecname'],
                                    $row['uid'],0));
        }
        else{
          $goodarr= array(array($row['gi'],$num,$numt,$row['gd'],$row['catname'],$row['gw'],0,1,$row['sumhand'],$row['usurname']." ".$row['uname']." ".$row['usecname'],
                                $row['uid'],0));
        }
    }
    $rez[0] = $_SESSION['sactnum'];
    $rez[1] = $_SESSION['sactdate'];
    $rez[2] = $goodarr;
    $rez[3] = $_SESSION['sactpr'];
    $cat=json_encode($rez);
    echo $cat;
  }
    catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include '../../../../../bd_connect/error/index.php';
    exit();
  }
}
?>