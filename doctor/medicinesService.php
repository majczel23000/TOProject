<?php
	if(isset($_POST['accType']) && $_POST['accType']=="doctor"){
		session_start();		
		require ('../class/doctor.inc');
		if($_POST['returnVal'] == "fullData"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->getAllMedicines());						//zwracamy tabele
		}
		else if($_POST['returnVal'] == "editingMedicine"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->editMedicine($_POST));						//zwracamy rezultat edycji
		}
		else if($_POST['returnVal'] == "addingMedicine"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->addMedicine($_POST));						//zwracamy rezultat dodania
		}
	}
?>