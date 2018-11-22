<?php
if(isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['address']) && isset($_POST['phoneNumber']) && isset($_POST['academicTitle'])){
	session_start();		
	require ('../class/doctor.inc');
	echo json_encode(unserialize($_SESSION['DOCTOR'])->editData($_POST['firstName'],$_POST['lastName'],$_POST['address'], $_POST['phoneNumber'], $_POST['academicTitle']));
}

?>