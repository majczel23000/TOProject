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
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`");
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
				$query="SELECT DOC_ID, PHONE_NUMBER, ACADEMIC_TITLE FROM DOCTOR WHERE EMAIL LIKE '".$email."'";		
				$result=$db->query($query);
				$num_rows=$result->num_rows;
				if($num_rows!=1){
					$result->free();
					return 0;
				} else {
					$result = $result->fetch_assoc();
					$query2="SELECT * FROM ADMISSION_HOURS WHERE ADM_H_ID = ".$result['DOC_ID']."";
					$result2=$db->query($query2);
					$num_rows2=$result2->num_rows;
					if($num_rows2!=1){
						$result2->free();
						return $result;
					} else{
						$result2 = $result2->fetch_assoc();
						unset($result['DOC_ID']);
						unset($result2['ADM_H_ID']);
						$result = array_merge($result, $result2);
						return $result;
					}
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
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`");
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

		// Dodawanie nowego zwierzęcia
		public function addAnimal($name, $species, $race, $height, $weight, $birthDate, $gender){
			$retVal;
			require('../connect.php');
			@$db=new mysqli($server,$user,$password,$dataBase);
			$db->query("SET NAMES utf8 COLLATE utf8_polish_ci");
			if(mysqli_connect_errno())
            	$retVal = 1;
			else{
				$query = "INSERT INTO customer_animal (NAME, WEIGHT, HEIGHT, GENDER, BIRTH_DATE, ANI_RAC_ID, CUS_ID) VALUES('".$name."','".$weight."','".$height."','".$gender."','".$birthDate."','".$race."','".$this->idUser."')";
				$db->query($query);
				$retVal = 0;
			}
			return $retVal;
		}

		// gneruje statystyki zwierząt customera
		public function getAnimalStats(){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$stats = Array();											
			$idx=0;
			$db->query("SET NAMES utf8 COLLATE utf8_polish_ci");
			if(mysqli_connect_errno())
				$stats[$idx]=1;											
			else{
				$query1="SELECT COUNT(CUS_ANI_ID) FROM customer_animal WHERE CUS_ID=".$this->idUser;		
				$animalCount=$db->query($query1);																
				if($animalCount->num_rows==0)
					$stats["ANIMAL_COUNT"]=0;																		
				else{
					$stats["ANIMAL_COUNT"] = $animalCount->fetch_assoc()['COUNT(CUS_ANI_ID)'];
					
					$query2="SELECT NAME FROM customer_animal WHERE CUS_ID=".$this->idUser." ORDER BY BIRTH_DATE LIMIT 1";	
					$oldestAnimal=$db->query($query2);
					$stats["OLDEST_ANIMAL"] = $oldestAnimal->fetch_assoc()['NAME'];
					
					$query3="SELECT NAME FROM customer_animal WHERE CUS_ID=".$this->idUser." ORDER BY BIRTH_DATE DESC LIMIT 1";	
					$youngestAnimal=$db->query($query3);
					$stats["YOUNGEST_ANIMAL"] = $youngestAnimal->fetch_assoc()['NAME'];
					
					$query4="SELECT COUNT(*) FROM customer_animal GROUP BY CUS_ID HAVING COUNT(*) > ".$stats["ANIMAL_COUNT"];
					$moreAnimals=$db->query($query4);
					$stats["MORE_ANIMALS"] = $moreAnimals->num_rows;

					$query5="SELECT COUNT(*) FROM customer";
					$customerNumber=$db->query($query5);
					$stats["CUSTOMER_NUMBER"] = $customerNumber->fetch_assoc()['COUNT(*)'];
				}
			}
			return $stats;
		}

		// Pobieranie listy wszystkich usług
		public function getServices(){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$services = Array();											
			$idx=0;
			$db->query("SET NAMES utf8 COLLATE utf8_polish_ci");
			if(mysqli_connect_errno())
				$services[$idx]=1;											
			else{
				$query="SELECT * FROM service ORDER BY NAME";		
				$result=$db->query($query);																
				if($result->num_rows==0)
					$services[$idx]=0;																		
				else{
					while($row=$result->fetch_assoc())
						$services[$idx++] = $row;															
				}
			}
			return $services;
		}

		// Pobieranie listy usług podczas filtrowania po nazwie
		public function getServicesWithPhrase($phrase){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$services = Array();											
			$idx=0;
			$db->query("SET NAMES utf8 COLLATE utf8_polish_ci");
			if(mysqli_connect_errno())
				$services[$idx]=1;											
			else{
				$query="SELECT * FROM service WHERE NAME LIKE '%".$phrase."%' ORDER BY NAME";		
				$result=$db->query($query);																
				if($result->num_rows==0)
					$services[$idx]=0;																		
				else{
					while($row=$result->fetch_assoc())
						$services[$idx++] = $row;															
				}
			}
			return $services;
		}

		// pobiera liste godzin przyjęć każdego lekarza z danego dnia
		public function getAdmissionHoursFromDay($day){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$hours = Array();											
			$idx=0;
			$db->query("SET NAMES utf8 COLLATE utf8_polish_ci");
			if(mysqli_connect_errno())
				$hours[$idx]=1;											
			else{
				$query="SELECT ".$day.", FIRST_NAME, LAST_NAME, ADM_H_ID FROM admission_hours JOIN doctor ON doctor.DOC_ID=admission_hours.ADM_H_ID";		
				$result=$db->query($query);																
				if($result->num_rows==0)
					$hours[$idx]=0;																		
				else{
					while($row=$result->fetch_assoc())
						$hours[$idx++] = $row;															
				}
			}
			return $hours;
		}

		// zapisuje nową wizytę w tabeli o statusie 'PLANNED'
		public function makeAppointment($CUS_ANI_ID, $DOC_ID, $DATE, $HOUR){
			$retVal;
			require('../connect.php');
			@$db=new mysqli($server,$user,$password,$dataBase);
			$db->query("SET NAMES utf8 COLLATE utf8_polish_ci");
			if(mysqli_connect_errno())
            	$retVal = 1;
			else{
				$query = "INSERT INTO VISIT (DOC_ID, DATE, CUS_ANI_ID, STATUS, HOUR) VALUES(".$DOC_ID.",'".$DATE."','".$CUS_ANI_ID."','PLANNED','".$HOUR."')";
				$db->query($query);
				$retVal = 0;
			}
			return $retVal;
		}

		// pobiera liste godzin z danego dnia z podanym statusem
		public function getAppointmentsHoursFromDayWithStatus($date, $status, $doc_id){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$hours = Array();											
			$idx=0;
			$db->query("SET NAMES utf8 COLLATE utf8_polish_ci");
			if(mysqli_connect_errno())
				$hours[$idx]=1;											
			else{
				$query="SELECT HOUR FROM VISIT WHERE DATE LIKE '".$date."' AND STATUS LIKE '".$status."' AND DOC_ID LIKE '".$doc_id."'";		
				$result=$db->query($query);																
				if($result->num_rows==0)
					$hours[$idx]=0;																		
				else{
					while($row=$result->fetch_assoc())
						$hours[$idx++] = $row['HOUR'];															
				}
			}
			return $hours;
		}

		// pobiera liste wizyt z podanym statusem (status "ALL" pobiera wszystkie)
		public function getVisits($status){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$visits = Array();											
			$idx=0;
			$db->query("SET NAMES utf8 COLLATE utf8_polish_ci");
			if(mysqli_connect_errno())
				$visits[$idx]=1;											
			else{
				if($status !== 'ALL')
					$query="SELECT DATE, HOUR, NAME, STATUS FROM VISIT JOIN customer_animal USING(CUS_ANI_ID) WHERE CUS_ID=".$this->idUser." AND STATUS LIKE '".$status."'";
				else
					$query="SELECT DATE, HOUR, NAME, STATUS FROM VISIT JOIN customer_animal USING(CUS_ANI_ID) WHERE CUS_ID=".$this->idUser;		
				$result=$db->query($query);																
				if($result->num_rows==0)
					$visits[$idx]=0;																		
				else{
					while($row=$result->fetch_assoc())
						$visits[$idx++] = $row;															
				}
			}
			return $visits;
		}
	}
?>