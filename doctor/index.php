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
				echo "\t\t\t<h1>Moje Dane</h1>\n";
				echo "\t\t	</div>\n";
				echo "\t\t	<div id=\"contentDescription\">\n";
				echo "\t\t\t".$this->user."\n";
				echo "\t\t	</div>\n";
			}
	}

	$profile = new DoctorProfile("Mój Profil",unserialize($_SESSION['DOCTOR']));
	$profile->showPage();
?>