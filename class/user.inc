<?php
	class User{
		protected $isLogged = false;									//czy zalogowany
		protected $idUser;												//jego id
		protected $accType;												//typ konta (CUSTOMER, DOCTOR)
		protected $firstName;
		protected $lastName;
		protected $email;
		protected $address;
		protected $phoneNumber;
		protected $db;													//połącznie z baza
		
		protected function __construct($id,$db){					//kostruktur pobiera id, typ konta i połączenie
			$this->idUser=$id;
			$this->isLogged=true;										//jesli sie udało to zmienia, ze zalogowany
			$this->db=$db;
		}
		
		public function checkIsLogged(){								//zwraca czy zalogowany
			if($this->isLogged)
				return true;
			else
				return false;
		}

		public function getFirstName(){
			return $this->firstName;
		}

		public function setFirstName($fN){
			$this->firstName = $fN;
		}

		public function getLastName(){
			return $this->lastName;
		}

		public function setLastName($lN){
			$this->lastName = $lN;
		}

		public function getEmail(){
			return $this->email;
		}
		
		public function getPhoneNumber(){
			return $this->phoneNumber;
		}

		public function setPhoneNumber($pN){
			$this->phoneNumber = $pN;
		}
		
		public function getAddress(){
			return $this->address;
		}

		public function setAddress($a){
			$this->address = $a;
		}

		public function getUserID(){
			return $this->idUser;
		}

		public function getAccType(){
			return $this->accType;
		}
		
		public static function addUser($fN, $lN, $e, $p){
			$retVal;
			require('connect.php');
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
            $retVal = 1;
			else{
				$db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
				$hashedPassword = password_hash($p, PASSWORD_DEFAULT);
				$query = "INSERT INTO customer (FIRST_NAME, LAST_NAME, PASSWORD, EMAIL) VALUES('".$fN."','".$lN."','".$hashedPassword."','".$e."')";
				$db->query($query);
				$retVal = 0;
			}
			return $retVal;
		}
		
		public function getLastSuccessfulLogin(){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				return "Brak danych";
			else{
				$query="SELECT DATE FROM LOGIN_HISTORY WHERE ".substr($this->accType,0,3)."_ID=".$this->idUser." AND RESULT='ACCESS' ORDER BY DATE DESC LIMIT 1 OFFSET 1"; //offset zeby to nie było aktualne lgoowanie, tylko poprzednie udane
				$result=$db->query($query);
				if($result->num_rows==0)
					return "Brak danych";
				else{
					$row = $result->fetch_assoc();
					return $row['DATE'];
				}
			}
			return "Brak danych";
		}
		
		public function getLastFailedLogin(){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				return "Brak danych";
			else{
				$query="SELECT DATE FROM LOGIN_HISTORY WHERE ".substr($this->accType,0,3)."_ID=".$this->idUser." AND RESULT='DENIED' ORDER BY DATE DESC LIMIT 1";
				$result=$db->query($query);
				if($result->num_rows==0)
					return "Brak danych";
				else{
					$row = $result->fetch_assoc();
					return $row['DATE'];
				}
			}
			return "Brak danych";
		}

		public function changePassword($pass){
			$retVal;
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				$retVal = 1;
			else{
				$hashedPassword = password_hash($pass, PASSWORD_DEFAULT);
				$query="UPDATE ".$this->accType." SET PASSWORD = '".$hashedPassword."' WHERE ".substr($this->accType,0,3)."_ID=".$this->idUser;
				$result=$db->query($query);
				$retVal = 0;
			}
			return $retVal;
		}
	}

?>