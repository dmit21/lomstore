<?php
  session_start();
  unset($_SESSION['sgoodarr']);
  $nid = $_POST['pactid'];
  include("../../../bd_connect/index.php");
  try{
  $sql = "SELECT ls.goodid, ls.goodnum, ls.goodtic, gdisc, lc.catname, gweight, idcatshop, mto, gsumhand, lu.usurname, lu.uname, lu.usecname, ls.idprice, ln.gsum
          FROM lzaloggood ls, luser lu, lcat lc, lmovegoods lm, lnactogood ln
          WHERE lm.aid = '$nid' and lm.gid = ls.goodid and ls.uid = lu.uid and ls.catid = lc.catid and ln.nid = lm.aid and ln.goodid = lm.gid
          ORDER BY ls.goodtic,ls.goodnum";
  $result = $pdo->query($sql);
  while ($row=$result->fetch()) {
    if (isset($_SESSION['sgoodarr'])){
      array_push($_SESSION['sgoodarr'],array($row['goodid'],$row['goodnum'],$row['goodtic'],$row['gdisc'],$row['catname'],$row['gweight'],$row['idcatshop'],$row['mto'],
                                            $row['gsumhand'],$row['usurname']." ".$row['uname']." ".$row['usecname'],$row['uid'],$row['idprice'], $row['gsum']));
    }
    else{
      $_SESSION['sgoodarr']= array(array($row['goodid'],$row['goodnum'],$row['goodtic'],$row['gdisc'],$row['catname'],$row['gweight'],$row['idcatshop'],$row['mto'],
                                        $row['gsumhand'],$row['usurname']." ".$row['uname']." ".$row['usecname'],$row['uid'],$row['idprice'], $row['gsum']));
    }
  }
  $cat=json_encode($_SESSION['sgoodarr']);
  echo $cat;
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}
?>

