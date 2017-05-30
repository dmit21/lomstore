<?php
  $goodnum = $_POST['pgoodnum'];
  include("../../../bd_connect/index.php");
  // поиск товара по штрихкоду
  try {
    $sql = "SELECT goodid, actid, goodtic, gact
            FROM lzaloggood
            WHERE goodnum = '$goodnum'";
    $result = $pdo->query($sql);
    $cs=$result->rowcount();
    $row=$result->fetch();
    $goodid = $row['goodid'];
    $actid = $row['actid'];
    $goodtic = $row['goodtic'];
    $gact = $row['gact'];
  }
  catch (PDOException $e){
    $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
    include ('../../../bd_connect/error/index.php');
    exit();
  }
  if($cs!=0){
    // поиск билета
    if (substr($goodtic,1,1)==0){
      $pnum = substr($goodtic, 0,1);// номер пункта
    }
    else{
      $pnum = substr($goodtic, 0,2);// номер пункта
    }
    $tnum = ltrim(substr($goodtic,2),'0');
    try {
      $sql = "SELECT tid, tdateopen 
              FROM lzalogticket lz, lpoint lp
              WHERE lp.pnum = '$pnum' and lz.pointid = lp.pid and lz.tnum = '$tnum'";
      $result = $pdo->query($sql);
      $row=$result->fetch();
      $tid = $row['tid'];
      $tdate = $row['tdateopen'];
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
    $rez[0][0] = $tid;
    $rez[0][1] = $goodtic;
    $rez[0][2] = $tdate;
    // поиск билета

    //акт исполнения
    try {
      $sql = "SELECT anum, pnum, adate, rdate
              FROM lactisp la, lpoint lp
              WHERE aid = '$actid' and lp.pid = la.apointid";
      $result = $pdo->query($sql);
      $row=$result->fetch();
      $anum = $row['anum'];
      $pnum = $row['pnum'];
      $adate = $row['adate'];
      $rdate = $row['rdate'];
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
    $rez[1][0] = $actid;
    $rez[1][1] = $anum;
    $rez[1][2] = $pnum;
    $rez[1][3] = $adate;
    $rez[1][4] = $rdate;
    //акт исполнения

    //перемещения
    try {
      $sql = "SELECT (select usurname from luser lu  WHERE lu.uid = lm.uid) as usn, mdate, mtime,
                     (select sname from lstores where mfrom = sid) as sfrom,
                     (select sname from lstores where mto = sid) as sto, 
                     (select nnum from lnac ln where ln.nid = lm.aid) as nacnum, 
                     lm.aid as acid,
                     lm.moveid as mid
              FROM lmovegoods lm
              WHERE gid = '$goodid'
              order by mdate,mtime";
      $result = $pdo->query($sql);
      while ($row=$result->fetch()) {
        if (isset($marr)){
          array_push($marr,array($row['usn'],$row['mdate'],$row['sfrom'],$row['sto'],$row['acid'],$row['mid'],$row['nacnum']));
        }
        else{
          $marr= array(array($row['usn'],$row['mdate'],$row['sfrom'],$row['sto'],$row['acid'],$row['mid'],$row['nacnum']));
        }
      }
    }
    catch (PDOException $e){
      $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
      include ('../../../bd_connect/error/index.php');
      exit();
    }
    $rez[2] = $marr;
    //перемещения

    $r=json_encode($rez);
    echo $r;
  }
  else{
    echo 0;
  }
?>