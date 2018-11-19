<?php
	require ('user.inc');
	class Doctor extends User{															//to samo co User, ale dodatkowe atrybuty
		private $admType;
		private $academicTitle;
		
		public function __construct($id,$db){
			parent::__construct($id,$db);											//wywołanie konstruktora Parenta
			$this->accType="DOCTOR";
			if($this->db){
				$this->db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 				//żeby były polskie znaki w pobranych danych
				$query="SELECT * FROM ".$this->accType." WHERE DOC_ID=".$this->idUser;	//pobieramy jego dane z bazy
				$result=$this->db->query($query);
				$row=$result->fetch_assoc();
				$this->firstName=$row['FIRST_NAME'];									//no i zapisujemy
				$this->lastName=$row['LAST_NAME'];
				$this->address=$row['ADDRESS'];
				$this->phoneNumber=$row['PHONE_NUMBER'];
				$this->academicTitle=$row['ACADEMIC_TITLE'];
				$this->email=$row['EMAIL'];
				$this->admType=$row['ADM_TYPE'];
			}
		}
			
		public function __toString(){													//wypisanie na ekranie
			return "----------------DOCTOR----------------<br>idUser: ".$this->idUser."<br>Account Type: ".$this->accType."<br>First Name: ".$this->firstName."<br>Last name: ".$this->lastName."<br>Email Address: ".$this->email."<br>Address: ".$this->address."<br>Phone number: ".$this->phoneNumber."<br>Academic Title: ".$this->academicTitle."<br>Admin Type: ".$this->admType."<br>";
		}
	}
?>