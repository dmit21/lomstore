<?php
  session_start();
  $db = $_POST['pdb'];
  include("../../../bd_connect/index.php");
   try {
    $sql = "select goodnum, gdisc, gweight, sname, t4.newprice as op, cname, ls.sid as cate
            from lzaloggood lz, lcatshop lc, lstores ls, 
            (select * from (SELECT * FROM lmovegoods WHERE mdate<='$db' order by gid,mdate desc,mtime desc) as t1 group by t1.gid) as t2,
            (select * from (SELECT sg.*,sn.ndate as nndate FROM snacprice sn, snacpricetogood sg WHERE sn.ndate<='$db' and sn.nid = sg.nid order by nndate desc, ntime desc) as t3 group by gid) as t4
            where lz.goodid = t2.gid and ls.sid = t2.mto and t4.newcat = lc.cid and t2.gid = t4.gid and lz.gact<>5 and lz.gact<>3
            order by sname,goodnum";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($goodarr)){
        array_push($goodarr,array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['cname'],$row['op'],$row['sname'],$row['cate']));
      }
      else{
        $goodarr= array(array($row['goodnum'],$row['gdisc'],$row['gweight'],$row['cname'],$row['op'],$row['sname'],$row['cate']));
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
