<?php
session_start();
  unset($_SESSION['sstorarr']);
  if (isset($_POST['login'])){ 
    $login = $_POST['login']; 
    if ($login == '') {
      unset($login);
    } 
    else{
      $login = stripslashes($login);
      $login = htmlspecialchars($login);
      $login = trim($login);
    }
  } //заносим введенный пользователем логин в переменную $login, если он пустой, то уничтожаем переменную
  if (isset($_POST['password'])){
    $password=$_POST['password']; 
    if ($password ==''){
      unset($password);
    } 
    else{
      $password = stripslashes($password);
      $password = htmlspecialchars($password);
      $password = trim($password);
    }
  }
  $_SESSION['sdatecur'] = date('Y-m-d',time());
  include("../bd_connect/index.php");
  unset($_SESSION['sstreet']);
try {
  $sql = "SELECT uid, uname, usurname, usecname, ulicence, unumlic FROM luser WHERE ulogin = '$login' AND upassword = '$password' AND uact=1";
  $result = $pdo->query($sql);
  $row = $result->fetch();
  if (!empty($row['uid'])) {
    $_SESSION['suid']=$row['uid'];
    $_SESSION['slicen']=$row['ulicence'];
    $_SESSION['snumlic']=$row['unumlic'];
    $name = $row['usurname']." ".$row['uname']." ".$row['usecname'];
    $_SESSION['suname'] = $name;
    // категории магазина
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
    // категории магазина

    // таблица руководителей
    try {
      $sql = "SELECT * FROM lruc";
      $result = $pdo->query($sql);
      $row = $result->fetch();
      $_SESSION['sruc']=$row['ruc'];
      $_SESSION['sglbuh']=$row['glbuh'];
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ("../bd_connect/error/index.php");
      exit();
    }

    // таблица руководителей

    // проверка и закрытие старых актов на продажу, по которым не было продаж
      try {
        $sql="UPDATE lsaleact lz join 
               (SELECT ls.aid FROM `lsaleact` ls left join lsaleacttogood la on ls.aid = la.aid where la.aid is null and ls.adate<:adate)
                  t1 on t1.aid = lz.aid 
                  SET 
                  lz.aact=1";
            $s = $pdo->prepare($sql);
            $s->bindValue(":adate", $_SESSION['sdatecur']);
            $s->execute();
          }
          catch (PDOException $e){
            $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
            include ("../bd_connect/error/index.php");
            exit();
          }
          // проверка и закрытие старых актов на продажу, по которым не было продаж

    switch ($_SESSION['slicen']){
      case 1:
         // список магазинов
          unset($_SESSION['sstorarr']);
          try {
             $sql = "SELECT * FROM lstores
                     ORDER BY sname";
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
                include ("../bd_connect/error/index.php");
                exit();
          }
        // список магазинов


        header('Location: http://lomstore/admin');
        exit();
      break;
 
      case 2:
        if (isset($_COOKIE['lomst_id'])) {
            $pint = $_COOKIE['lomst_id'];
            try{
              $sql = "SELECT count(*) as mc FROM lstores WHERE sid = '$pint'";
              $result = $pdo->query($sql);
              $row = $result->fetch();
              $mypointcount = $row['mc'];
            }
            catch (PDOException $e){
              $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
              include ("../bd_connect/error/index.php");
              exit();
            }
        }

        if (isset($_COOKIE['lomst_id'])and($mypointcount==1)) {
          $_SESSION['spoint'] = $_COOKIE['lomst_id'];
          try{
            $sql = "SELECT * FROM lstores WHERE sid = '$_SESSION[spoint]'";
            $result = $pdo->query($sql);
            $row = $result->fetch();
            $_SESSION['spointnum']=$row['snum'];
            $_SESSION['spointname']=$row['sname'];
            $_SESSION['spointadress']=$row['sadress'];
            $_SESSION['spointphone'] = $row['sphone'];
          }
          catch (PDOException $e){
            $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
            include ("../bd_connect/error/index.php");
            exit();
          }

          // запланированное изменение цен на товары
          try{
            $sql = "SELECT * FROM stimechangeprice WHERE storeid = '$_SESSION[spoint]' AND datechange>= '$_SESSION[sdatecur]'";
            $result = $pdo->query($sql);
            while ($row=$result->fetch()) {
              $op = $row['oldprice'];
              $np = $row['newprice'];
              $vit = $_SESSION['spoint'];
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
              //вставка товаров с измененной ценой в snacpricetogood
              try{
                $sql="INSERT INTO `snacpricetogood`(`nid`, `gid`, `oldprice`, `newprice`)
                      select '$npriceid',goodid, '$op','$np' from lzaloggood where idprice = '$op' and idshop = '$vit' and (gact = 3 OR gact = 4 OR gact = 6)";
                $s = $pdo->prepare($sql);
                $s->execute();
              }
              catch (PDOException $e){
                $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
                include ("../../../bd_connect/error/index.php");
                exit();
              }
              //вставка товаров с измененной ценой в snacpricetogood
              // изменения цен в табл lzaloggood
              try {
                $sql="UPDATE lzaloggood SET 
                  idprice = :newprice
                  WHERE idshop = :idshop and idprice = :oldprice and (gact = 3 OR gact = 4 OR gact = 6)";
                $s = $pdo->prepare($sql);
                $s->bindValue(":idshop", $vit);
                $s->bindValue(":oldprice", $op);
                $s->bindValue(":newprice", $np);
                $s->execute();
              }
              catch (PDOException $e){
                $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
                include ("../../../bd_connect/error/index.php");
                exit();
              }
              // запланированное изменение цен на товары
            }
          }
          catch (PDOException $e){
            $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
            include ("../bd_connect/error/index.php");
            exit();
          }
          // запланированное изменение цен на товары

   
            // список товаров проданных за текущую дату
          try {
            $sql = "SELECT * FROM lsaleact where adate = '$_SESSION[sdatecur]' and pointid = '$_SESSION[spoint]'";
            $result = $pdo->query($sql);
            $cs=$result->rowcount(); //количество строк вернутых запросом SELECT
            if ($cs==0){
              try {
                $sql = "SELECT max(anum) as an FROM lsaleact where pointid = '$_SESSION[spoint]'";
                $result = $pdo->query($sql);
                $row = $result->fetch();
                if ($row['an']==0){
                  $an = 1;
                }
                else{
                  $an = $row['an']+1;
                }
              }
              catch (PDOException $e){
                $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
                include ("../bd_connect/error/index.php");
                exit();
              }
              try{
                $sql="INSERT INTO lsaleact SET 
                      adate=:adate,
                      uid=:uid,
                      pointid =:pointid, 
                      anum=:anum";
                $s = $pdo->prepare($sql);
                $s->bindValue(":adate", $_SESSION['sdatecur']);
                $s->bindValue(":pointid", $_SESSION['spoint']);
                $s->bindValue(":uid", $_SESSION['suid']);             
                $s->bindValue(":anum", $an);             
                $s->execute();
                $aid=$pdo->lastInsertId();
                $_SESSION['ssaleact'] = $aid;
              }
              catch (PDOException $e){
                $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
                include ("../bd_connect/error/index.php");
                exit();
              }
            }
            else{
              $row = $result->fetch();
              $_SESSION['ssaleact'] = $row['aid'];
            }
          }
          catch (PDOException $e){
            $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
            include ("../bd_connect/error/index.php");
            exit();
          }
          // проверка и закрытие старых актов на продажу, по которым не было продаж
          try {
            $sql="UPDATE lsaleact lz join 
                  (SELECT ls.aid FROM `lsaleact` ls left join lsaleacttogood la on ls.aid = la.aid where la.aid is null and ls.adate<:adate and ls.pointid = :pointid)
                  t1 on t1.aid = lz.aid 
                  SET 
                  lz.aact=1";
            $s = $pdo->prepare($sql);
            $s->bindValue(":adate", $_SESSION['sdatecur']);
            $s->bindValue(":pointid", $_SESSION['spoint']);
            $s->execute();
          }
          catch (PDOException $e){
            $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
            include ("../bd_connect/error/index.php");
            exit();
          }
          // проверка и закрытие старых актов на продажу, по которым не было продаж

          // проверка и формирования остатков
          try {
            $sql = "SELECT osum FROM sostatok WHERE oact=0 AND odate='$_SESSION[sdatecur]' AND pointid='$_SESSION[spoint]'";
            $result = $pdo->query($sql);
            $count = $result->rowcount();
            $row = $result->fetch();
            if ($count==0) {
              try {
                $sql = "SELECT osum, odate FROM sostatok WHERE oact=1 AND odate<'$_SESSION[sdatecur]' AND pointid='$_SESSION[spoint]' ORDER BY odate DESC LIMIT 1";
                $result = $pdo->query($sql);
                $count1 = $result->rowcount();
                $row = $result->fetch();
                if ($count1==0) {
                  $_SESSION['sosum']=0;
                }
                else{
                  $_SESSION['sosum']=$row['osum'];
                }
                try{
                  $sql="INSERT INTO sostatok SET
                  pointid=:pointid,
                  uid=:uid,odate=:odate,
                  otime=curtime(),
                  osum=:osum,
                  oact=:oact";
                  $s = $pdo->prepare($sql);
                  $s->bindValue(":pointid", $_SESSION['spoint']);
                  $s->bindValue(":odate", $_SESSION['sdatecur']);
                  $s->bindValue(":uid", $_SESSION['suid']);
                  $s->bindValue(":osum", $_SESSION['sosum']);
                  $s->bindValue(":oact", 0);
                  $s->execute();
                  $sql="INSERT INTO sostatok SET
                    pointid=:pointid,
                    uid=:uid,odate=:odate,
                    otime=curtime(),
                    osum=:osum,
                    oact=:oact";
                    $s = $pdo->prepare($sql);
                    $s->bindValue(":pointid", $_SESSION['spoint']);
                    $s->bindValue(":odate", $_SESSION['sdatecur']);
                    $s->bindValue(":uid", $_SESSION['suid']);
                    $s->bindValue(":osum", $_SESSION['sosum']);
                    $s->bindValue(":oact", 1);
                    $s->execute();
                }
                catch (PDOException $e){
                  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
                  include ("../bd_connect/error/index.php");
                  exit();
                }
              }
              catch (PDOException $e){
                $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
                include ("../bd_connect/error/index.php");
                exit();
              }
            }
            else {
              $_SESSION['sosum']=$row['osum'];
            }
          }
          catch (PDOException $e){
            $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
            include ("../bd_connect/error/index.php");
            exit();
          }
          // проверка и формирования остатков
          header('Location: http://lomstore/user');
          exit();
        }
        else {
          $_SESSION['sdenied']="Компьютер не зарегистрирован!";
          header('Location: http://lomstore/');
          exit();
        }
      break;  
    }
  }
  else{
    $_SESSION['sdenied']="Вы ввели неверный логин или пароль!";
    header('Location: http://lomstore/');
    exit();
  }
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ("../bd_connect/error/index.php");
  exit();
}
?>