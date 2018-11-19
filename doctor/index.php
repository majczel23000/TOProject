<?php
	session_start();
	require("../class/doctor.inc");
	require("../class/doctorPage.inc");
	if (!(isset($_SESSION['DOCTOR'])) || !unserialize($_SESSION['DOCTOR'])->checkIsLogged()){			//jesli nie zalogował sie to go wyrzucamy
		header('Location: ../login.php');
		exit();
	}

	$profile = new DoctorPage("Profil",unserialize($_SESSION['DOCTOR']));
	$profile->showPage();
?>