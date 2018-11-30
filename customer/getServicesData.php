<?php
	if(isset($_POST['accType']) && $_POST['accType']=="customer"){
		session_start();		
        require ('../class/customer.inc');
        if(isset($_POST['returnVal']) && $_POST['returnVal'] == "fullData")
            echo json_encode(unserialize($_SESSION['CUSTOMER'])->getServices());
        else if(isset($_POST['returnVal']) && $_POST['returnVal'] == "limitedData" && isset($_POST['phrase']))
            echo json_encode(unserialize($_SESSION['CUSTOMER'])->getServicesWithPhrase($_POST['phrase']));
	}
?>