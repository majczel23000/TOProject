<?php
	session_start();
	require("../class/customer.inc");
	require("../class/customerPage.inc");
	if (!(isset($_SESSION['CUSTOMER'])) || !unserialize($_SESSION['CUSTOMER'])->checkIsLogged()){			//jesli nie zalogował sie to go wyrzucamy
		header('Location: ../login.php');
		exit();
	}

	$profile = new CustomerPage("Profil",unserialize($_SESSION['CUSTOMER']));
	$profile->showPage();
?>