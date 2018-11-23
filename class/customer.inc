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

	}
?>