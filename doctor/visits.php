<?php
	session_start();
	require("../class/doctorPage.inc");
	require("../class/doctor.inc");
	$visits = new DoctorPage("Wizity",unserialize($_SESSION['DOCTOR']));
	$visits->showPage();
?>