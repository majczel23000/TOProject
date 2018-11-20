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
			echo "\t\t\t<h1>Profil klienta ".$this->user->getFirstName()." ".$this->user->getLastName()."</h1>\n";
			echo "\t\t	</div>\n";
			echo "\t\t	<div id=\"contentDescription\">\n";
			echo "\t\t\t <table id=\"userInfo\"> \n";
			echo "\t\t\t\t  <tbody class=\"userInfoHover\" \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>First Name</td>\n";
			echo "\t\t\t\t\t\t <td class=\"tdBeforeEdit\" id=\"firstName\">".$this->user->getFirstName()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t\t <td>Last Name</td>\n";
			echo "\t\t\t\t\t\t <td id=\"lastName\">".$this->user->getLastName()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t\t <td>Email</td>\n";
			echo "\t\t\t\t\t\t <td id=\"email\">".$this->user->getEmail()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t\t <td>Address</td>\n";
			echo "\t\t\t\t\t\t <td id=\"address\">".$this->user->getAddress()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t\t <td>Phone number</td>\n";
			echo "\t\t\t\t\t\t <td id=\"phoneNumber\">".$this->user->getPhoneNumber()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t </tbody> \n";
			echo "\t\t\t </table> \n";
			echo "\t\t\t <button id=\"editUserInfoButton\" class=\"btnEdit center\">Edytuj dane</button>\n";
			echo "\t\t	</div>\n";
		}
	}

	$profile = new CustomerProfile("Mój profil",unserialize($_SESSION['CUSTOMER']));
	$profile->showPage();
?>