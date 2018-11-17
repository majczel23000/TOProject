<?php
	session_start();
	require("../class/customer.inc");
	if (!(isset($_SESSION['CUSTOMER'])) || !unserialize($_SESSION['CUSTOMER'])->checkIsLogged()){			//jesli nie zalogował sie to go wyrzucamy
		header('Location: ../login.php');
		exit();
	}
	$customer = unserialize($_SESSION['CUSTOMER']);
	echo $customer;
	echo '<a href="../logout.php">Wyloguj się</a><br>';
?>