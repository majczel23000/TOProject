<?php
	if(isset($_POST['accType']) && $_POST['accType']=="doctor"){
		session_start();		
		require ('../class/doctor.inc');
		if($_POST['returnVal'] == "fullData"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->getAllDoctors());						//zwracamy tabele
		}
		else if($_POST['returnVal'] == "detail"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->getDetailDoctorData($_POST['mail']));	//zwracamy tabele					
		}
		else if($_POST['returnVal'] == "editDoctors"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->editDoctorsData($_POST));												
		}
		else if($_POST['returnVal'] == "addDoctor"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->addNewDoctor($_POST));															
		}
	}
?>