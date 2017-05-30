<?php
  session_start();
  include("../../../bd_connect/index.php");
  try {
    $sql = "SELECT lz.goodid, lz.goodnum, lz.gdisc, lz.gweight, lz.idcatshop, lz.idprice, ls.sname, lz.idshop, lz.mdiscount, 
                   lz.gind, lc.catname
            FROM lzaloggood lz, lstores ls, lcat lc 
            WHERE lz.idshop = ls.sid AND (lz.gact = 4 OR lz.gact = 6) and lz.catid = lc.catid
            ORDER BY sname, gind DESC, goodnum";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($rez[0])){
        array_push($rez[0],array($row['goodid'],$row['goodnum'],$row['gdisc'],$row['gweight'],$row['idcatshop'],
                                 $row['idprice'],$row['sname'],$row['idshop'], $row['mdiscount'], $row['gind'],$row['catname']));
      }
      else{
        $rez[0]= array(array($row['goodid'],$row['goodnum'],$row['gdisc'],$row['gweight'],$row['idcatshop'],
                             $row['idprice'],$row['sname'],$row['idshop'], $row['mdiscount'], $row['gind'],$row['catname']));
      }
    }
  }
    catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  try {
    $sql = "SELECT ss.pointid, ss.catid, ss.sprice, ss.discont,lc.cname
            FROM sstoretodiscont ss, lcatshop lc
            where lc.cid = ss.catid
            order by ss.pointid,ss.catid"; 
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($rez[1])){
        array_push($rez[1],array($row['pointid'],$row['catid'],$row['cname'],$row['sprice'],$row['discont']));
      }
      else{
        $rez[1]= array(array($row['pointid'],$row['catid'],$row['cname'],$row['sprice'],$row['discont']));
      }
    }
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }

  // формирование накладной изменения товара  
  try {
    $sql = "SELECT nid
            FROM snacprice
            where snact = 2"; 
    $result = $pdo->query($sql);
    $row=$result->fetch();
    $cs=$result->rowcount();
    if($cs==0){
      try{
        $sql="INSERT INTO snacprice SET 
          uid = :uid,
          nact = 1,
          ndateent = curdate(),
          snact = 2";
          $s = $pdo->prepare($sql);
          $s->bindValue(":uid", $_SESSION['suid']);
          $s->execute();
          $nid=$pdo->lastInsertId();
      }
      catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ("../../../bd_connect/error/index.php");
        exit();
      }
    }
    else{
      $nid = $row['nid'];
    }
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  // формирование накладной изменения товара  
$rez[2] = $nid;

$cat=json_encode($rez);
echo $cat;
?>
