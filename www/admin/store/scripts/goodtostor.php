<?php
  session_start();
  $sel = $_POST['psel'];
  $mn = $_POST['pmn'];
  include("../../../bd_connect/index.php");
  if ($mn=='0'){
  // делаем накладную на разукомплект
    try {
      $sql = "SELECT max(nnum) as mnnum
              FROM lnac
              WHERE nact = 0";
      $result = $pdo->query($sql);
      $row=$result->fetch();
      if($row['mnnum']!=0){
        $nnum = $row['mnnum']+1;
      }
      else{
        $nnum = 1;
      }
      $_SESSION['snnum'] = $nnum;
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include '../../../bd_connect/error/';
      exit();
    }
    try {
      $sql="INSERT INTO lnac SET
        ndate = :mdate,
        ntime = curtime(),
        uid = :uid,
        nnum = :nnum,
        nact = 0,
        actid = :actid,
        pointid = 0";
      $s = $pdo->prepare($sql);
      $s->bindValue(":mdate", $_SESSION["sdatecur"]);
      $s->bindValue(":uid", $_SESSION["suid"]);
      $s->bindValue(":nnum", $nnum);
      $s->bindValue(":actid", $sel);
      $s->execute();
      $nid=$pdo->lastInsertId();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
  // делаем накладную на разукомплект
    // вставляем товары в lnactogood
    try {
      $sql="INSERT INTO lnactogood (nid,goodid,nstore,ncat, gsum)
            SELECT '$nid', goodid,idshop, idcatshop, idprice FROM lzaloggood WHERE actid = '$sel' order by goodtic";
      $s = $pdo->prepare($sql);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
    // вставляем товары в lnactogood
  // делаем накладную на изменение цен
    try {
      $sql="INSERT INTO snacprice SET
        ndate = :mdate,
        ntime = curtime(),
        uid = :uid,
        nact = 0,
        snact = 1,
        ndateent = curdate(),
        nacid = :nacid";
      $s = $pdo->prepare($sql);
      $s->bindValue(":mdate", $_SESSION["sdatecur"]);
      $s->bindValue(":uid", $_SESSION["suid"]);
      $s->bindValue(":nacid", $nid);
      $s->execute();
      $npriceid=$pdo->lastInsertId();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
  // делаем накладную на изменение цен
    // вставляем значения в snacpricetogood
    try {
      $sql="INSERT INTO snacpricetogood (nid, gid, oldprice, newprice, oldcat, newcat,olddiscont,newdiscont,snact)
            SELECT '$npriceid',goodid,idprice,idprice,idcatshop,idcatshop,mdiscount,mdiscount,4
            FROM lzaloggood WHERE actid = '$sel' order by goodtic";
      $s = $pdo->prepare($sql);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
    // вставляем значения в snacpricetogood
    // вставляем инфу в lmovegoods
    try {
      $sql="INSERT INTO lmovegoods (gid,uid,mdate,mtime,mfrom,mto,aid,moveid)
            SELECT goodid, '$_SESSION[suid]', '$_SESSION[sdatecur]', curtime(), 0, idshop, '$nid',0 FROM lzaloggood WHERE actid = '$sel' order by goodtic";
      $s = $pdo->prepare($sql);
      $s->execute();
    }
    catch (PDOException $e){
            $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
            include ('../../../bd_connect/error/index.php');
            exit();
    }
    // вставляем инфу в lmovegoods
// в lzaloggood ставим признак, что товар в магазине
    try {
      $sql="UPDATE lzaloggood SET
      gact = 4
      WHERE actid = :actid";
      $s = $pdo->prepare($sql);
      $s->bindValue(":actid", $sel);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
// в lzaloggood ставим признак, что товар в магазине
// устанавливаем, что акт проведен
    try {
      $sql="UPDATE lactisp SET
      aact = 4,
      ruid = :ruid,
      rdate = curdate(),
      rtime = curtime()
      WHERE
      aid = :aid";
      $s = $pdo->prepare($sql);
      $s->bindValue(":aid", $sel);
      $s->bindValue(":ruid", $_SESSION['suid']);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
// устанавливаем, что акт проведен
  }
?>