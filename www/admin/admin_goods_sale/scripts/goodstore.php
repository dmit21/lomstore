<?php
  session_start();
  include("../../../bd_connect/index.php");
  // формирование остатков на оптовиках
  try {
    $sql = "SELECT osum FROM sostatok WHERE oact=0 AND odate='$_SESSION[sdatecur]' AND pointid=3";
    $result = $pdo->query($sql);
    $count = $result->rowcount();
    $row = $result->fetch();
    if ($count==0) {
      try {
        $sql = "SELECT osum, odate FROM sostatok WHERE oact=1 AND odate<'$_SESSION[sdatecur]' AND pointid=3 ORDER BY odate DESC LIMIT 1";
        $result = $pdo->query($sql);
        $count1 = $result->rowcount();
        $row = $result->fetch();
        if ($count1==0) {
          $_SESSION['sosum']=0;
        }
        else{
          $_SESSION['sosum']=$row['osum'];
        }
        try{
          $sql="INSERT INTO sostatok SET
                pointid=:pointid,
                uid=:uid,odate=:odate,
                otime=curtime(),
                osum=:osum,
                oact=:oact";
                $s = $pdo->prepare($sql);
                $s->bindValue(":pointid", 3);
                $s->bindValue(":odate", $_SESSION['sdatecur']);
                $s->bindValue(":uid", $_SESSION['suid']);
                $s->bindValue(":osum", $_SESSION['sosum']);
                $s->bindValue(":oact", 0);
                $s->execute();
                $sql="INSERT INTO sostatok SET
                      pointid=:pointid,
                      uid=:uid,odate=:odate,
                      otime=curtime(),
                      osum=:osum,
                      oact=:oact";
                $s = $pdo->prepare($sql);
                $s->bindValue(":pointid", 3);
                $s->bindValue(":odate", $_SESSION['sdatecur']);
                $s->bindValue(":uid", $_SESSION['suid']);
                $s->bindValue(":osum", $_SESSION['sosum']);
                $s->bindValue(":oact", 1);
                $s->execute();
        }
        catch (PDOException $e){
          $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
          include ("../../../bd_connect/error/index.php");
          exit();
        }
      }
      catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ("../../../bd_connect/error/index.php");
        exit();
      }
    }
    else {
      $_SESSION['sosum']=$row['osum'];
    }
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ("../../../bd_connect/error/index.php");
    exit();
  }
  // формирование остатков на оптовиках

  // список актов по пункту
  try {
    $sql = "SELECT aid,adate,anum
            FROM lsaleact
            WHERE pointid = 3 and aact = 2
            order by anum";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($aarr)){
        array_push($aarr,array($row['aid'],$row['adate'],$row['anum']));
      }
      else{
        $aarr= array(array($row['aid'],$row['adate'],$row['anum']));
      }
    }
    $rez[0] = $aarr;
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  // список актов по пункту
  
  // товары, доступные для продажи
  try {
    $sql = "SELECT goodnum, gdisc, gweight, cname, idprice, cdiscont, goodid, gact, gsumhand
            FROM lzaloggood lz, lcatshop lc
            WHERE lz.idcatshop = lc.cid and lz.idshop = 3 and (gact=4 or gact=6)";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($goodarr)){
        array_push($goodarr,array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['cdiscont'],$row['gact'],$row['gsumhand'],0));
      }
      else{
        $goodarr= array(array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['cdiscont'],$row['gact'],$row['gsumhand'],0));
      }
    }
    $rez[1] = $goodarr;
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  // товары, доступные для продажи

  // товары по актам продаж
  try {
    $sql = "SELECT goodnum, gdisc, gweight, cname, idprice, cdiscont, lz.goodid as mgoodid, gact, gsumhand, gsumsale, ls.aid as mactid
            FROM lsaleact ls, lsaleacttogood lg, lzaloggood lz, lcatshop lc
            WHERE ls.pointid = 3 and ls.aact=2 and lg.aid = ls.aid and lg.goodid = lz.goodid and lz.idcatshop = lc.cid";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($salearr)){
        array_push($salearr,array($row['mgoodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['cdiscont'],$row['gact'],
                                  $row['gsumhand'],$row['gsumsale'],$row['mactid']));
      }
      else{
        $salearr= array(array($row['mgoodid'],$row['gdisc'],$row['goodnum'],$row['cname'],$row['gweight'],$row['idprice'],$row['cdiscont'],$row['gact'],
                              $row['gsumhand'],$row['gsumsale'],$row['mactid']));
      }
    }
    $rez[2] = $salearr;
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  $cat=json_encode($rez);
  echo $cat;
?>