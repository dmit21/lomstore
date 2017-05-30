<?php
  session_start();
  include("../../../bd_connect/index.php");
  $idnum  = $_POST['pidnum'];
  $added  = $_POST['padded'];
  $snum   = $_POST['psnum'];
  $sname  = $_POST['psname'];
  $sadress = $_POST['psadres'];
  $sphone = $_POST['psphone'];
  switch ($added) {
  	case '1': // добавление
      try{
        $sql="INSERT INTO lstores SET 
          snum=:snum,
          sname=:sname,
          sadress=:sadress, 
          sphone = :sphone";
          $s = $pdo->prepare($sql);
          $s->bindValue(":snum", $snum);
          $s->bindValue(":sname", $sname);
          $s->bindValue(":sadress", $sadress);
          $s->bindValue(":sphone", $sphone);
          $s->execute();
      }
      catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ("../../../bd_connect/error/index.php");
        exit();
      }
  		break;
  	case '2': // редактирование
	  try {
      	$sql="UPDATE lstores SET 
          snum=:snum,
          sname=:sname,
          sadress=:sadress, 
          sphone = :sphone
          WHERE
          sid = :sid";
          $s = $pdo->prepare($sql);
          $s->bindValue(":sid", $idnum);
          $s->bindValue(":snum", $snum);
          $s->bindValue(":sname", $sname);
          $s->bindValue(":sadress", $sadress);
          $s->bindValue(":sphone", $sphone);
          $s->execute();
  	  }
  	  catch (PDOException $e){
  	  	$error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  	  	include ("../../../bd_connect/error/index.php");
  	  	exit();
  	  }
  		break;
  }

  unset($_SESSION['sstorarr']);

  // список магазинов
  try {
  	$sql = "SELECT * FROM lstores
            ORDER BY sid";
    $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($_SESSION['sstorarr'])){
      	array_push($_SESSION['sstorarr'],array($row['sid'],$row['snum'],$row['sname'],$row['sadress'],$row['sphone']));
      }
      else{
      	$_SESSION['sstorarr']= array(array($row['sid'],$row['snum'],$row['sname'],$row['sadress'],$row['sphone']));
      }
    }
  }
  catch (PDOException $e){
  	$error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  	include '../bd_connect/error.html.php';
  	exit();
  }
        // список магазинов
  $store=json_encode($_SESSION['sstorarr']);
  echo $store;
?>