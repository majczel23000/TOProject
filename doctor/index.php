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
			echo "\t\t\t\t\t\t <td colspan=\"2\" class=\"sector-title\">Dane personalne</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Imię</td>\n";
			echo "\t\t\t\t\t\t <td class=\"tdBeforeEdit\" id=\"firstName\">".$this->user->getFirstName()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Nazwisko</td>\n";
			echo "\t\t\t\t\t\t <td id=\"lastName\">".$this->user->getLastName()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Adres e-mail</td>\n";
			echo "\t\t\t\t\t\t <td id=\"email\">".$this->user->getEmail()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Adres</td>\n";
			echo "\t\t\t\t\t\t <td id=\"address\">".$this->user->getAddress()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Numer telefonu</td>\n";
			echo "\t\t\t\t\t\t <td id=\"phoneNumber\">".$this->user->getPhoneNumber()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Tytuł naukowy</td>\n";
			echo "\t\t\t\t\t\t <td id=\"academicTitle\">".$this->user->getAcademicTitle()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			$adminssionHours=$this->user->getAdmissionHours();
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td colspan=\"2\" class=\"sector-title\">Godziny przyjęć</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Poniedziałek</td>\n";
			echo "\t\t\t\t\t\t <td id=\"mondayAH\" class=\"adminssion-hours\">".$this->user->getAdmissionHours()['MONDAY']."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Wtorek</td>\n";
			echo "\t\t\t\t\t\t <td id=\"tuesdayAH\" class=\"adminssion-hours\">".$this->user->getAdmissionHours()['TUESDAY']."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Środa</td>\n";
			echo "\t\t\t\t\t\t <td id=\"wednesdayAH\" class=\"adminssion-hours\">".$this->user->getAdmissionHours()['WEDNESDAY']."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Czwartek</td>\n";
			echo "\t\t\t\t\t\t <td id=\"thursdayAH\" class=\"adminssion-hours\">".$this->user->getAdmissionHours()['THURSDAY']."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Piątek</td>\n";
			echo "\t\t\t\t\t\t <td id=\"fridayAH\" class=\"adminssion-hours\">".$this->user->getAdmissionHours()['FRIDAY']."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Sobota</td>\n";
			echo "\t\t\t\t\t\t <td id=\"saturdayAH\" class=\"adminssion-hours\">".$this->user->getAdmissionHours()['SATURDAY']."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Niedziela</td>\n";
			echo "\t\t\t\t\t\t <td id=\"sundayAH\" class=\"adminssion-hours\">".$this->user->getAdmissionHours()['SUNDAY']."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td colspan=\"2\" class=\"sector-title\">Informacje o koncie</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Ostatnie udane logowanie</td>\n";
			echo "\t\t\t\t\t\t <td id=\"lastSuccesLog\">".$this->user->getLastSuccessfulLogin()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t\t <tr> \n";
			echo "\t\t\t\t\t\t <td>Ostatnie nieudane logowanie</td>\n";
			echo "\t\t\t\t\t\t <td id=\"lastfailLog\">".$this->user->getLastFailedLogin()."</td>\n";
			echo "\t\t\t\t\t </tr> \n";
			echo "\t\t\t\t </tbody> \n";
			echo "\t\t\t </table> \n";
			echo "\t\t\t <button id=\"editUserInfoButton\" class=\"btnEdit center\"><i class=\"fas fa-edit\"></i> Edytuj dane</button>\n";
			echo "\t\t\t <button id=\"changePasswordButton\" class=\"btnLogin center\"><i class=\"fas fa-edit\"></i> Zmień hasło</button>\n";
			echo "\t\t	</div>\n";
		}
	}

	$profile=new DoctorProfile("Mój profil",unserialize($_SESSION['DOCTOR']));
	$profile->showPage();
?>