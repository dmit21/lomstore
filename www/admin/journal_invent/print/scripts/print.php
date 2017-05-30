<?php
session_start();
$sid = $_SESSION['starr'];
$db = $_SESSION['sdb'];
$rez[0] = $_SESSION['sdb'];
$rez[1] = '';
$rez[2] = $_SESSION['starr'];
include("../../../../bd_connect/index.php");
if ($sid == '0') {
  $st = '';	
}
else {
  $st =  " AND ls.sid = '$sid' ";	
}
   try {
    $sql = "select goodnum, gdisc, gweight, sname, t4.newprice as op, cname, ls.sid as cate
            from lzaloggood lz, lcatshop lc, lstores ls, 
            (select * from (SELECT * FROM lmovegoods WHERE mdate<='$db' order by gid,mdate desc,mtime desc) as t1 group by t1.gid) as t2,
            (select * from (SELECT sg.*,sn.ndate as nndate FROM snacprice sn, snacpricetogood sg WHERE sn.ndate<='$db' and sn.nid = sg.nid order by nndate desc, ntime desc) as t3 group by gid) as t4
            where lz.goodid = t2.gid and ls.sid = t2.mto and t4.newcat = lc.cid and t2.gid = t4.gid and lz.gact<>5 and lz.gact<>3 ".$st."
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
    $rez[3]=$goodarr;
    
  }
catch (PDOException $e){
$error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
include ('../../../../bd_connect/error/index.php');
exit();
}
$ar = json_encode($rez);
echo $ar;
?>