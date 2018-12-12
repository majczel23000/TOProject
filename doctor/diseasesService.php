<?php
	if(isset($_POST['accType']) && $_POST['accType']=="doctor"){
		session_start();		
		require ('../class/doctor.inc');
		if($_POST['returnVal'] == "fullData"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->getAllDiseases());						//zwracamy tabele
		}
		else if($_POST['returnVal'] == "editingDisease"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->editDisease($_POST));						//zwracamy rezultat edycji
		}
		else if($_POST['returnVal'] == "addingDisease"){
			echo json_encode(unserialize($_SESSION['DOCTOR'])->addDisease($_POST));						//zwracamy rezultat dodania
		}
	}
?>