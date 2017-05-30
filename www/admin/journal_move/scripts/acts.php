<?php
  $pid = $_POST['ppoint'];
  $mdb = $_POST['pdb'];
  $mde = $_POST['pde'];
  include("../../../bd_connect/index.php");
  try {
    if ($pid == '0') {
    $sql = "SELECT la.*, ls.sname
          FROM lactmove la, lstores ls
          WHERE la.pointid = ls.sid AND adate BETWEEN '$mdb' AND '$mde'
          ORDER BY sname, anum";
    }
    else {
      $sql = "SELECT la.*, ls.sname
          FROM lactmove la, lstores ls
          WHERE la.pointid = ls.sid AND adate BETWEEN '$mdb' AND '$mde' AND la.pointid = '$pid'
          ORDER BY sname, anum";
    }
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($act)){
        array_push($act,array($row['aid'],$row['adate'],$row['uid'],$row['pointid'], $row['anum'], $row['uaid'], $row['amdate'], $row['aact'],$row['sname']));
      }
      else{
        $act= array(array($row['aid'],$row['adate'],$row['uid'],$row['pointid'], $row['anum'], $row['uaid'], $row['amdate'], $row['aact'],$row['sname']));
      }
    }
    $rez[0] = $act;
}
  catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
 }
  try{// массив товаров актов
    if ($pid=='0'){
    $sql = "SELECT lm.aid,goodtic,goodnum, gdisc, gweight, idprice,cname,gsumhand,
            (select sname from lstores ls where ls.sid = la.pointid) as sfrom,
            (select sname from lstores ls1 where ls1.sid = lm.mstore) as sto
            FROM lactmove la, lzaloggood lz, lmovelist lm, lcatshop lc
            WHERE la.aid = lm.aid and lm.goodid = lz.goodid and la.aact = 1 and lc.cid = lz.idcatshop and la.adate BETWEEN '2016-08-01' AND '2016-12-03'
            order by lm.aid,goodnum";
    }
    else {
      $sql = "SELECT lm.aid,goodtic,goodnum, gdisc, gweight, idprice,cname,gsumhand,
            (select sname from lstores ls where ls.sid = la.pointid) as sfrom,
            (select sname from lstores ls1 where ls1.sid = lm.mstore) as sto
            FROM lactmove la, lzaloggood lz, lmovelist lm, lcatshop lc
            WHERE la.aid = lm.aid and lm.goodid = lz.goodid and la.aact = 1 and lc.cid = lz.idcatshop and la.adate BETWEEN '2016-08-01' AND '2016-12-03'
            order by lm.aid,goodnum";
    }
      $result = $pdo->query($sql);
      while ($row=$result->fetch()) {
        if (isset($garr)){
            array_push($garr,array($row['aid'],$row['goodtic'],$row['goodnum'],$row['gdisc'],$row['gweight'],$row['cname'],$row['idprice'],
                                   $row['gsumhand'],$row['sfrom'],$row['sto']));
        }
        else{
          $garr= array(array($row['aid'],$row['goodtic'],$row['goodnum'],$row['gdisc'],$row['gweight'],$row['cname'],$row['idprice'],
                                   $row['gsumhand'],$row['sfrom'],$row['sto']));
        }
      }
      $rez[1] = $garr; 
    }
  catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ('../../../bd_connect/error/index.php');
        exit();
    }
  
  $r=json_encode($rez);
  echo $r;
?>