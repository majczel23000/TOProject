<?php
	if(isset($_POST['accType']) && $_POST['accType']=="doctor"){
		session_start();		
		require ('../class/doctor.inc');
		if($_POST['returnVal'] == "fullData"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->getAllCustomers());						//zwracamy tabele
		}
		else if($_POST['returnVal'] == "detail"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->getDetailCustomerData($_POST['mail']));	//zwracamy tabele					
		}
	}
?>