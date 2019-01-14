<?php
	session_start();
	require("../class/customer.inc");
	require("../class/customerPage.inc");
	
	class CustomerProfile extends CustomerPage{
		
		public function __construct($t,$u){
			parent::__construct($t,$u);
		}
		
		protected function showContent(){															//nadpisana funkcja poakzujaća zawartosc
			echo "\t\t	<div id=\"contentTitle\">\n";
			echo "\t\t\t<h1><i class=\"fas fa-user\"></i> Profil klienta ".$this->user->getFirstName()." ".$this->user->getLastName()."</h1>\n";
			echo "\t\t	</div>\n";
			echo "\t\t	<div id=\"contentDescription\">\n";
			echo "\t\t\t <table id=\"userInfo\"> \n";
			echo "\t\t\t\t  <tbody class=\"userInfoHover\" \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Imię</td>\n";
			echo "\t\t\t\t\t\t <td class=\"tdBeforeEdit\" id=\"firstName\">".$this->user->getFirstName()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Nazwisko</td>\n";
			echo "\t\t\t\t\t\t <td class=\"tdBeforeEdit\"  id=\"lastName\">".$this->user->getLastName()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Email</td>\n";
			echo "\t\t\t\t\t\t <td class=\"tdBeforeEdit\"  id=\"email\">".$this->user->getEmail()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Adres</td>\n";
			$address = "";
			if($this->user->getAddress() === '')
				$address = "Brak danych";
			else 
				$address = $this->user->getAddress();
			echo "\t\t\t\t\t\t <td class=\"tdBeforeEdit\"  id=\"address\">".$address."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Numer telefonu</td>\n";
			$phone = "";
			if($this->user->getPhoneNumber() === '')
				$phone = "Brak danych";
			else 
				$phone = $this->user->getPhoneNumber();
			echo "\t\t\t\t\t\t <td class=\"tdBeforeEdit\" id=\"phoneNumber\">".$phone."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Ostatnie udane logowanie</td>\n";
			echo "\t\t\t\t\t\t <td class=\"tdBeforeEdit\" id=\"lastSuccesLog\">".$this->getLastSuccessfulLogin()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Ostatnie nieudane logowanie</td>\n";
			echo "\t\t\t\t\t\t <td class=\"tdBeforeEdit\" id=\"lastfailLog\">".$this->getLastFailedLogin()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t </tbody> \n";
			echo "\t\t\t </table> \n";
			echo "\t\t\t <button id=\"editUserInfoButton\" class=\"btnEdit center\"><i class=\"fas fa-edit\"></i> Edytuj dane</button>\n";
			echo "\t\t\t <button id=\"changePasswordButton\" class=\"btnLogin center\"><i class=\"fas fa-edit\"></i> Zmień hasło</button>\n";
			echo "\t\t	</div>\n";
		}

		private function getLastSuccessfulLogin(){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				return "Brak danych";
			else{
				$query="SELECT DATE FROM LOGIN_HISTORY WHERE CUS_ID=".$this->user->getUserID()." AND RESULT='ACCESS' ORDER BY DATE DESC LIMIT 1";
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
		
		private function getLastFailedLogin(){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				return "Brak danych";
			else{
				$query="SELECT DATE FROM LOGIN_HISTORY WHERE CUS_ID=".$this->user->getUserID()." AND RESULT='DENIED' ORDER BY DATE DESC LIMIT 1";
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
	}

	$profile = new CustomerProfile("Mój profil",unserialize($_SESSION['CUSTOMER']));
	$profile->showPage();
?>