<?php
	if(isset($_POST['accType']) && $_POST['accType']=="customer"){
		session_start();		
		require ('../class/customer.inc');
		if(isset($_POST['name']) && isset($_POST['species']) && isset($_POST['race']) && isset($_POST['height']) && isset($_POST['weight']) && isset($_POST['birthDate'])){
			echo json_encode(unserialize($_SESSION['CUSTOMER'])->getAllAnimal());
		}
	}
?>