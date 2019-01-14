<?php
if(isset($_POST['password'])){
	session_start();		
	require ('../class/doctor.inc');
	echo json_encode(unserialize($_SESSION['DOCTOR'])->changePassword($_POST['password']));
} else if(isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['address']) && isset($_POST['phoneNumber']) && isset($_POST['academicTitle'])){
	session_start();		
	require ('../class/doctor.inc');
	$hours = Array(	"MONDAY"	=> $_POST['mondayHours'],
					"TUESDAY"	=> $_POST['tuesdayHours'],
					"WEDNESDAY"	=> $_POST['wednesdayHours'],
					"THURSDAY"	=> $_POST['thursdayHours'],
					"FRIDAY" 	=> $_POST['fridayHours'],
					"SATURDAY"	=> $_POST['saturdayHours'],
					"SUNDAY" 	=> $_POST['sundayHours']);
	echo json_encode(unserialize($_SESSION['DOCTOR'])->editData($_POST['firstName'],$_POST['lastName'],$_POST['address'], $_POST['phoneNumber'], $_POST['academicTitle'],$hours));
}

?>