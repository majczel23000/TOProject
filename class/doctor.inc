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
		
		public function setAcademicTitle($aT){
			$this->academicTitle = $aT;
		}

		public function getAcademicTitle(){
			return $this->academicTitle;
		}
			
		public function __toString(){													//wypisanie na ekranie
			return "----------------DOCTOR----------------<br>idUser: ".$this->idUser."<br>Account Type: ".$this->accType."<br>First Name: ".$this->firstName."<br>Last name: ".$this->lastName."<br>Email Address: ".$this->email."<br>Address: ".$this->address."<br>Phone number: ".$this->phoneNumber."<br>Academic Title: ".$this->academicTitle."<br>Admin Type: ".$this->admType."<br>";
		}
		
		public function getAllPatients(){									//funkcja pobierajaca pacjentów
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
			return $patients;
		}
		
		public function editData($fN, $lN, $a, $pN, $aT){
			$retVal=-1;
			require('../connect.php');		
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				$retVal=1;
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query = "UPDATE doctor SET FIRST_NAME='".$fN."', LAST_NAME='".$lN."', ADDRESS='".$a."', PHONE_NUMBER='".$pN."', ACADEMIC_TITLE='".$aT."' WHERE EMAIL='".$this->email."'";
				$db->query($query);
				$retVal=0;	
				$this->firstName=$fN;
				$this->lastName=$lN;
				$this->address=$a;
				$this->phoneNumber=$pN;
				$this->academicTitle=$aT;
				//session_start();
				$_SESSION['DOCTOR']=serialize($this);
			}
			@$db->close();
			return $retVal;
		}
	}
?>