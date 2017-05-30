<?php
  session_start();
  $vitnum = $_POST['pvitnum'];
  $goodid = $_POST['pgoodid'];
  $gind = $_POST['pgind'];
  $actid = $_POST['pactid'];
  include("../../../bd_connect/index.php");

  // определяем новую цену за грамм и новую скидку для товара, которая соответствует магазину, куда товар отправляют.
  if($gind==0){// значит цена и скидка на товар зависит от пункта
    try{// определяем цену и скидку для выбранной витрины
      $sql = "SELECT sprice, discont
              FROM lzaloggood lz, sstoretodiscont ss
              WHERE lz.goodid = '$goodid' and ss.catid = lz.idcatshop and ss.pointid = '$vitnum'";
      $result = $pdo->query($sql);
      $row=$result->fetch();
      $rez[0] = $row['sprice'];
      $rez[1] = $row['discont'];
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
  }
  else{
    $rez[0] = 0;
    $rez[1] = 0;
  }
  // определяем новую цену за грамм и новую скидку для товара, которая соответствует магазину, куда товар отправляют.

  try{ // проставляем в lMoveList в какой магазин пойдет товар
    $sql="UPDATE lmovelist SET 
          mstore=:mstore
          WHERE
          aid = :aid and goodid = :goodid";
          $s = $pdo->prepare($sql);
          $s->bindValue(":mstore", $vitnum);
          $s->bindValue(":goodid", $goodid);
          $s->bindValue(":aid", $actid);
          $s->execute();
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  $cat1=json_encode($rez);
  echo $cat1;
?>