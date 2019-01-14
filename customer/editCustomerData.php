<?php
if(isset($_POST['password'])){
	session_start();
	require ('../class/customer.inc');
	echo json_encode(unserialize($_SESSION['CUSTOMER'])->changePassword($_POST['password']));
} else if(isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['address']) && isset($_POST['phoneNumber'])){
	session_start();		
	require ('../class/customer.inc');
	echo json_encode(unserialize($_SESSION['CUSTOMER'])->editData($_POST['firstName'],$_POST['lastName'],$_POST['address'], $_POST['phoneNumber']));
}

?>