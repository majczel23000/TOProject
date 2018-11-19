<?php
	session_start();
	require("../class/doctor.inc");
	require("../class/doctorPage.inc");

	$profile = new DoctorPage("Profil",unserialize($_SESSION['DOCTOR']));
	$profile->showPage();
?>