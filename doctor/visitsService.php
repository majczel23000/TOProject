<?php
	if(isset($_POST['accType']) && $_POST['accType']=="doctor"){
		session_start();		
		require ('../class/doctor.inc');
		if($_POST['returnVal'] == "today"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->getVisits("today"));						//zwracamy tabele
		}
		else if($_POST['returnVal'] == "prev"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->getVisits("prev"));						//zwracamy tabele
		}
		else if($_POST['returnVal'] == "next"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->getVisits("next"));						//zwracamy tabele
		}
		else if($_POST['returnVal'] == "getCustomers"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->getAllCustomers());						//zwracamy tabele
		}
		else if($_POST['returnVal'] == "getCustomerAnimals"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->getCustomerAnimals($_POST['customerId']));						//zwracamy tabele
		}
		else if($_POST['returnVal'] == "getAvalibleHours"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->getAvalibleHours($_POST['day'],$_POST['date']));						//zwracamy tabele
		}
	}
?>