<?php
	if(isset($_POST['accType']) && $_POST['accType']=="customer"){
		session_start();		
		require ('../class/customer.inc');
		if($_POST['returnVal'] == "fullData"){
			echo json_encode(unserialize($_SESSION['CUSTOMER'])->getAllAnimal());
		} else if(isset($_POST['animalID']) && $_POST['returnVal'] == "detailsData"){
            echo json_encode(unserialize($_SESSION['CUSTOMER'])->getAnimalDetails($_POST['animalID']));
        } else if(isset($_POST['phrase']) && $_POST['returnVal'] == "limitedData"){
            echo json_encode(unserialize($_SESSION['CUSTOMER'])->getAnimalsWithPhrase($_POST['phrase']));
        }
	}
?>