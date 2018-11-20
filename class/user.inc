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
	}

?>