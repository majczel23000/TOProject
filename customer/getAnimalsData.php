<?php
	if(isset($_POST['accType']) && $_POST['accType']=="customer"){
		session_start();		
		require ('../class/customer.inc');
		if($_POST['returnVal'] == "fullData"){
			echo json_encode(unserialize($_SESSION['CUSTOMER'])->getAllAnimal());
		} else if(isset($_POST['animalID']) && $_POST['returnVal'] == "detailsData"){
            echo json_encode(unserialize($_SESSION['CUSTOMER'])->getAnimalDetails($_POST['animalID']));
        } else if($_POST['returnVal'] == "speciesData"){
            echo json_encode(unserialize($_SESSION['CUSTOMER'])->getAnimalsSpecies());
        } else if(isset($_POST['ANI_SPE_ID']) && $_POST['returnVal'] == "racesData"){
            echo json_encode(unserialize($_SESSION['CUSTOMER'])->getAnimalsRaces($_POST['ANI_SPE_ID']));
        } else if($_POST['returnVal'] == "stats"){
            echo json_encode(unserialize($_SESSION['CUSTOMER'])->getAnimalStats());
        }
	}
?>