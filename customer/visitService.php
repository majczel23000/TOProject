<?php
	if(isset($_POST['accType']) && $_POST['accType']=="customer"){
		session_start();		
		require ('../class/customer.inc');
		if(isset($_POST['day']) && $_POST['returnVal'] == "selectedDay"){
			echo json_encode(unserialize($_SESSION['CUSTOMER'])->getAdmissionHoursFromDay($_POST['day']));
		} else if(isset($_POST['CUS_ANI_ID']) && isset($_POST['DOC_ID']) && isset($_POST['DATE']) && isset($_POST['HOUR']) && $_POST['returnVal'] == "makeAppointment" ){
			echo json_encode(unserialize($_SESSION['CUSTOMER'])->makeAppointment($_POST['CUS_ANI_ID'],$_POST['DOC_ID'],$_POST['DATE'],$_POST['HOUR']));
		} else if(isset($_POST['date']) && isset($_POST['status']) && isset($_POST['doc_id']) && $_POST['returnVal'] == "plannedVisits" ){
			echo json_encode(unserialize($_SESSION['CUSTOMER'])->getAppointmentsHoursFromDayWithStatus($_POST['date'],$_POST['status'],$_POST['doc_id']));
		} else if(isset($_POST['status']) && $_POST['returnVal'] == "getVisits"){
			echo json_encode(unserialize($_SESSION['CUSTOMER'])->getVisits($_POST['status']));
		}
	}
?>