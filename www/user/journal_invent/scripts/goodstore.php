<?php
  session_start();
  $pid = $_SESSION['spoint'];
  $db = $_POST['pdb'];
  include("../../../bd_connect/index.php");
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
    $cat=json_encode($goodarr);
    echo $cat;
  }
    catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
?>