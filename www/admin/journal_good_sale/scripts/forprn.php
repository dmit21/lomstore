<?php
session_start();
$_SESSION['sgoods'] = $_POST['pgoods'];
$_SESSION['svname'] = $_POST['pvname'];
?>