<?php
session_start();
include("../../../bd_connect/index.php");
$rez  = $_POST['prez'];
$datech = $_POST['pdatech'];
$dep = $_POST['pglstid'];
if($dep==0){
  $n = count($rez);
  for ($i = 0; $i<$n; $i++) {
    try{
      $sql="INSERT INTO stimeotsprice SET 
            catstorid = :catstorid,
            catid = :catid,
            catprice = :catprice,
            catdiscont = :catdiscont,
            catdate = :catdate,
            catuser = :catuser,
            catdateint = curdate(),
            catact = 0";
      $s = $pdo->prepare($sql);
      $s->bindValue(":catstorid", $dep);
      $s->bindValue(":catid", $rez[$i][0]);
      $s->bindValue(":catprice", $rez[$i][1]);
      $s->bindValue(":catdiscont", $rez[$i][2]);
      $s->bindValue(":catdate", $datech);
      $s->bindValue(":catuser", $_SESSION['suid']);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
  }

  if($datech==$_SESSION['sdatecur']){// Изменять сразу
    // редактируем таблицу lcatshop
    try {
      $sql="UPDATE lcatshop lc join (select catid, catprice, catdiscont from stimeotsprice lt where lt.catact = 0 and lt.catstorid = 0) t1 on t1.catid = lc.cid
            SET 
            lc.cprice=t1.catprice,
            lc.cdiscont=t1.catdiscont";
      $s = $pdo->prepare($sql);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
    // редактируем таблицу lcatshop
    // вставляем информацию в накладные по изменению цен
	  // делаем накладную на изменение цен
	    try {
	      $sql="INSERT INTO snacprice SET
	        ndate = :mdate,
	        ntime = curtime(),
          ndateent = curdate(),
	        uid = :uid,
	        nact = 3,
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
	  // вставка товаров с измененными ценами в snacpricetogood
	    try {
	      $sql="INSERT INTO snacpricetogood (nid, gid, oldprice, newprice, oldcat, newcat,olddiscont,newdiscont,snact)
	      select '$npriceid', lz.goodid, lz.idprice, t1.catprice, lz.idcatshop,t1.catid,lz.mdiscount,t1.catdiscont,0 
        from lzaloggood lz join (select catid, catprice, catdiscont from stimeotsprice lt where lt.catact = 0 and lt.catstorid=0) t1 
        on t1.catid = lz.idcatshop and (lz.gact = 4 or lz.gact = 6) and lz.gind = 0";
	      $s = $pdo->prepare($sql);
	      $s->execute();
	    }
	    catch (PDOException $e){
	      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
	      include ('../../../bd_connect/error/index.php');
	      exit();
	    }
	  // вставка товаров с измененными ценами в snacpricetogood

    // вставляем информацию в накладные по изменению цен

    // редактируем таблицу lzaloggood
    try {
      $sql="UPDATE lzaloggood lz join (select catid, catprice, catdiscont from stimeotsprice lt where lt.catact = 0 and lt.catstorid=0) t1 on t1.catid = lz.idcatshop 
            SET 
            lz.idprice=t1.catprice,
            lz.mdiscount = t1.catdiscont
            where (lz.gact = 4 or lz.gact = 6) and gind = 0";
      $s = $pdo->prepare($sql);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
    // редактируем таблицу lzaloggood

  // редактируем таблицу sstoretodiscont
    try {
      $sql="UPDATE sstoretodiscont lz join (select catid, catprice, catdiscont from stimeotsprice lt where lt.catact = 0 and lt.catstorid=0) t1 on t1.catid = lz.catid 
            SET 
            lz.sprice=t1.catprice,
            lz.discont = t1.catdiscont";
      $s = $pdo->prepare($sql);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
  // редактируем таблицу sstoretodiscont

    // ставим в выполнено таблицу stimeotsprise
    try {
        $sql="UPDATE stimeotsprice SET
          catact = 1
          WHERE catdate = :catdate and catstorid = 0 and catact = 0";
        $s = $pdo->prepare($sql);
        $s->bindValue(":catdate", $_SESSION['sdatecur']);
        $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
    // ставим в выполнено таблицу stimeotsprise

    // перезаписываем массив цен
    unset($_SESSION['scatarrshop']);
    try {
      $sql = "SELECT * FROM lcatshop
              ORDER BY cid";
      $result = $pdo->query($sql);
      while ($row=$result->fetch()) {
        if (isset($_SESSION['scatarrshop'])){
          array_push($_SESSION['scatarrshop'],array($row['cid'],$row['cname'],$row['cprice'],$row['cdiscont']));
        }
        else{
          $_SESSION['scatarrshop']= array(array($row['cid'],$row['cname'],$row['cprice'],$row['cdiscont']));
        }
      }
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../bd_connect/error/index.php");
      exit();
    }
    $rez[0] = $_SESSION['scatarrshop'];
    // перезаписываем массив цен
    try {
      $sql = "SELECT ss.pointid, ss.catid, ss.discont, lc.cname, ss.sprice
              FROM sstoretodiscont ss, lcatshop lc
              WHERE ss.catid = lc.cid 
              ORDER BY pointid, catid";
      $result = $pdo->query($sql);
      while ($row=$result->fetch()) {
        if (isset($discont)){
          array_push($discont,array($row['pointid'],$row['catid'],$row['discont'], $row['cname'],$row['sprice']));
        }
        else{
          $discont = array(array($row['pointid'],$row['catid'],$row['discont'], $row['cname'],$row['sprice']));
        }
      }
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
      echo $e;
    }
    $rez[1] = $discont;
    $r=json_encode($rez);
    echo $r;
  }
}
else{
  $n = count($rez);
  for ($i = 0; $i<$n; $i++) {
    try{
      $sql="INSERT INTO stimeotsprice SET 
            catstorid = :catstorid,
            catid = :catid,
            catprice = :catprice,
            catdiscont = :catdiscont,
            catdate = :catdate,
            catuser = :catuser,
            catdateint = curdate(),
            catact = 0";
      $s = $pdo->prepare($sql);
      $s->bindValue(":catstorid", $dep);
      $s->bindValue(":catid", $rez[$i][0]);
      $s->bindValue(":catprice", $rez[$i][1]);
      $s->bindValue(":catdiscont", $rez[$i][2]);
      $s->bindValue(":catdate", $datech);
      $s->bindValue(":catuser", $_SESSION['suid']);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
  }

  if($datech==$_SESSION['sdatecur']){// Изменять сразу
    // редактируем таблицу sstoretodiscont
    try {
      $sql="UPDATE sstoretodiscont ss join 
            (select catid, catprice, catstorid, catdiscont from stimeotsprice lt where lt.catact = 0 and lt.catstorid <> 0) t1 
            on t1.catid = ss.catid and t1.catstorid = ss.pointid
            SET 
            ss.discont=t1.catdiscont,
            ss.sprice = t1.catprice";
      $s = $pdo->prepare($sql);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
    // редактируем таблицу sstoretodiscont

    // вставляем информацию в накладные по изменению цен
	  // делаем накладную на изменение цен
	    try {
	      $sql="INSERT INTO snacprice SET
	        ndate = :mdate,
	        ntime = curtime(),
          ndateent = curdate(),
	        uid = :uid,
	        nact = 3,
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

	  // вставка товаров с измененными ценами в snacpricetogood
	    try {
        $sql="INSERT INTO snacpricetogood (nid, gid, oldprice, newprice, oldcat, newcat,olddiscont,newdiscont,snact)
        select '$npriceid', lz.goodid, lz.idprice, t1.catprice, lz.idcatshop,t1.catid,lz.mdiscount,t1.catdiscont,0 
        from lzaloggood lz join (select catid, catprice,catdiscont,catstorid from stimeotsprice lt where lt.catact = 0 and lt.catstorid<>0) t1 
        on t1.catid = lz.idcatshop and (lz.gact = 4 or lz.gact = 6) and lz.gind = 0 and t1.catstorid=lz.idshop";
	      $s = $pdo->prepare($sql);
	      $s->execute();
	    }
	    catch (PDOException $e){
	      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
	      include ('../../../bd_connect/error/index.php');
	      exit();
	    }
	  // вставка товаров с измененными ценами в snacpricetogood

    // вставляем информацию в накладные по изменению цен

    // редактируем таблицу lzaloggood
    try {
      $sql="UPDATE lzaloggood lz join 
            (select catid, catprice,catstorid,catdiscont from stimeotsprice lt where lt.catact = 0 and lt.catstorid <>0) t1 
            on t1.catid = lz.idcatshop and lz.idshop = t1.catstorid
            SET 
            lz.mdiscount=t1.catdiscont,
            lz.idprice = t1.catprice
            where (lz.gact = 4 or lz.gact = 6) and gind = 0";
      $s = $pdo->prepare($sql);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
    // редактируем таблицу lzaloggood

    // редактируем таблицу sstoretodiscont
    try {
      $sql="UPDATE sstoretodiscont lz join (select catid, catprice, catdiscont, catstorid from stimeotsprice lt where lt.catact = 0 and lt.catstorid<>0) t1 
            on t1.catid = lz.catid and t1.catstorid = lz.pointid
            SET 
            lz.sprice=t1.catprice,
            lz.discont = t1.catdiscont";
      $s = $pdo->prepare($sql);
      $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../../../bd_connect/error/index.php");
      exit();
    }
  // редактируем таблицу sstoretodiscont

  // ставим в выполнено таблицу stimeotsprice
    try {
        $sql="UPDATE stimeotsprice SET
          catact = 1
          WHERE catdate = :catdate and catstorid <> 0 and catact = 0";
        $s = $pdo->prepare($sql);
        $s->bindValue(":catdate", $_SESSION['sdatecur']);
        $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
  // ставим в выполнено таблицу stimeotsprice

    // перезаписываем массив цен
    try {
      $sql = "SELECT ss.pointid, ss.catid, ss.discont, lc.cname, ss.sprice
              FROM sstoretodiscont ss, lcatshop lc
              WHERE ss.catid = lc.cid 
              ORDER BY pointid, catid";
      $result = $pdo->query($sql);
      while ($row=$result->fetch()) {
        if (isset($discont)){
          array_push($discont,array($row['pointid'],$row['catid'],$row['discont'], $row['cname'],$row['sprice']));
        }
        else{
          $discont = array(array($row['pointid'],$row['catid'],$row['discont'], $row['cname'],$row['sprice']));
        }
      }
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
      echo $e;
    }
    $rez[0] = 0;
    $rez[1] = $discont;
    $r=json_encode($rez);
    echo $r;
  }
}
?>