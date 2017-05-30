<?php
  session_start();
  unset($_SESSION['sgoodarr']);
  $actid = $_POST['pactid'];
  $acpr  = $_POST['pacpr'];
  include("../../../bd_connect/index.php");
  switch ($acpr) {
    case 0: try{// акт создан, первый раз на разукомплектации
      $sql = "SELECT tnum, lg.goodid as gi, lg.gdisc as gd, catname, lt.weight as gw, lt.goodnum, lp.pnum, lz.tid, lt.sumhand, lu.usurname, lu.uname, lu.usecname, lu.uid
              FROM lacttoticket la, ltickettogood lt, lzaloggood lg, lcat lc, lzalogticket lz, lpoint lp, luser lu
              WHERE  aid = '$actid' and la.tid = lt.tid and lg.goodid = lt.goodid and lc.catid = lt.catid 
                     and lz.tid = lt.tid and lz.pointid = lp.pid and lz.uid = lu.uid
              ORDER BY lp.pnum, tnum, lt.goodnum";
      $result = $pdo->query($sql);
      $n = 0;
      while ($row=$result->fetch()) {
        $a=strlen($row['pnum']);//длина номера пункта
        $b=strlen($row['goodnum']);//длина номера товара
        $c=12-$a-$b;//рассчитываем количество недостающих символов
        $num=$row['pnum'].str_repeat("0", $c).$row['goodnum'];//определили номер товара (штрих-код)
        $b=strlen($row['tnum']);//длина номера билета
        $c=8-$a-$b;//рассчитываем количество недостающих символов
        $numt=$row['pnum'].str_repeat("0", $c).$row['tnum'];//определили еомер , билета
        if (isset($sgoodarr)){
          array_push($sgoodarr,array($row['gi'],$num,$numt,$row['gd'],$row['catname'],$row['gw'],0,1,$row['sumhand'],$row['usurname']." ".$row['uname']." ".$row['usecname'],
            $row['uid'],0));
        }
        else{
          $sgoodarr= array(array($row['gi'],$num,$numt,$row['gd'],$row['catname'],$row['gw'],0,1,$row['sumhand'],$row['usurname']." ".$row['uname']." ".$row['usecname'],
            $row['uid'],0));
        }
        $n = $n+1;
      }

      for($i=0;$i<$n;$i++){
        try {
          $sql="UPDATE lzaloggood SET
          actid = :actid,
          idprice = 0,
          idshop = 0,
          goodnum = :goodnum,
          goodtic = :goodtic,
          gsumhand = :gsumhand,
          gact = 3,
          idcatshop = 0,
          mdiscount = 0
          WHERE goodid = :goodid";
          $s = $pdo->prepare($sql);
          $s->bindValue(":goodid", $sgoodarr[$i][0]);
          $s->bindValue(":goodnum", $sgoodarr[$i][1]);
          $s->bindValue(":goodtic", $sgoodarr[$i][2]);
          $s->bindValue(":actid", $actid);
          $s->bindValue(":gsumhand", $sgoodarr[$i][8]);
          $s->execute();
        }
        catch (PDOException $e){
          $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
          include ('../../../bd_connect/error/index.php');
          exit();
        }
      }
      try {
        $sql="UPDATE lactisp SET
        aact = :aact,
        ruid = :ruid,
        rdate = curdate(),
        rtime = curtime()
        WHERE
        aid = :aid";
        $s = $pdo->prepare($sql);
        $s->bindValue(":aact", 3);
        $s->bindValue(":aid", $actid);
        $s->bindValue(":ruid", $_SESSION['suid']);
        $s->execute();
      }
      catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include ('../../../bd_connect/error/index.php');
        exit();
      }

      $cat=json_encode($sgoodarr);
      echo $cat;
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include '../../../bd_connect/error.html.php';
      exit();
    }
    break;

    case 3: try{// разукомплектация сохраненного акта. Т.е продолжение работы над актом
      $sql = "SELECT ls.goodid, ls.goodnum, ls.goodtic, gdisc, lc.catname, gweight, idcatshop, idshop, gsumhand, lu.usurname, lu.uname, lu.usecname, mdiscount
              FROM lzaloggood ls, luser lu, lcat lc
              WHERE  ls.actid = '$actid' and ls.uid = lu.uid and ls.catid = lc.catid
              ORDER BY ls.goodtic,ls.goodnum";
      $result = $pdo->query($sql);
      while ($row=$result->fetch()) {
        if (isset($sgoodarr)){
          array_push($sgoodarr,array($row['goodid'],$row['goodnum'],$row['goodtic'],$row['gdisc'],$row['catname'],$row['gweight'],$row['idcatshop'],$row['idshop'],
                                                $row['gsumhand'],$row['usurname']." ".$row['uname']." ".$row['usecname'],$row['uid'],0, $row['mdiscount']));
        }
        else{
          $sgoodarr= array(array($row['goodid'],$row['goodnum'],$row['goodtic'],$row['gdisc'],$row['catname'],$row['gweight'],$row['idcatshop'],$row['idshop'],
                                            $row['gsumhand'],$row['usurname']." ".$row['uname']." ".$row['usecname'],$row['uid'],0, $row['mdiscount']));
        }
      }
      $cat=json_encode($sgoodarr);
      echo $cat;
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include '../../../bd_connect/error.html.php';
      exit();
    }
    break;

    case 4: try{ // разукомплектованный акт
      $sql = "SELECT ls.goodid, ls.goodnum, ls.goodtic, gdisc, lc.catname, gweight, idcatshop, idshop, gsumhand, lu.usurname, lu.uname, lu.usecname
              FROM lzaloggood ls, luser lu, lcat lc
              WHERE  ls.actid = '$actid' and ls.uid = lu.uid and ls.catid = lc.catid
              ORDER BY ls.goodtic,ls.goodnum";
      $result = $pdo->query($sql);
      while ($row=$result->fetch()) {
        if (isset($sgoodarr)){
          array_push($sgoodarr,array($row['goodid'],$row['goodnum'],$row['goodtic'],$row['gdisc'],$row['catname'],$row['gweight'],$row['idcatshop'],$row['idshop'],
                                                $row['gsumhand'],$row['usurname']." ".$row['uname']." ".$row['usecname'],$row['uid'],0));
        }
        else{
          $sgoodarr= array(array($row['goodid'],$row['goodnum'],$row['goodtic'],$row['gdisc'],$row['catname'],$row['gweight'],$row['idcatshop'],$row['idshop'],
                                            $row['gsumhand'],$row['usurname']." ".$row['uname']." ".$row['usecname'],$row['uid'],0));
        }
      }
      $cat=json_encode($sgoodarr);
      echo $cat;
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include '../../../bd_connect/error.html.php';
      exit();
    }
    break;
  }
  /*
для обновления таблицы lzaloggood на сайте
*/
?>

