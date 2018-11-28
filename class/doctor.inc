<?php
	require ('user.inc');
	class Doctor extends User{															//to samo co User, ale dodatkowe atrybuty
		private $admType;
		private $academicTitle;
		private $admissionHours;
		
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
				$query="SELECT * FROM ADMISSION_HOURS WHERE ADM_H_ID=".$this->idUser;
				$result=$this->db->query($query);
				if($result->num_rows!=1){												//jesli godziny przyjec nieuzupełnione
					$arr=Array(	"MONDAY"	=> 'Brak Przyjęć',
								"TUESDAY"	=> 'Brak Przyjęć',
								"WEDNESDAY"	=> 'Brak Przyjęć',
								"THURSDAY"	=> 'Brak Przyjęć',
								"FRIDAY" 	=> 'Brak Przyjęć',
								"SATURDAY"	=> 'Brak Przyjęć',
								"SUNDAY" 	=> 'Brak Przyjęć');
					$this->admissionHours=$arr;
				}
				else{
					$arr=$result->fetch_assoc();
					foreach($arr as $key=>$val){										//jesli wiersz jest pusty to znaczy, ze nie ma przyjęć w danym dniu
						if($val==null){
							$arr[$key]="Brak Przyjęć";
						}
					}
					$this->admissionHours=$arr;
				}
			}
		}
		
		public function setAcademicTitle($aT){
			$this->academicTitle = $aT;
		}

		public function getAcademicTitle(){
			return $this->academicTitle;
		}
		
		public function getAdmType(){
			return $this->admType;
		}
		
		public function getAdmissionHours(){
			return $this->admissionHours;
		}
			
		public function __toString(){													//wypisanie na ekranie
			return "----------------DOCTOR----------------<br>idUser: ".$this->idUser."<br>Account Type: ".$this->accType."<br>First Name: ".$this->firstName."<br>Last name: ".$this->lastName."<br>Email Address: ".$this->email."<br>Address: ".$this->address."<br>Phone number: ".$this->phoneNumber."<br>Academic Title: ".$this->academicTitle."<br>Admin Type: ".$this->admType."<br>";
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
		
		public function getAllCustomers(){								
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$customers = Array();											//tworzymy tablice
			$idx=0;
			if(mysqli_connect_errno())
				$customers[$idx]=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query="SELECT FIRST_NAME, LAST_NAME, EMAIL, ADDRESS, PHONE_NUMBER FROM CUSTOMER ORDER BY LAST_NAME, FIRST_NAME";		//pobieramy dane
				$result=$db->query($query);																
				if($result->num_rows==0)
					$customers[$idx]=0;																		//jesli 0 wierszy to zwracamy 0
				else{
					while($row=$result->fetch_assoc())
						$customers[$idx++] = $row;															//wkładamy pacjentów do tabeli
				}		
			}
			return $customers;
		}
		
		public function getDetailCustomerData($e){
			$customer=-1;
			require('../connect.php');		
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				$customer=1;
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query="SELECT * FROM CUSTOMER WHERE EMAIL='".$e."'";
				$result=$db->query($query);																
				if($result->num_rows==0)
					$customer=0;																		//jesli 0 wierszy to zwracamy 0
				else
					$customer=$result->fetch_assoc();													//else to zapisujemy go do zmiennej
				if($customer!=0){													//jesli wierszy było wiecej niż 0 to pobieramy inne dane
					$query="SELECT COUNT(CUS_ID) AS LOGIN_NUM FROM LOGIN_HISTORY WHERE CUS_ID=".$customer['CUS_ID']." AND RESULT='ACCESS'";
					$accessNum=$db->query($query);														//ilosc poprawnych logowac
					$customer['LOGIN_NUM_A'] = $accessNum->fetch_assoc()['LOGIN_NUM'];
					$query="SELECT COUNT(CUS_ID) AS LOGIN_NUM FROM LOGIN_HISTORY WHERE CUS_ID=".$customer['CUS_ID']." AND RESULT='DENIED'";
					$deniedNum=$db->query($query);														//ilosc niepoprawnych
					$customer['LOGIN_NUM_D'] = $deniedNum->fetch_assoc()['LOGIN_NUM'];
					$query="SELECT DATE FROM LOGIN_HISTORY WHERE CUS_ID=".$customer['CUS_ID']." AND RESULT='ACCESS' ORDER BY DATE DESC LIMIT 1";
					$accessLast=$db->query($query);														//ostatnie logowanie poprawne
					$customer['LOGIN_LAST_A'] = $accessLast->fetch_assoc()['DATE'];
					$query="SELECT DATE FROM LOGIN_HISTORY WHERE CUS_ID=".$customer['CUS_ID']." AND RESULT='DENIED' ORDER BY DATE DESC LIMIT 1";
					$deniedLast=$db->query($query);														//ostatnie niepoprawen
					$customer['LOGIN_LAST_D'] = $deniedLast->fetch_assoc()['DATE'];
					
					$customer['PET_NUM']="B/D";															//pozostałe dane, ale jeszcze nie ma bazy
					$customer['PET_NAMES']="B/D";
					$customer['VISIT_NEXT']="B/D";
					$customer['VISIT_PREV']="B/D";
					$customer['VISIT_NUM']="B/D";
				}
			}
			@$db->close();
			return $customer;
		}
	}
?>