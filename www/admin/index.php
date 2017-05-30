<?php
session_start();
if (isset($_SESSION['slicen']) AND $_SESSION['slicen']==1 ) {
unset($_SESSION['smess']);
unset($_SESSION['sp_id']); 
unset($_SESSION['sp_num']);
unset($_SESSION['sp_adress']);
unset($_SESSION['sp_phone']);
unset($_SESSION['sparr']);
unset($_SESSION['sprice']);
unset($_SESSION['su_id']); 
unset($_SESSION['su_name']);
unset($_SESSION['su_surname']);
unset($_SESSION['su_secname']);
unset($_SESSION['su_login']);
unset($_SESSION['su_password']);
unset($_SESSION['su_licence']);
unset($_SESSION['su_doc']);
unset($_SESSION['su_whogive']);
unset($_SESSION['su_numdoc']);
unset($_SESSION['su_adress']);
unset($_SESSION['su_phone']);
unset($_SESSION['suarr']);
unset($_SESSION['sc_id']); 
unset($_SESSION['sc_name']);
unset($_SESSION['scarr']);
unset($_SESSION['sa_id']); 
unset($_SESSION['sa_name']);
unset($_SESSION['sa_surname']);
unset($_SESSION['sa_secname']);
unset($_SESSION['sa_login']);
unset($_SESSION['sa_licence']);
unset($_SESSION['sa_doc']);
unset($_SESSION['sa_whogive']);
unset($_SESSION['sa_numdoc']);
unset($_SESSION['sa_adress']);
unset($_SESSION['sa_phone']);
unset($_SESSION['sa_password']);
unset($_SESSION['saarr']);
unset($_SESSION['sosumday']);
unset($_SESSION['sgappcom']);
unset($_SESSION['scashrepcom']);
unset($_SESSION['sosumcom']);
unset($_SESSION['sj_general']);
unset($_SESSION['scl_general']);
unset($_SESSION['sp']);
unset($_SESSION['st']);
unset($_SESSION['ssel']);
unset($_SESSION['smm']);
unset($_SESSION['smy_ans']);
unset($_SESSION['spriznak']);
unset($_SESSION['snnum']);
unset($_SESSION['sndate']);
$_SESSION['sfr']=0;
}
else {
  header('Location: http://lomstore/');
  exit();
}
?>
<html>
  <head>
    <title>Ломбардия</title>
    <link href="../css/bootstrap.css" rel="stylesheet">
    <script src="../js/jquery.js"></script>
    <script src="../js/bootstrap.js"></script>
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
            <span class="navbar-brand" href="#"><?echo "Администратор ".$_SESSION['suname'];?></span>
        </div>
        <div class="collapse navbar-collapse" id="responsive-menu">
            <ul class="nav navbar-nav">
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Справочники<b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li><a href="http://lomstore/admin/add_edit_stores/">Справочник витрин</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/cat_change_price/">Ввод цен по категориям</a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Работа<b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li><a href="http://lomstore/admin/goods/">Инвентаризация</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/change_price/">Корректировка цен</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/goodmove/">Передача товара</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/goods_sale/">Продажи</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/store/">Разукомплектация</a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Журналы<b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li><a href="http://lomstore/admin/journal_act_exec/">Журнал актов на исполнение</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/journal_invent/">Журнал инвентаризации</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/journal_story_good/">Журнал истории залогового имущества</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/journal_change_price/">Журнал корректировки цен за период</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/journal_move/">Журнал перемещений</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/journal_nac_sale/">Журнал продаж по накладным</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/journal_good_sale/">Журнал продаж по товарам</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/journal_act_raz/">Журнал разукомплектации</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/journal_cur_sale/">Журнал текущих продаж</a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Отчеты<b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li><a href="http://lomstore/admin/admin_expense_report/">Авансовый отчет</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/sale_report/">Отчет по продажам</a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Оптовики<b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li><a href="http://lomstore/admin/opt_report">Авансовый отчет</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/admin_goods_sale/">Продажи</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/opt_order/">Расходный кассовый ордер</a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Разное<b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li><a href="http://lomstore/admin/admin_goods_sale/">Продажи</a></li>
                  <li class="divider"></li>
                  <li><a href="http://lomstore/admin/save_db/">Резервное копирование БД</a></li>
                </ul>
              </li>
        </div>
      </div>
    </div>
  </body>
</html>

