<?php
	session_start();
	require("../class/doctor.inc");
	if (!(isset($_SESSION['DOCTOR'])) || !unserialize($_SESSION['DOCTOR'])->checkIsLogged()){			//jesli nie zalogował sie to go wyrzucamy
		header('Location: ../login.php');
		exit();
	}
	$doctor = unserialize($_SESSION['DOCTOR']);
	echo $doctor;
	echo '<a href="../logout.php">Wyloguj się</a><br>';
?>