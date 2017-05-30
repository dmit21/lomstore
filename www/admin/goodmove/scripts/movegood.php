<?php
  session_start();
  $actid = $_POST['pactid'];
  include("../../../bd_connect/index.php");
  // номер накладной
  try {
    $sql = "SELECT max(nnum) AS num 
            FROM lnac
            where nact = 2";
    $result = $pdo->query($sql);
    $row=$result->fetch();
    if ($row['num']==0) {
      $nnum = 1;
    }
    else {
      $nnum = $row['num'] + 1;
    }
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  // номер накладной

  try {// определение идентификатора пункта, откуда передача
    $sql = "SELECT pointid FROM lactmove
            where aid = '$actid'";
    $result = $pdo->query($sql);
    $row=$result->fetch();
    $pid = $row['pointid'];
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }

  try {// создаем накладную на перемещение
      $sql="INSERT INTO lnac SET
        ndate = :mdate,
        ntime = curtime(),
        uid = :uid,
        nnum = :nnum,
        actid = :actid,
        nact = 2,
        pointid = :pointid";
        $s = $pdo->prepare($sql);
        $s->bindValue(":uid", $_SESSION["suid"]);
        $s->bindValue(":pointid", $pid);
        $s->bindValue(":mdate", $_SESSION["sdatecur"]);
        $s->bindValue(":nnum", $nnum);
        $s->bindValue(":actid", $actid);
        $s->execute();
        $nid=$pdo->lastInsertId();
        $_SESSION['snid'] = $nid;
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }

  try {// 
      $sql="INSERT INTO lnactogood (nid,goodid)
            select '$nid',goodid from lmovelist where aid = '$actid' and mact = 1";
      $s = $pdo->prepare($sql);
      $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }

  try {// текущий акт устанавливаем в обработан
    $sql="UPDATE lactmove SET
      amdate = :amdate,
      amtime = curtime(),
      aact = 1,
      uaid = :uaid
      WHERE aid = :aid";
    $s = $pdo->prepare($sql);
    $s->bindValue(":uaid", $_SESSION['suid']);
    $s->bindValue(":amdate", $_SESSION['sdatecur']);
    $s->bindValue(":aid", $actid);
    $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }

  // делаем накладную на изменение цен
  try {
    $sql="INSERT INTO snacprice SET
      ndate = :mdate,
      ntime = curtime(),
      uid = :uid,
      nact = 2,
      ndateent = curdate(),
      snact = 1";
    $s = $pdo->prepare($sql);
    $s->bindValue(":mdate", $_SESSION["sdatecur"]);
    $s->bindValue(":uid", $_SESSION["suid"]);
    $s->execute();
    $npriceid=$pdo->lastInsertId();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  // делаем накладную на изменение цен

  try {
    $sql="INSERT INTO snacpricetogood(nid, gid, oldprice, newprice, oldcat, newcat, olddiscont, newdiscont, snact)
          SELECT '$npriceid',lz.goodid, lz.idprice, ss.sprice, lz.idcatshop, lz.idcatshop, lz.mdiscount, ss.discont,3 
          FROM lmovelist lm, lzaloggood lz, sstoretodiscont ss 
          WHERE lm.aid = '$actid' and lz.goodid = lm.goodid and ss.catid = lz.idcatshop and ss.pointid = lm.mstore and lm.mact =1";
    $s = $pdo->prepare($sql);
    $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }

  try {
    $sql="UPDATE lzaloggood lz join (SELECT lzz.goodid as tgid, ss.sprice as tsprice, ss.discont as tdiscont,lm.mstore as tmstore 
          FROM lmovelist lm, lzaloggood lzz, sstoretodiscont ss 
          WHERE lm.aid = '$actid' and lzz.goodid = lm.goodid and ss.catid = lzz.idcatshop and ss.pointid = lm.mstore and lm.mact = 1) t1 
          ON lz.goodid = t1.tgid          
          SET
            lz.gact = 4,
            lz.idshopnew = 0,
            lz.idshop = t1.tmstore,
            lz.idprice = t1.tsprice,
            lz.mdiscount = t1.tdiscont";
    $s = $pdo->prepare($sql);
    $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include '../../../bd_connect/error/index.php';
    exit();
  }

  $suid = $_SESSION['suid'];
  $sdatecur = $_SESSION['sdatecur'];

  try {
    $sql="INSERT INTO lmovegoods (gid,uid,mdate,mtime,mfrom,mto,aid,moveid)
          select goodid, '$suid', '$sdatecur',curtime(), pointid, mstore,'$nid',1 from lactmove la, lmovelist lm where la.aid = '$actid' and la.aid = lm.aid and lm.mact = 1";
    $s = $pdo->prepare($sql);
    $s->bindValue(":gid", $tarr[$i][0]);
    $s->bindValue(":uid", $_SESSION['suid']);
    $s->bindValue(":mdate", $_SESSION['sdatecur']);
    $s->bindValue(":mfrom", $tarr[$i][3]);
    $s->bindValue(":mto", $tarr[$i][1]);
    $s->bindValue(":aid", $nid);
    $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include '../../../bd_connect/error/index.php';
    exit();
  }
  echo "Операция завершена";
?>