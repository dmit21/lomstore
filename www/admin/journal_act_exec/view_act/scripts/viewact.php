<?php
  session_start();
  $rez[0] = $_SESSION['sactid'];
  $rez[1] = $_SESSION['sactnum'];
  $rez[2] = $_SESSION['sactdate'];
  $rez[3] = $_SESSION['starr'];

  $cat=json_encode($rez);
  echo $cat;
?>