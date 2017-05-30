<?php
session_start();
if (isset($_SESSION['slicen']) AND $_SESSION['slicen']==2 ) {
  $name = $_SESSION['suname'];
  $_SESSION['sfp'] = 0;
  $_SESSION['sfr']=0;
}
else {
  header('Location: http://lomstore/');
  exit();
}
unset($_SESSION['ssumsale']);
unset($_SESSION['sosumday']);
unset($_SESSION['ssumprih']);
unset($_SESSION['ssumras']);
unset($_SESSION['sosumend']);
?>
<html>
  <head>
    <title>Ломбардия</title>
    <link href="../css/bootstrap.css" rel="stylesheet">
    <script src="../js/jquery.js"></script>
    <script src="../js/bootstrap.js"></script>
    <script src="../js/close.js"></script>
  </head>
  <body>
    <div class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#responsive-menu">
            <span class="sr-only">Открыть навигацию</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <span class="navbar-brand" href="#"><?echo " Витрина №".$_SESSION['spointnum']." эксперт-оценщик ".$name;?></span>
        </div>
        <div class="collapse navbar-collapse" id="responsive-menu">
          <ul class="nav navbar-nav">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Операции<b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li><a href="http://lomstore/user/inventory">Инвентаризация</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/user/good_trans">Передача</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/user/enter_order_new">Приходный кассовый ордер</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/user/store_sell">Продажа</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/user/expense_order_new">Расходный кассовый ордер</a></li>
                </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Журналы<b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="http://lomstore/user/journal_invent">Журнал инвентаризации</a></li>
                <li class="divider"></li>
                <li><a href="http://lomstore/user/journal_move">Журнал перемещений</a></li>
                <li class="divider"></li>
                <li><a href="http://lomstore/user/journal_nac_sale">Журнал продаж</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Отчеты<b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="http://lomstore/user/expense_report">Авансовый отчет</a></li>
              </ul>
            </li>
        </div>
      </div>
    </div>
  </body>
</html>
