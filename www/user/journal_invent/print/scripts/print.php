<?php
session_start();
  $db = $_SESSION['sdb'];
  $pid = $_SESSION['spoint'];
  include("../../../../bd_connect/index.php");
   try {
    $sql = "select goodnum, gdisc, gweight, t4.oldprice as op, cname
            from lzaloggood lz, lcatshop lc, 
            (select * from (SELECT * FROM lmovegoods WHERE mdate<='$db' order by gid,mdate desc) as t1 group by t1.gid) as t2,
            (select * from (SELECT sg.*,sn.ndate as nndate FROM snacprice sn, snacpricetogood sg WHERE sn.ndate<='$db' and sn.nid = sg.nid order by nndate desc) as t3 group by gid) as t4
            where lz.goodid = t2.gid and t2.mto = '$pid' and lz.idcatshop = lc.cid and t2.gid = t4.gid and gact<>5
            order by goodnum";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($goodarr)){
        array_push($goodarr,array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['cname'],$row['op']));
      }
      else{
        $goodarr= array(array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['cname'],$row['op']));
      }
    }
  }
    catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../../bd_connect/error/index.php');
    exit();
  }
$rez[0] = $_SESSION['sdb'];
$rez[1] = $_SESSION['spointnum'];
$rez[2] = $_SESSION['spointname'];
$rez[3] = $_SESSION['spointadress'];
$rez[4] = $goodarr;
$ar = json_encode($rez);
echo $ar;
?>