<?php
	if(isset($_POST['accType']) && $_POST['accType']=="customer"){
		session_start();		
		require ('../class/customer.inc');
		if(isset($_POST['name']) && isset($_POST['species']) && isset($_POST['race']) && isset($_POST['height']) && isset($_POST['weight']) && isset($_POST['birthDate']) && isset($_POST['gender'])){
			echo json_encode(unserialize($_SESSION['CUSTOMER'])->addAnimal($_POST['name'], $_POST['species'], $_POST['race'], $_POST['height'], $_POST['weight'], $_POST['birthDate'], $_POST['gender']));
		}
	}
?>