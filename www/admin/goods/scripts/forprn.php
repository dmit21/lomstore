<?php
  session_start();
  $_SESSION['sprnar'] = $_POST['psid']; // массив товаров
  $_SESSION['svname']  = $_POST['pvi'];// наименование витрины
//  $_SESSION['cd']  = $_POST['pcd'];// дата формирования
?>