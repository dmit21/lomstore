<?php
  session_start();
  $rez = $_POST['pnprice'];
  $n = count($rez);
  include("../../../bd_connect/index.php");
  // делаем накладную на изменение цен
    try {
      $sql="INSERT INTO snacprice SET
        ndate = :mdate,
        ntime = curtime(),
        uid = :uid,
        nact = 1";
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

  for($i=0;$i<$n;$i++){
    try{ // поменяли на новую цену за грамм
      $sql="UPDATE lzaloggood SET 
            idprice=:idprice
            WHERE
            goodid = :goodid";
            $s = $pdo->prepare($sql);
            $s->bindValue(":goodid", $rez[$i][0]);
            $s->bindValue(":idprice", $rez[$i][1]);
            $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include '../../../bd_connect/error/index.php';
      exit();
    }

    try{ // вставили фискалку
      $sql="INSERT INTO lcorpricegood SET 
            gid=:gid,
            uid = :uid,
            priceold = :priceold,
            pricenew = :pricenew,
            cdate = :cdate,
            ctime = curtime()";
            $s = $pdo->prepare($sql);
            $s->bindValue(":gid", $rez[$i][0]);
            $s->bindValue(":uid", $_SESSION['suid']);
            $s->bindValue(":priceold", $rez[$i][2]);
            $s->bindValue(":pricenew", $rez[$i][1]);
            $s->bindValue(":cdate", $_SESSION['sdatecur']);
            $s->execute();
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include '../../../bd_connect/error/index.php';
      exit();
    }
        try {
          $sql="INSERT INTO snacpricetogood SET
          nid = :nid,
          gid = :gid,
          oldprice = :oldprice,
          newprice = :newprice,
          oldcat = :oldcat,
          newcat = :newcat";
          $s = $pdo->prepare($sql);
          $s->bindValue(":gid", $rez[$i][0]);
          $s->bindValue(":nid", $npriceid);
          $s->bindValue(":oldprice", $rez[$i][2]);
          $s->bindValue(":newprice", $rez[$i][1]);
          $s->bindValue(":oldcat", $rez[$i][3]);
          $s->bindValue(":newcat", $rez[$i][3]);
          $s->execute();
        }
        catch (PDOException $e){
          $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
          include ('../../../bd_connect/error/index.php');
          exit();
        }
  }
?>