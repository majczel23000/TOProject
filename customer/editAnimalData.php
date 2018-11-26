<?php
if(isset($_POST['name']) && isset($_POST['weight']) && isset($_POST['height']) && isset($_POST['animalID'])){
	session_start();		
	require ('../class/customer.inc');
	echo json_encode(unserialize($_SESSION['CUSTOMER'])->editAnimalData($_POST['name'],$_POST['weight'],$_POST['height'], $_POST['animalID']));
}

?>