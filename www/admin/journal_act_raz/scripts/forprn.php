<?php
  session_start();
  $_SESSION['sprnar'] = $_POST['pnid']; // id накладной
  $_SESSION['snnum'] = $_POST['ppid']; // id пункта
?>