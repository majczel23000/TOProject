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
				$this->admissionHours=$this->getAdmissionHoursFromDataBase($this->db);			//przypisujemy tez godziny przyjeć
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
		
		private function getAdmissionHoursFromDataBase($db){
			$query="SELECT * FROM ADMISSION_HOURS WHERE ADM_H_ID=".$this->idUser;
			$result=$db->query($query);
			if($result->num_rows!=1){												//jesli nie ma go w tabeli przyjęć, to go dodajemy
				$addQuery = "INSERT INTO ADMISSION_HOURS (ADM_H_ID) VALUES (".$this->idUser.")";
				$db->query($addQuery);
				$arr=Array(	"MONDAY"	=> 'Brak Przyjęć',
							"TUESDAY"	=> 'Brak Przyjęć',
							"WEDNESDAY"	=> 'Brak Przyjęć',
							"THURSDAY"	=> 'Brak Przyjęć',
							"FRIDAY" 	=> 'Brak Przyjęć',
							"SATURDAY"	=> 'Brak Przyjęć',
							"SUNDAY" 	=> 'Brak Przyjęć');
				return $arr;
			}
			else{
				$arr=$result->fetch_assoc();
				foreach($arr as $key=>$val){										//jesli wiersz jest pusty to znaczy, ze nie ma przyjęć w danym dniu
					if($val==null){
						$arr[$key]="Brak Przyjęć";
					}
				}
				return $arr;
			}
		}
		
		public function editData($fN, $lN, $a, $pN, $aT,$admH){
			$retVal=-1;
			require('../connect.php');		
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				$retVal=1;
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query = "UPDATE doctor SET FIRST_NAME='".$fN."', LAST_NAME='".$lN."', ADDRESS='".$a."', PHONE_NUMBER='".$pN."', ACADEMIC_TITLE='".$aT."' WHERE EMAIL='".$this->email."'";
				$db->query($query);
				//zminamy godziny przyjęć
				foreach($admH as $key=>$val){						//jesli jest "" to musimy wprowadzic NULL do tabeli, ale bez apostrofów, zeby wprowadziło sie jako NULL, a nie jako 
					if($val==""){																											//string z wartością NULL
						$admH[$key]="NULL";
					}
					else{
						$admH[$key]="'".$val."'";					//w przeciwnym razie wprowadzamy godziny z apostrofami
					}
				}
				$query = "UPDATE ADMISSION_HOURS SET 
														MONDAY=".$admH['MONDAY'].", 
														TUESDAY=".$admH['TUESDAY'].", 
														WEDNESDAY=".$admH['WEDNESDAY'].", 
														THURSDAY=".$admH['THURSDAY'].", 
														FRIDAY=".$admH['FRIDAY'].", 
														SATURDAY=".$admH['SATURDAY'].", 
														SUNDAY=".$admH['SUNDAY']." WHERE ADM_H_ID=".$this->idUser;
				$db->query($query);
				$retVal=0;	
				$this->firstName=$fN;
				$this->lastName=$lN;
				$this->address=$a;
				$this->phoneNumber=$pN;
				$this->academicTitle=$aT;
				$this->admissionHours=$this->getAdmissionHoursFromDataBase($db);			//zapisujemy wszystkie zmienione dane w aktualnej sesji
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
					//ilosc poprawnych logowac
					$query="SELECT COUNT(CUS_ID) AS LOGIN_NUM FROM LOGIN_HISTORY WHERE CUS_ID=".$customer['CUS_ID']." AND RESULT='ACCESS'";
					$accessNum=$db->query($query);														
					$customer['LOGIN_NUM_A'] = $accessNum->fetch_assoc()['LOGIN_NUM'];
					//ilosc niepoprawnych
					$query="SELECT COUNT(CUS_ID) AS LOGIN_NUM FROM LOGIN_HISTORY WHERE CUS_ID=".$customer['CUS_ID']." AND RESULT='DENIED'";
					$deniedNum=$db->query($query);														
					$customer['LOGIN_NUM_D'] = $deniedNum->fetch_assoc()['LOGIN_NUM'];
					//ostatnie logowanie poprawne
					$query="SELECT DATE FROM LOGIN_HISTORY WHERE CUS_ID=".$customer['CUS_ID']." AND RESULT='ACCESS' ORDER BY DATE DESC LIMIT 1";
					$accessLast=$db->query($query);														
					if($accessLast->num_rows==0)
						$customer['LOGIN_LAST_A'] = "<span style=\"color:gray\">Brak udanych logowań</span>";
					else
						$customer['LOGIN_LAST_A'] = $accessLast->fetch_assoc()['DATE'];
					//ostatnie niepoprawen
					$query="SELECT DATE FROM LOGIN_HISTORY WHERE CUS_ID=".$customer['CUS_ID']." AND RESULT='DENIED' ORDER BY DATE DESC LIMIT 1";
					$deniedLast=$db->query($query);														
					if($deniedLast->num_rows==0)
						$customer['LOGIN_LAST_D'] = "<span style=\"color:gray\">Brak nieudanych logowań</span>";
					else
						$customer['LOGIN_LAST_D'] = $deniedLast->fetch_assoc()['DATE'];
					//ilosc zwierzaków
					$query="SELECT COUNT(CUS_ANI_ID) AS PETS_NUM FROM CUSTOMER_ANIMAL WHERE CUS_ID=".$customer['CUS_ID'];
					$petsNum=$db->query($query);														
					$customer['PET_NUM'] = $petsNum->fetch_assoc()['PETS_NUM'];
					//ilosc wizyt
					$query="SELECT COUNT(VIS_ID) AS VISIT_NUM FROM VISIT WHERE CUS_ANI_ID = ANY(SELECT CUS_ANI_ID FROM CUSTOMER_ANIMAL WHERE CUS_ID=".$customer['CUS_ID'].") AND (DATE<CURDATE() OR DATE=CURDATE() AND HOUR<CURTIME())";
					$visitNum=$db->query($query);														
					$customer['VISIT_NUM'] = $visitNum->fetch_assoc()['VISIT_NUM'];
					//ostatna wizyta
					$query="SELECT DATE, HOUR FROM VISIT WHERE 	CUS_ANI_ID = ANY(SELECT CUS_ANI_ID FROM CUSTOMER_ANIMAL WHERE CUS_ID=".$customer['CUS_ID'].") AND 
																(DATE<CURDATE() OR DATE=CURDATE() AND HOUR<CURTIME()) ORDER BY DATE DESC, HOUR DESC LIMIT 1";
					$prevVisit=$db->query($query);														
					if($prevVisit->num_rows==0)
						$customer['VISIT_PREV'] = "<span style=\"color:gray\">Brak poprzednich wizyt</span>";
					else{
						$tmp=$prevVisit->fetch_assoc();
						$customer['VISIT_PREV'] = $tmp['DATE']." ".$tmp['HOUR'];
					}
					//następna wizyta
					$query="SELECT DATE, HOUR FROM VISIT WHERE 	CUS_ANI_ID = ANY(SELECT CUS_ANI_ID FROM CUSTOMER_ANIMAL WHERE CUS_ID=".$customer['CUS_ID'].") AND 
																(DATE>CURDATE() OR DATE=CURDATE() AND HOUR>CURTIME()) ORDER BY DATE ASC, HOUR ASC LIMIT 1";
					$nextVisit=$db->query($query);														
					if($nextVisit->num_rows==0)
						$customer['VISIT_NEXT'] = "<span style=\"color:gray\">Brak następnych wizyt</span>";
					else{
						$tmp=$nextVisit->fetch_assoc();
						$customer['VISIT_NEXT'] = $tmp['DATE']." ".$tmp['HOUR'];
					}
				}
			}
			@$db->close();
			return $customer;
		}
				
		public function getAllDoctors(){								
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$doctors = Array();											//tworzymy tablice
			$idx=0;
			if(mysqli_connect_errno())
				$doctors[$idx]=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query="SELECT DOC_ID,FIRST_NAME, LAST_NAME, EMAIL, ADDRESS, PHONE_NUMBER, ACADEMIC_TITLE, ADM_TYPE FROM DOCTOR ORDER BY LAST_NAME, FIRST_NAME";		//pobieramy dane
				$result=$db->query($query);																
				if($result->num_rows==0)
					$doctors[$idx]=0;																		//jesli 0 wierszy to zwracamy 0
				else{
					while($row=$result->fetch_assoc()){
						$doctors[$idx++] = $row;															//wkładamy pacjentów do tabeli
						$adissionalQuery="SELECT * FROM ADMISSION_HOURS WHERE ADM_H_ID=".$row['DOC_ID'];	//pobieramy godziny
						$adiResult=$db->query($adissionalQuery);
						if($adiResult->num_rows!=1){												//jesli nie ma go w tabeli przyjęć, to go dodajemy
							$tmp = $idx-1; 															//bo wczesniej zinkrementowalismy
							$doctors[$tmp]['MONDAY']	='Brak Przyjęć';
							$doctors[$tmp]['TUESDAY']	='Brak Przyjęć';
							$doctors[$tmp]['WEDNESDAY']	='Brak Przyjęć';
							$doctors[$tmp]['THURSDAY']	='Brak Przyjęć';
							$doctors[$tmp]['FRIDAY']	='Brak Przyjęć';
							$doctors[$tmp]['SATURDAY']	='Brak Przyjęć';
							$doctors[$tmp]['SUNDAY']	='Brak Przyjęć';
						}
						else{
							$arr=$adiResult->fetch_assoc();
							foreach($arr as $key=>$val){							//jesli wiersz jest pusty to znaczy, ze nie ma przyjęć w danym dniu
								if($val==null){
									$arr[$key]="Brak Przyjęć";
								}
							}
							$tmp = $idx-1; 															//bo wczesniej zinkrementowalismy
							$doctors[$tmp]['MONDAY']=$arr['MONDAY'];
							$doctors[$tmp]['TUESDAY']=$arr['TUESDAY'];
							$doctors[$tmp]['WEDNESDAY']=$arr['WEDNESDAY'];
							$doctors[$tmp]['THURSDAY']=$arr['THURSDAY'];
							$doctors[$tmp]['FRIDAY']=$arr['FRIDAY'];
							$doctors[$tmp]['SATURDAY']=$arr['SATURDAY'];
							$doctors[$tmp]['SUNDAY']=$arr['SUNDAY'];
						}
					}
				}		
			}
			return $doctors;
		}
		public function getDetailDoctorData($e){												//przyjmuje mail
			$doctor=-1;
			require('../connect.php');		
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				$doctor=1;
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query="SELECT * FROM DOCTOR WHERE EMAIL='".$e."'";
				$result=$db->query($query);																
				if($result->num_rows==0)
					$doctor=0;																		//jesli 0 wierszy to zwracamy 0
				else{
					$doctor=$result->fetch_assoc();													//else to zapisujemy go do zmiennej
					$adissionalQuery="SELECT * FROM ADMISSION_HOURS WHERE ADM_H_ID=".$doctor['DOC_ID'];	//pobieramy godziny
					$adiResult=$db->query($adissionalQuery);
					if($adiResult->num_rows!=1){												//jesli nie ma go w tabeli przyjęć, to go dodajemy
						$doctor['MONDAY']	='Brak Przyjęć';
						$doctor['TUESDAY']	='Brak Przyjęć';
						$doctor['WEDNESDAY']	='Brak Przyjęć';
						$doctor['THURSDAY']	='Brak Przyjęć';
						$doctor['FRIDAY']	='Brak Przyjęć';
						$doctor['SATURDAY']	='Brak Przyjęć';
						$doctor['SUNDAY']	='Brak Przyjęć';
					}
					else{
						$arr=$adiResult->fetch_assoc();
						foreach($arr as $key=>$val){							//jesli wiersz jest pusty to znaczy, ze nie ma przyjęć w danym dniu
							if($val==null){
								$arr[$key]="Brak Przyjęć";
							}
						}
						$doctor['MONDAY']=$arr['MONDAY'];
						$doctor['TUESDAY']=$arr['TUESDAY'];
						$doctor['WEDNESDAY']=$arr['WEDNESDAY'];
						$doctor['THURSDAY']=$arr['THURSDAY'];
						$doctor['FRIDAY']=$arr['FRIDAY'];
						$doctor['SATURDAY']=$arr['SATURDAY'];
						$doctor['SUNDAY']=$arr['SUNDAY'];
					}
				}
			}
			@$db->close();
			return $doctor;
		}
		public function editDoctorsData($doctorData){			//przyjmuje tabele z danymi
			$retVal=-1;
			require('../connect.php');		
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				$retVal=1;
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query = "UPDATE DOCTOR SET FIRST_NAME='".$doctorData['firstName']."', LAST_NAME='".$doctorData['lastName']."', ADDRESS='".$doctorData['address']."', PHONE_NUMBER='".$doctorData['phoneNumber']."', ACADEMIC_TITLE='".$doctorData['academicTitle']."', ADM_TYPE='".$doctorData['adminType']."' WHERE EMAIL='".$doctorData['mail']."'";
				$db->query($query);
				//zminamy godziny przyjęć
				$admH = Array(	"MONDAY"	=>$doctorData['mondayHours'],
								"TUESDAY"	=>$doctorData['tuesdayHours'],
								"WEDNESDAY"	=>$doctorData['wednesdayHours'],
								"THURSDAY"	=>$doctorData['thursdayHours'],
								"FRIDAY"	=>$doctorData['fridayHours'],
								"SATURDAY"	=>$doctorData['saturdayHours'],
								"SUNDAY"	=>$doctorData['sundayHours']
								);
				foreach($admH as $key=>$val){						//jesli jest "" to musimy wprowadzic NULL do tabeli, ale bez apostrofów, zeby wprowadziło sie jako NULL, a nie jako 
					if($val==""){																											//string z wartością NULL
						$admH[$key]="NULL";
					}
					else{
						$admH[$key]="'".$val."'";					//w przeciwnym razie wprowadzamy godziny z apostrofami
					}
				}
				$query = "UPDATE ADMISSION_HOURS SET 
														MONDAY=".$admH['MONDAY'].", 
														TUESDAY=".$admH['TUESDAY'].", 
														WEDNESDAY=".$admH['WEDNESDAY'].", 
														THURSDAY=".$admH['THURSDAY'].", 
														FRIDAY=".$admH['FRIDAY'].", 
														SATURDAY=".$admH['SATURDAY'].", 
														SUNDAY=".$admH['SUNDAY']." WHERE ADM_H_ID=(SELECT DOC_ID FROM DOCTOR WHERE EMAIL='".$doctorData['mail']."')";
				$db->query($query);
				$retVal=0;	
			}
			@$db->close();
			return $retVal;
		}
		public function addNewDoctor($doctorData){
			$retVal=-1;
			require('../connect.php');		
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				$retVal=1;
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query = "INSERT INTO DOCTOR(FIRST_NAME,LAST_NAME,PASSWORD,ADDRESS,PHONE_NUMBER,ACADEMIC_TITLE,EMAIL,ADM_TYPE) VALUES ('".$doctorData['firstName']."','".$doctorData['lastName']."','".password_hash($doctorData['password'],PASSWORD_DEFAULT)."','".$doctorData['address']."','".$doctorData['phoneNumber']."','".$doctorData['academicTitle']."','".$doctorData['mail']."','".$doctorData['adminType']."')";							//dodanie do tabelu lekarza
				$db->query($query);
				//dodanie do tabeli z godzinami przyjeć
				$admH = Array(	"MONDAY"	=>$doctorData['mondayHours'],
								"TUESDAY"	=>$doctorData['tuesdayHours'],
								"WEDNESDAY"	=>$doctorData['wednesdayHours'],
								"THURSDAY"	=>$doctorData['thursdayHours'],
								"FRIDAY"	=>$doctorData['fridayHours'],
								"SATURDAY"	=>$doctorData['saturdayHours'],
								"SUNDAY"	=>$doctorData['sundayHours']
								);
				foreach($admH as $key=>$val){						//jesli jest "" to musimy wprowadzic NULL do tabeli, ale bez apostrofów, zeby wprowadziło sie jako NULL, a nie jako 
					if($val==""){																											//string z wartością NULL
						$admH[$key]="NULL";
					}
					else{
						$admH[$key]="'".$val."'";					//w przeciwnym razie wprowadzamy godziny z apostrofami
					}
				}
				$query = "INSERT INTO ADMISSION_HOURS VALUES(
														(SELECT DOC_ID FROM DOCTOR WHERE EMAIL='".$doctorData['mail']."'),
														".$admH['MONDAY'].", 
														".$admH['TUESDAY'].", 
														".$admH['WEDNESDAY'].", 
														".$admH['THURSDAY'].", 
														".$admH['FRIDAY'].", 
														".$admH['SATURDAY'].", 
														".$admH['SUNDAY'].")";
				$db->query($query);
				$retVal=0;	
			}
			@$db->close();
			return $retVal;
		}
	}
?>