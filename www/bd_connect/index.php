<?php
try
{
  $pdo = new PDO('mysql:host=localhost;dbname=lombardiya', 'alexsandr', '1234');
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->exec('SET NAMES "utf8"');
}
catch (PDOException $e)
{
  $output = 'Невозможно подключиться к серверу баз данных.';
  echo $output;
//  include 'output.html.php';
//  exit();
}

