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
			echo "\t\t\t\t\t\t <td colspan=\"2\" class=\"sector-title\">Personal Data</td>\n";
			echo "\t\t\t\t\t </tr> \n";
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
			echo "\t\t\t\t\t\t <td>Academic Title</td>\n";
			echo "\t\t\t\t\t\t <td id=\"academicTitle\">".$this->user->getAcademicTitle()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			$adminssionHours=$this->user->getAdmissionHours();
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td colspan=\"2\" class=\"sector-title\">Adminssion Hours</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Monday</td>\n";
			echo "\t\t\t\t\t\t <td id=\"mondayAH\" class=\"adminssion-hours\">".$this->user->getAdmissionHours()['MONDAY']."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Tuesday</td>\n";
			echo "\t\t\t\t\t\t <td id=\"tuesdayAH\" class=\"adminssion-hours\">".$this->user->getAdmissionHours()['TUESDAY']."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Wendesday</td>\n";
			echo "\t\t\t\t\t\t <td id=\"wendesdayAH\" class=\"adminssion-hours\">".$this->user->getAdmissionHours()['WEDNESDAY']."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Thursday</td>\n";
			echo "\t\t\t\t\t\t <td id=\"thursdayAH\" class=\"adminssion-hours\">".$this->user->getAdmissionHours()['THURSDAY']."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Friday</td>\n";
			echo "\t\t\t\t\t\t <td id=\"fridayAH\" class=\"adminssion-hours\">".$this->user->getAdmissionHours()['FRIDAY']."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Saturday</td>\n";
			echo "\t\t\t\t\t\t <td id=\"saturdayAH\" class=\"adminssion-hours\">".$this->user->getAdmissionHours()['SATURDAY']."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Sunday</td>\n";
			echo "\t\t\t\t\t\t <td id=\"sundayAH\" class=\"adminssion-hours\">".$this->user->getAdmissionHours()['SUNDAY']."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td colspan=\"2\" class=\"sector-title\">Account Info</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Last successful login</td>\n";
			echo "\t\t\t\t\t\t <td id=\"lastSuccesLog\">".$this->user->getLastSuccessfulLogin()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Last failed login</td>\n";
			echo "\t\t\t\t\t\t <td id=\"lastfailLog\">".$this->user->getLastFailedLogin()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t </tbody> \n";
			echo "\t\t\t </table> \n";
			echo "\t\t\t <button id=\"editUserInfoButton\" class=\"btnEdit center\">Edytuj dane</button>\n";
			echo "\t\t	</div>\n";
		}
	}

	$profile=new DoctorProfile("Mój profil",unserialize($_SESSION['DOCTOR']));
	$profile->showPage();
?>