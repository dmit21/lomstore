<?php
session_start();
$_SESSION['senter'] = "Введите логин и пароль:";
if (isset($_SESSION['sdenied'])) {unset($_SESSION['senter']);}
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Ломбардия</title>
    <link href="font-awesome-4.6.3/css/font-awesome.min.css" rel="stylesheet">
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
  </head>
  <body>
      <form action="scripts/" method ="post">
        <p class="help-block paragraph1"><?echo $_SESSION['senter'];?></p>
        <p class="text-danger paragraph1"><?echo $_SESSION['sdenied'];?></p>
        <p class = "paragraph1">
          <label for="login">Логин:</label>
          <input name="login" type="text"  id="login" placeholder="Логин">
        </p>
        <p class = "paragraph1">
          <label for="pass">Пароль:</label>
          <input name="password" type="password" id="pass" placeholder="Пароль">
        </p>
        <button type="submit" class="btn btn-primary button1"> <i class="fa fa-sign-in"></i>ВОЙТИ</button>
      </form>
    <script src="js/jquery.js"></script>
    <script src="js/bootstrap.js"></script>
  </body>
</html>
<?
unset($_SESSION['senter']);
unset($_SESSION['sdenied']);
?>
