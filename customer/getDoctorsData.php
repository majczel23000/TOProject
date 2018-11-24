<?php
	if(isset($_POST['accType']) && $_POST['accType']=="customer"){
		session_start();		
		require ('../class/customer.inc');
		if($_POST['returnVal'] == "fullData"){
			echo json_encode(unserialize($_SESSION['CUSTOMER'])->getAllDoctors());
		} else if(isset($_POST['email']) && $_POST['returnVal'] == "detailsData"){
            echo json_encode(unserialize($_SESSION['CUSTOMER'])->getDoctorDetails($_POST['email']));
        } else if(isset($_POST['phrase']) && $_POST['returnVal'] == "limitedData"){
            echo json_encode(unserialize($_SESSION['CUSTOMER'])->getDoctorsWithPhrase($_POST['phrase']));
        }
	}
?>