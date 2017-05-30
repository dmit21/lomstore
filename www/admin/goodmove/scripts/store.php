<?php
session_start();
    $rez[0] = $_SESSION['sstorarr'];
    $rez[1] = $_SESSION['scatarrshop'];
    include("../../../bd_connect/index.php");
    try{// массив актов
      $sql = "SELECT aid,anum,sname,sid,adate
              FROM lactmove la, lstores ls
              WHERE la.pointid = ls.sid and aact = 0
              order by sname,anum";
	  	$result = $pdo->query($sql);
  		while ($row=$result->fetch()) {
	      if (isset($aarr)){
            array_push($aarr,array($row['aid'],$row['anum'],$row['sname'],$row['sid'],$row['adate']));
    	  }
	      else{
    	    $aarr= array(array($row['aid'],$row['anum'],$row['sname'],$row['sid'],$row['adate']));
     	  }
  		}
  		$rez[2] = $aarr; 
    }
	catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include '../../../bd_connect/error/index.php';
        exit();
    }

    try{// массив товаров актов
      $sql = "SELECT lm.aid, lm.goodid, goodnum, gdisc, gweight, idcatshop, idprice,idshop, cname, sname, gsumhand, goodtic, mdiscount, gind, lm.mstore, lm.mact
              FROM lactmove la, lzaloggood lz, lmovelist lm, lcatshop lc, lstores ls
              WHERE la.aid = lm.aid and lm.goodid = lz.goodid and la.aact = 0 and lc.cid = lz.idcatshop and ls.sid = lz.idshop
              order by idshop,aid,goodnum";
	  	$result = $pdo->query($sql);
  		while ($row=$result->fetch()) {
	      if (isset($garr)){
            array_push($garr,array($row['aid'],$row['goodid'],$row['goodnum'],$row['gdisc'],$row['gweight'],$row['idcatshop'],$row['idprice'],
                                   $row['idshop'],$row['cname'],$row['sname'],$row['gsumhand'],$row['goodtic'],$row['idprice'],$row['mdiscount'], $row['gind'],
                                   $row['mstore'], $row['mact']));
    	  }
	      else{
    	    $garr= array(array($row['aid'],$row['goodid'],$row['goodnum'],$row['gdisc'],$row['gweight'],$row['idcatshop'],$row['idprice'],
                             $row['idshop'],$row['cname'],$row['sname'],$row['gsumhand'],$row['goodtic'],$row['idprice'],$row['mdiscount'], $row['gind'],
                             $row['mstore'], $row['mact']));
     	  }
  		}
  		$rez[3] = $garr; 
    }
	catch (PDOException $e){
        $error = 'Ошибка запроса к базе данных: ' . $e->getMessage();
        include '../../../bd_connect/error/index.php';
        exit();
    }
    $cat1=json_encode($rez);
    echo $cat1;
?>