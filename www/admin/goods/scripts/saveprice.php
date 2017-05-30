<?php
  session_start();
  $rez = $_POST['pnprice'];
  include("../../../bd_connect/index.php");

  $n = count($rez);
  for ($i=0;$i<$n;$i++){
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
  }
  echo 'Готово';
?>