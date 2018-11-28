<?php
	require ('user.inc');
	class Customer extends User{
		public function __construct($id,$db){										
			parent::__construct($id,$db);
			$this->accType="CUSTOMER";
			if($this->db){
				$this->db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`");
				$query="SELECT * FROM ".$this->accType." WHERE CUS_ID=".$this->idUser;
				$result=$this->db->query($query);	
				$row=$result->fetch_assoc();
				$this->firstName=$row['FIRST_NAME'];
				$this->lastName=$row['LAST_NAME'];
				$this->address=$row['ADDRESS'];
				$this->email=$row['EMAIL'];
				$this->phoneNumber=$row['PHONE_NUMBER'];
			}
		}
			
		public function __toString(){
			return "----------------CUSTOMER----------------<br>idUser: ".$this->idUser."<br>Account Type: ".$this->accType."<br>First Name: ".$this->firstName."<br>Last name: ".$this->lastName."<br>Email Address: ".$this->email."<br>Address: ".$this->address."<br>Phone number: ".$this->phoneNumber."<br>";
		}

		public function editData($fN, $lN, $a, $pN){
			require('../connect.php');
			$returnVal = -1;
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				$returnVal = 1;
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`");
				$query = "UPDATE customer SET FIRST_NAME='".$fN."', LAST_NAME='".$lN."', ADDRESS='".$a."', PHONE_NUMBER='".$pN."' WHERE EMAIL LIKE '".$this->email."'";
				$db->query($query);
				$returnVal = 0;
				$this->firstName=$fN;
				$this->lastName=$lN;
				$this->address=$a;
				$this->phoneNumber=$pN;
				$_SESSION['CUSTOMER']=serialize($this);
			}
			@$this->db->close();
			return $returnVal;
		}

		public function getAllDoctors(){									
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$doctors = Array();											
			$idx=0;
			if(mysqli_connect_errno())
				$doctors[$idx]=1;											
			else{
				$query="SELECT FIRST_NAME, LAST_NAME, EMAIL FROM DOCTOR ORDER BY LAST_NAME, FIRST_NAME";		
				$result=$db->query($query);																
				if($result->num_rows==0)
					$doctors[$idx]=0;																		
				else{
					while($row=$result->fetch_assoc())
						$doctors[$idx++] = $row;															
				}
			}
			return $doctors;
		}

		// $email - email według którego będziemy szukać konkretnego lekarze (unikalny w tabeli)
		public function getDoctorDetails($email){									
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				return 1;											
			else{
				$query="SELECT PHONE_NUMBER, ACADEMIC_TITLE FROM DOCTOR WHERE EMAIL LIKE '".$email."'";		
				$result=$db->query($query);
				$num_rows=$result->num_rows;
				if($num_rows!=1){
					$result->free();
					return 0;
				} else {
					return $result->fetch_assoc();
				}																
			}
		}

		public function getDoctorsWithPhrase($phrase){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$doctors = Array();											
			$idx=0;
			if(mysqli_connect_errno())
				$doctors[$idx]=1;											
			else{
				$query="SELECT FIRST_NAME, LAST_NAME, EMAIL FROM DOCTOR WHERE FIRST_NAME LIKE '%".$phrase."%' OR LAST_NAME LIKE '%".$phrase."%' ORDER BY LAST_NAME, FIRST_NAME";		
				$result=$db->query($query);																
				if($result->num_rows==0)
					$doctors[$idx]=0;																		
				else{
					while($row=$result->fetch_assoc())
						$doctors[$idx++] = $row;															
				}
			}
			return $doctors;
		}

		// zapytanie do bazy o zwrócenie wszystkich zwierząt zalogowanego customera
		public function getAllAnimal(){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$animals = Array();											
			$idx=0;
			if(mysqli_connect_errno())
				$animals[$idx]=1;											
			else{
				$query="SELECT CUS_ANI_ID, SPECIES, RACE, NAME FROM customer_animal JOIN animal_race USING(ANI_RAC_ID) JOIN animal_species USING(ANI_SPE_ID) WHERE CUS_ID=".$this->idUser;		
				$result=$db->query($query);																
				if($result->num_rows==0)
					$animals[$idx]=0;																		
				else{
					while($row=$result->fetch_assoc())
						$animals[$idx++] = $row;															
				}
			}
			return $animals;
		}

		// $animalID - CUS_ANI_ID według którego będziemy szukać konkretnego zwierzaka (unikalny w tabeli)
		public function getAnimalDetails($animalID){									
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				return 1;											
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`");
				$query="SELECT * FROM CUSTOMER_ANIMAL JOIN ANIMAL_RACE USING(ANI_RAC_ID) JOIN ANIMAL_SPECIES USING(ANI_SPE_ID) WHERE CUS_ANI_ID =".$animalID;		
				$result=$db->query($query);
				$num_rows=$result->num_rows;
				if($num_rows!=1){
					$result->free();
					return 0;
				} else {
					return $result->fetch_assoc();
				}																
			}
		}

		// $animalID - CUS_ANI_ID według którego będziemy edytować konkretnego zwierzaka (unikalny w tabeli)
		public function editAnimalData($name, $weight, $height, $animalID){
			require('../connect.php');
			$returnVal = -1;
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				$returnVal = 1;
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`");
				$query = "UPDATE CUSTOMER_ANIMAL SET NAME='".$name."', WEIGHT='".$weight."', HEIGHT='".$height."' WHERE CUS_ANI_ID LIKE '".$animalID."'";
				$db->query($query);
				$returnVal = 0;
			}
			@$this->db->close();
			return $returnVal;
		}

		// pobiera wszystkie gatunki zwierząt
		public function getAnimalsSpecies(){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$species = Array();											
			$idx=0;
			if(mysqli_connect_errno())
				$species[$idx]=1;											
			else{
				$db->query("SET NAMES utf8 COLLATE utf8_polish_ci");
				$query="SELECT * FROM animal_species";		
				$result=$db->query($query);																
				if($result->num_rows==0)
					$species[$idx]=0;																		
				else{
					while($row=$result->fetch_assoc())
						$species[$idx++] = $row;															
				}
			}
			return $species;
		}

		// pobiera wszystkie rasy zwierząt
		public function getAnimalsRaces($ANI_SPE_ID){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$races = Array();											
			$idx=0;
			$db->query("SET NAMES utf8 COLLATE utf8_polish_ci");
			if(mysqli_connect_errno())
				$races[$idx]=1;											
			else{
				$query="SELECT * FROM animal_race WHERE ANI_SPE_ID=".$ANI_SPE_ID;		
				$result=$db->query($query);																
				if($result->num_rows==0)
					$races[$idx]=0;																		
				else{
					while($row=$result->fetch_assoc())
						$races[$idx++] = $row;															
				}
			}
			return $races;
		}

		public function addAnimal($name, $species, $race, $height, $weight, $birthDate){
			$retVal;
			require('connect.php');
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
            $retVal = 1;
			else{
				$hashedPassword = password_hash($p, PASSWORD_DEFAULT);
				$query = "INSERT INTO customer (FIRST_NAME, LAST_NAME, PASSWORD, EMAIL) VALUES('".$fN."','".$lN."','".$hashedPassword."','".$e."')";
				$db->query($query);
				$retVal = 0;
			}
			return $retVal;
		}
	}
?>