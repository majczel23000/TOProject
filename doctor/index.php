<?php
	session_start();
	require("../class/doctor.inc");
	require("../class/doctorPage.inc");
	
	class DoctorProfile extends DoctorPage{
		
		public function __construct($t,$u){
			parent::__construct($t,$u);
		}
		
		protected function showContent(){															//nadpisana funkcja poakzujaća zawartosc
			echo "\t\t	<div id=\"contentTitle\">\n";
			echo "\t\t\t<h1>Profil lekarza ".$this->user->getFirstName()." ".$this->user->getLastName()."</h1>\n";
			echo "\t\t	</div>\n";
			echo "\t\t	<div id=\"contentDescription\">\n";
			echo "\t\t\t <table id=\"userInfo\"> \n";
			echo "\t\t\t\t  <tbody class=\"userInfoHover\">\n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>First Name</td>\n";
			echo "\t\t\t\t\t\t <td class=\"tdBeforeEdit\" id=\"firstName\">".$this->user->getFirstName()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Last Name</td>\n";
			echo "\t\t\t\t\t\t <td id=\"lastName\">".$this->user->getLastName()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Email</td>\n";
			echo "\t\t\t\t\t\t <td id=\"email\">".$this->user->getEmail()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Address</td>\n";
			echo "\t\t\t\t\t\t <td id=\"address\">".$this->user->getAddress()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Phone number</td>\n";
			echo "\t\t\t\t\t\t <td id=\"phoneNumber\">".$this->user->getPhoneNumber()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Last successful login</td>\n";
			echo "\t\t\t\t\t\t <td id=\"lastSuccesLog\">".$this->getLastSuccessfulLogin()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Last failed login</td>\n";
			echo "\t\t\t\t\t\t <td id=\"lastfailLog\">".$this->getLastFailedLogin()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t </tbody> \n";
			echo "\t\t\t </table> \n";
			echo "\t\t\t <button id=\"editUserInfoButton\" class=\"btnEdit center\">Edytuj dane</button>\n";
			echo "\t\t	</div>\n";
		}
		
		private function getLastSuccessfulLogin(){
			require('../connect.php');        
			@$db=new mysqli($server,$user,$password,$dataBase);
			if(mysqli_connect_errno())
				return "Brak danych";
			else{
				$query="SELECT DATE FROM LOGIN_HISTORY WHERE DOC_ID=".$this->user->getUserID()." AND RESULT='ACCESS' ORDER BY DATE DESC LIMIT 1 OFFSET 1"; //offset zeby to nie było aktualne lgoowanie, tylko poprzednie udane
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
				$query="SELECT DATE FROM LOGIN_HISTORY WHERE DOC_ID=".$this->user->getUserID()." AND RESULT='DENIED' ORDER BY DATE DESC LIMIT 1";
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

	$profile=new DoctorProfile("Mój profil",unserialize($_SESSION['DOCTOR']));
	$profile->showPage();
?>