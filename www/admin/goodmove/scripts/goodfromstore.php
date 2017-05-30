<?php
  session_start();
  unset($_SESSION['sgoodarr']);
  $num = $_POST['pnum'];
  include("../../../bd_connect/index.php");

  try {
    if($num=='100000'){
      $sql = "SELECT goodnum, gdisc, gweight, idprice, sname, goodid, idshopnew  
              FROM lzaloggood lz, lstores ls
              WHERE lz.idshop = ls.sid and gact = 6
              order by sname,gdisc";
    }
    else{
      $sql = "SELECT goodnum, gdisc, gweight, idprice, sname, goodid, idshopnew
              FROM lzaloggood lz, lstores ls
              WHERE lz.idshop = ls.sid and lz.idshop = '$num' and gact = 6
              order by sname,gdisc";
    }
  	$result = $pdo->query($sql);
  	while ($row=$result->fetch()) {
     if (isset($_SESSION['sgoodarr'])){
         array_push($_SESSION['sgoodarr'],array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['idprice'],$row['gweight'],$row['sname'],$row['idshopnew']));
     }
     else{
         $_SESSION['sgoodarr']= array(array($row['goodid'],$row['gdisc'],$row['goodnum'],$row['idprice'],$row['gweight'],$row['sname'],$row['idshopnew']));
     }
    }
    $cat=json_encode($_SESSION['sgoodarr']);
    echo $cat;
  }
  catch (PDOException $e){
                $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
                (include '../../../bd_connect/error/index.php');
                exit();
  }


?>