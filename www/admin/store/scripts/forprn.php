<?php
  session_start();
  $_SESSION['sractid'] = $_POST['pactid']; // акт
  $_SESSION['srvitid']  = $_POST['pvitid'];// витрина
?>