<?php  
session_start();
$db = $_POST['pdb'];
$de = $_POST['pde'];
include("../../../bd_connect/index.php");
try {
  $sql = "SELECT lg.goodnum, lg.gdisc, sp.ndate, sg.oldprice, sg.newprice, lu.usurname
          FROM snacprice sp, snacpricetogood sg, luser lu, lzaloggood lg
          WHERE sp.ndate BETWEEN '$db' AND '$de' and sp.nact = 1 and sp.uid = lu.uid and sp.nid = sg.nid and sg.gid = lg.goodid";
  $result = $pdo->query($sql);
    while ($row=$result->fetch()) {
      if (isset($goodarr)){
        array_push($goodarr,array($row['goodnum'],$row['gdisc'],$row['ndate'],$row['oldprice'],$row['newprice'],$row['usurname']));
      }
      else{
        $goodarr= array(array($row['goodnum'],$row['gdisc'],$row['ndate'],$row['oldprice'],$row['newprice'],$row['usurname']));
      }
    }
}
catch (PDOException $e){
  $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
  include ('../../../bd_connect/error/index.php');
  exit();
}
$r=json_encode($goodarr);
echo $r;
?>
