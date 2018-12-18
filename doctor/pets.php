<?php
	session_start();
	require("../class/doctor.inc");
	require("../class/doctorPage.inc");
	
	class PetsService extends DoctorPage{
		
		public function __construct($t,$u){
			parent::__construct($t,$u);
		}
		
		protected function showContent(){															//nadpisana funkcja poakzujaća zawartosc
			echo "\t\t	<div id=\"doctorSubMenu\">\n";
			echo "\t\t\t	<a id=\"showPetsList\" class=\"btn btnMenu\"> <i class=\"fas fa-bars\" style=\"margin-right: 10px\"></i>Lista wszystkich zwierząt</a>\n";
			echo "\t\t	</div>\n";
			echo "\t\t	<div id=\"contentTitle\">\n";
			echo "\t\t	</div>\n";
            echo "\t\t	<div id=\"contentDescription\">\n";
            echo "\t\t	</div>\n";
        }
	}

	$pets = new PetsService("Obsługa zwierząt",unserialize($_SESSION['DOCTOR']));
	$scripts = Array("jquery-3.3.1.min.js","doctorPetsService.js","logout.js","messages.js");
	$pets->setScripts($scripts);
	$pets->showPage();
?>