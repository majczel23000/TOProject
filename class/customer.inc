<?php
	require ('user.inc');
	class Customer extends User{
		public function __construct($id,$db){										
			parent::__construct($id,$db);												//wywołanie kontruktora parenta
			$this->accType="CUSTOMER";
			if($this->db){
				$this->db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 				//żeby były polskie znaki w pobranych danych
				$query="SELECT * FROM ".$this->accType." WHERE CUS_ID=".$this->idUser;		//pobiranie danych z bazy
				$result=$this->db->query($query);	
				$row=$result->fetch_assoc();
				$this->firstName=$row['FIRST_NAME'];										//i zapisanie w obiekcie
				$this->lastName=$row['LAST_NAME'];
				$this->address=$row['ADDRESS'];
				$this->email=$row['EMAIL'];
				$this->phoneNumber=$row['PHONE_NUMBER'];
			}
		}
			
		public function __toString(){														//wypisanie na ekranie
			return "----------------CUSTOMER----------------<br>idUser: ".$this->idUser."<br>Account Type: ".$this->accType."<br>First Name: ".$this->firstName."<br>Last name: ".$this->lastName."<br>Email Address: ".$this->email."<br>Address: ".$this->address."<br>Phone number: ".$this->phoneNumber."<br>";
		}

	}
?>