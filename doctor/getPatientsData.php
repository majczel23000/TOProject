<?php
	if(isset($_POST['accType']) && $_POST['accType']=="doctor"){				
		if($_POST['returnVal'] == "fullData"){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$patients = Array();											//tworzymy tablice
			$idx=0;
			if(mysqli_connect_errno())
				$patients[$idx]=1;											//jesli błąd bazy to zwracamy 1
			else{
				$query="SELECT FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER FROM CUSTOMER ORDER BY LAST_NAME, FIRST_NAME";		//pobieramy dane
				$result=$db->query($query);																
				if($result->num_rows==0)
					$patients[$idx]=0;																		//jesli 0 wierszy to zwracamy 0
				else{
					while($row=$result->fetch_assoc())
						$patients[$idx++] = $row;															//wkładamy pacjentów do tabeli
				}
			}
			echo json_encode($patients);																	//zwracamy tabele
		}
	}
?>