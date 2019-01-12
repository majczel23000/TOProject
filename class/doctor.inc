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
				$query="SELECT CUS_ID, FIRST_NAME, LAST_NAME, EMAIL, ADDRESS, PHONE_NUMBER FROM CUSTOMER ORDER BY LAST_NAME, FIRST_NAME";		//pobieramy dane
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
				$query="SELECT DOC_ID,FIRST_NAME, LAST_NAME, EMAIL, ADDRESS, PHONE_NUMBER, ACADEMIC_TITLE, ADM_TYPE FROM DOCTOR WHERE DOC_ID<>".$this->idUser." ORDER BY LAST_NAME, FIRST_NAME";		//pobieramy dane
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
		//lista lekow
		public function getAllMedicines(){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$medicines = Array();											//tworzymy tablice
			$idx=0;
			if(mysqli_connect_errno())
				$medicines[$idx]=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query="SELECT * FROM MEDICINE ORDER BY NAME";		//pobieramy dane
				$result=$db->query($query);																
				if($result->num_rows==0)
					$medicines[$idx]=0;																		//jesli 0 wierszy to zwracamy 0
				else{
					while($row=$result->fetch_assoc())
						$medicines[$idx++] = $row;															//wkładamy pacjentów do tabeli
				}		
			}
			return $medicines;
		}
		//edycja leku
		public function editMedicine($m){																	//przyjmuje tablice z wartosciamy do zmiany
			require('../connect.php');       
			$retVal=-1;
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				$retVal=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query = "UPDATE MEDICINE SET NAME='".$m['medicineName']."', DOSAGE=".$m['medicineDosage'].", DESCRIPTION='".$m['medicineDescription']."', STATUS='".$m['medicineStatus']."'  WHERE MED_ID=".$m['medicineID'];
				if($db->query($query))
					$retVal="success";
				else
					$retVal=0;
			}
			return $retVal;
		}
		//dodanie leku
		public function addMedicine($m){																	//przyjmuje tablice z wartosciamy do dodania
			require('../connect.php');       
			$retVal=-1;
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				$retVal=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query = "INSERT INTO MEDICINE(NAME,DOSAGE,DESCRIPTION) VALUES('".$m['medicineName']."',".$m['medicineDosage'].",'".$m['medicineDescription']."')";
				if($db->query($query))
					$retVal="success";
				else
					$retVal=0;
			}
			return $retVal;
		}
		//lista chorób
		public function getAllDiseases(){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$diseases = Array();											//tworzymy tablice
			$idx=0;
			if(mysqli_connect_errno())
				$diseases[$idx]=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query="SELECT * FROM DISEASE ORDER BY NAME";		//pobieramy dane
				$result=$db->query($query);																
				if($result->num_rows==0)
					$diseases[$idx]=0;																		//jesli 0 wierszy to zwracamy 0
				else{
					while($row=$result->fetch_assoc())
						$diseases[$idx++] = $row;															//wkładamy pacjentów do tabeli
				}		
			}
			return $diseases;
		}
		//edycja choroby
		public function editDisease($d){																	//przyjmuje tablice z wartosciamy do zmiany
			require('../connect.php');       
			$retVal=-1;
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				$retVal=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query = "UPDATE DISEASE SET NAME='".$d['diseaseName']."', SYMPTOMS='".$d['diseaseSymptoms']."', TREATMENT='".$d['diseaseTreatment']."', STATUS='".$d['diseaseStatus']."'  WHERE DIS_ID=".$d['diseaseID'];
				if($db->query($query))
					$retVal="success";
				else
					$retVal=0;
			}
			return $retVal;
		}
		//dodanie choroby
		public function addDisease($d){																	//przyjmuje tablice z wartosciamy do dodania
			require('../connect.php');       
			$retVal=-1;
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				$retVal=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query = "INSERT INTO DISEASE(NAME,SYMPTOMS,TREATMENT) VALUES('".$d['diseaseName']."','".$d['diseaseSymptoms']."','".$d['diseaseTreatment']."')";
				if($db->query($query))
					$retVal="success";
				else
					$retVal=0;
			}
			return $retVal;
		}
		//pobranie zwierząt
		public function getAllPets(){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$pets = Array();											//tworzymy tablice
			$idx=0;
			if(mysqli_connect_errno())
				$pets[$idx]=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query="SELECT * FROM CUSTOMER_ANIMAL ORDER BY CUS_ID, NAME";		//pobieramy dane
				$result=$db->query($query);																
				if($result->num_rows==0)
					$pets[$idx]=0;																		//jesli 0 wierszy to zwracamy 0
				else{
					while($row=$result->fetch_assoc()){
						$pets[$idx++] = $row;															//wkładamy zwierzaków do tabeli
						
						$query2="SELECT FIRST_NAME, LAST_NAME FROM CUSTOMER WHERE CUS_ID=".$row['CUS_ID'];				//dane o własiciwlu
						$result2=$db->query($query2);	
						$owner=$result2->fetch_assoc();
						$pets[$idx-1]['FIRST_NAME_OWNER']=$owner['FIRST_NAME'];
						$pets[$idx-1]['LAST_NAME_OWNER']=$owner['LAST_NAME'];
						
						$query2="SELECT ANI_SPE_ID,RACE FROM ANIMAL_RACE WHERE ANI_RAC_ID=".$row['ANI_RAC_ID'];				//dane o rasie
						$result2=$db->query($query2);	
						$race=$result2->fetch_assoc();
						$pets[$idx-1]['RACE']=$race['RACE'];
						
						$query3="SELECT SPECIES FROM ANIMAL_SPECIES WHERE ANI_SPE_ID=".$race['ANI_SPE_ID'];					//dane o gatunku
						$result3=$db->query($query3);	
						$species=$result3->fetch_assoc();
						$pets[$idx-1]['SPECIES']=$species['SPECIES'];
					}
				}		
			}
			return $pets;
		}
		//lista wizyt, parametr określa jakie wizyty (dzisiejsze, wczesniejsze, nastepne)
		public function getVisits($type){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$visits = Array();											//tworzymy tablice
			$idx=0;
			$query="SELECT DATE,VIS_ID,CUS_ANI_ID,HOUR,DESCRIPTION,STATUS,PRICE FROM VISIT WHERE DOC_ID=".$this->idUser." AND DATE";
			if($type=="today")
				$query.="=CURDATE() ORDER BY HOUR"; //dzisiejsze wizyty
			else if($type=="prev")
				$query.="<CURDATE() ORDER BY DATE DESC,HOUR DESC"; //poprzednie wizyty
			else if($type=="next")
				$query.=">CURDATE() ORDER BY DATE,HOUR"; //następne wizyty
			if(mysqli_connect_errno())
				$visits[$idx]=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$result=$db->query($query);																
				if($result->num_rows==0)
					$visits[$idx]=0;																		//jesli 0 wierszy to zwracamy 0
				else{
					while($row=$result->fetch_assoc()){
						$visits[$idx++] = $row;															//wkładamy wizyty do tabeli
						$query2="SELECT RACE,LAST_NAME,FIRST_NAME FROM CUSTOMER_ANIMAL JOIN CUSTOMER USING(CUS_ID) JOIN ANIMAL_RACE USING(ANI_RAC_ID) WHERE CUS_ANI_ID=".$row['CUS_ANI_ID'];											//pobieramy dane o włascicielu i rasie
						$result2=$db->query($query2);	
						$row2=$result2->fetch_assoc();
						
						$visits[$idx-1]['OWNER']=$row2['LAST_NAME']." ".$row2['FIRST_NAME'];
						$visits[$idx-1]['RACE']=$row2['RACE'];
					}
				}		
			}
			return $visits;
		}
		//zwraca zwierzęta danego klienta
		public function getCustomerAnimals($cusID){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$pets = Array();											//tworzymy tablice
			$idx=0;
			if(mysqli_connect_errno())
				$pets[$idx]=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query="SELECT * FROM CUSTOMER_ANIMAL WHERE CUS_ID=".$cusID." ORDER BY NAME";		//pobieramy dane
				$result=$db->query($query);																
				if($result->num_rows==0)
					$pets[$idx]=0;																		//jesli 0 wierszy to zwracamy 0
				else{
					while($row=$result->fetch_assoc()){
						$pets[$idx++] = $row;															//wkładamy zwierzaków do tabeli
						
						$query2="SELECT ANI_SPE_ID,RACE FROM ANIMAL_RACE WHERE ANI_RAC_ID=".$row['ANI_RAC_ID'];				//dane o rasie
						$result2=$db->query($query2);	
						$race=$result2->fetch_assoc();
						$pets[$idx-1]['RACE']=$race['RACE'];
						
						$query3="SELECT SPECIES FROM ANIMAL_SPECIES WHERE ANI_SPE_ID=".$race['ANI_SPE_ID'];					//dane o gatunku
						$result3=$db->query($query3);	
						$species=$result3->fetch_assoc();
						$pets[$idx-1]['SPECIES']=$species['SPECIES'];
					}
				}		
			}
			return $pets;
		}
		//pobiera dostepne godziny do wizyty
		public function getAvalibleHours($d,$datee){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$hours="";
			if(mysqli_connect_errno())
				$hours=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query="SELECT ".$d." FROM ADMISSION_HOURS WHERE ADM_H_ID=".$this->idUser;		//pobieramy dane
				$result=$db->query($query);																
				if($result->num_rows==0)
					$hours=0;																	//jesli 0 wierszy to zwracamy 0
				else{
					$hours=$result->fetch_assoc();												//jesli w danym dniu jest null, to nie ma przyjeć
					if($hours[$d]==null)
						$hours=0;	
					else{																		//jesli są, to zapisujemy tylko same godziny
						$hours=$hours[$d];														//hours to np. SUNDAY:9:00-10:00, a my tylko godzine chcem
						$query2="SELECT HOUR FROM VISIT WHERE DATE='".$datee."' AND DOC_ID=".$this->idUser;		//sprawdzamy czy jest juz umówiona jakas wizyta w tym dniu u tego lekarza
						$result2=$db->query($query2);	
						if(!$result2->num_rows==0)
							while($row=$result2->fetch_assoc())
								$hours.=",".$row['HOUR'];										//zapisujemy zajete godziny po przecinku
					}
				}
			}
			return $hours;
		}
		//dodanie wizyty
		public function addVisit($v){																	//przyjmuje tablice z wartosciamy do dodania
			require('../connect.php');       
			$retVal=-1;
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				$retVal=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query = "INSERT INTO VISIT(DATE,DOC_ID,CUS_ANI_ID,HOUR) VALUES('".$v['dateV']."',".$this->idUser.",".$v['animalV'].",'".$v['hourV']."')";
				if($db->query($query))
					$retVal="success";
				else
					$retVal=0;
			}
			return $retVal;
		}
		public function getVisitDetails($d){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$visDetail="";
			if(mysqli_connect_errno())
				$visDetail=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query="SELECT NAME,WEIGHT,HEIGHT,GENDER,BIRTH_DATE FROM CUSTOMER_ANIMAL WHERE CUS_ANI_ID=".$d['cusAniId'];		//pobieramy dane
				$result=$db->query($query);																
				if($result->num_rows==0)
					$visDetail=0;																	//jesli 0 wierszy to zwracamy 0
				else
					$visDetail=$result->fetch_assoc();	
				$query="SELECT NAME FROM VISIT_DISEASE JOIN DISEASE USING(DIS_ID) WHERE VIS_ID=".$d['visId'];	//pobieramy choroby
				$result=$db->query($query);																
				if($result->num_rows==0)
					$visDetail['DISEASES']=0;														//jesli 0 wierszy to wpisujemy, ze 0 chorób
				else{																				//inaczej zapisujemy je w tabeli
					$visDetail['DISEASES']=Array();
					$tmp=0;
					while($dis=$result->fetch_assoc())
						$visDetail['DISEASES'][$tmp++]=" ".$dis['NAME'];
				}
				$query="SELECT NAME FROM VISIT_SERVICE JOIN SERVICE USING(SER_ID) WHERE VIS_ID=".$d['visId'];	//pobieramy zabiegi
				$result=$db->query($query);																
				if($result->num_rows==0)
					$visDetail['SERVICES']=0;														//jesli 0 wierszy to wpisujemy, ze 0 zabiegów
				else{																				//inaczej zapisujemy je w tabeli
					$visDetail['SERVICES']=Array();
					$tmp=0;
					while($ser=$result->fetch_assoc())
						$visDetail['SERVICES'][$tmp++]=" ".$ser['NAME'];
				}
				$query="SELECT PRE_ID,DATE FROM PRESCRIPTION WHERE VIS_ID=".$d['visId'];	//pobieramy recepty
				$result=$db->query($query);																
				if($result->num_rows==0)
					$visDetail['PRESCRIPTIONS']=0;														//jesli 0 wierszy to wpisujemy, ze 0 zabiegów
				else{																				//inaczej zapisujemy je w tabeli
					$visDetail['PRESCRIPTIONS']=Array();
					$tmp=0;
					while($pre=$result->fetch_assoc()){
						$visDetail['PRESCRIPTIONS'][$tmp]=$pre;
						$query2="SELECT NAME FROM PRESCRIPTION_MEDICINE JOIN MEDICINE USING(MED_ID) WHERE PRE_ID=".$pre['PRE_ID'];	//pobieramy leków z recepty
						$result2=$db->query($query2);																
						if($result2->num_rows==0)
							$visDetail['PRESCRIPTIONS'][$tmp++]['MEDICINES']=0;										//jesli 0 wierszy to wpisujemy, ze 0 leków
						else{																				//inaczej zapisujemy je w tabeli
							$visDetail['PRESCRIPTIONS'][$tmp++]['MEDICINES']=Array();
							$tmp2=0;
							while($med=$result2->fetch_assoc())
								$visDetail['PRESCRIPTIONS'][$tmp-1]['MEDICINES'][$tmp2++]=" ".$med['NAME'];
						}
					}
				}
				$visDetail['DOCTOR']=$this->lastName." ".$this->firstName;

			}
			return $visDetail;
		}
		//pobiera statystyki
		public function getStats(){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$stats = Array();											//tworzymy tablice
			$idx=0;
			if(mysqli_connect_errno())
				$pets[$idx]=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query="SELECT COUNT(*) FROM DOCTOR";										//ilość lekarzy
				$result=$db->query($query);
				$stats['NUM_DOCTORS']=$result->fetch_assoc()['COUNT(*)'];	
				
				$query="SELECT COUNT(*) FROM CUSTOMER";										//ilość klientów
				$result=$db->query($query);
				$stats['NUM_CUSTOMERS']=$result->fetch_assoc()['COUNT(*)'];		

				$query="SELECT COUNT(*) FROM CUSTOMER_ANIMAL";										//ilość zwierząt
				$result=$db->query($query);
				$stats['NUM_CUSTOMER_ANIMALS']=$result->fetch_assoc()['COUNT(*)'];	

				$query="SELECT COUNT(*) FROM MEDICINE";																								//ilość leków
				$result=$db->query($query);
				$stats['NUM_MEDICINES']=$result->fetch_assoc()['COUNT(*)'];	
				
				$query="SELECT COUNT(*) FROM DISEASE";																								//ilość chorób
				$result=$db->query($query);
				$stats['NUM_DISEASES']=$result->fetch_assoc()['COUNT(*)'];
				
				$query="SELECT COUNT(*) FROM VISIT WHERE DATE<CURDATE() OR DATE=CURDATE() AND HOUR<CURTIME()";										//ilość odbytych wizyt
				$result=$db->query($query);
				$stats['NUM_PREV_VISITS']=$result->fetch_assoc()['COUNT(*)'];
				
				$query="SELECT COUNT(*) FROM VISIT WHERE DATE>CURDATE() OR DATE=CURDATE() AND HOUR>CURTIME()";										//ilość zaplanowanych wizyt
				$result=$db->query($query);
				$stats['NUM_NEXT_VISITS']=$result->fetch_assoc()['COUNT(*)'];
				
				$query="SELECT concat(LAST_NAME,' ',FIRST_NAME) as NEW_CUS FROM CUSTOMER ORDER BY CUS_ID DESC LIMIT 1";								//najnowszy uzytkownik
				$result=$db->query($query);
				$stats['NEWEST_CUSTOMER']=$result->fetch_assoc()['NEW_CUS'];
				
				$query="SELECT RACE, COUNT(ANI_RAC_ID) AS NUM FROM customer_animal JOIN animal_race USING(ANI_RAC_ID) GROUP BY ANI_RAC_ID ORDER BY NUM DESC LIMIT 1";				
				$result=$db->query($query);
				$row=$result->fetch_assoc();
				$stats['MOST_ANIMALS']=$row['RACE']." (".$row['NUM'].")";
				
				$stats['DATE']=date('Y-m-d H:i:s');
				
			}
			return $stats;
		}
		//pobranie diagnoz
		function getAllDiagnoses(){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			$diagnoses = Array();											//tworzymy tablice
			$idx=0;
			if(mysqli_connect_errno())
				$diagnoses[$idx]=1;											//jesli błąd bazy to zwracamy 1
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$query="SELECT * FROM DIAGNOSE";		//pobieramy dane
				$result=$db->query($query);																
				if($result->num_rows==0)
					$diagnoses[$idx]=0;																		//jesli 0 wierszy to zwracamy 0
				else{
					while($row=$result->fetch_assoc())
						$diagnoses[$idx++] = $row;															//wkładamy pacjentów do tabeli
				}		
			}
			return $diagnoses;
		}
	}
?>