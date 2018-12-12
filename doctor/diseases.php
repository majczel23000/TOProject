<?php
	session_start();
	require("../class/doctor.inc");
	require("../class/doctorPage.inc");
	
	class DiseasesService extends DoctorPage{
		
		public function __construct($t,$u){
			parent::__construct($t,$u);
		}
		
		protected function showContent(){															//nadpisana funkcja poakzujaća zawartosc
			echo "\t\t	<div id=\"doctorSubMenu\">\n";
			echo "\t\t\t	<a id=\"showDiseasesList\" class=\"btn btnMenu\"> <i class=\"fas fa-bars\" style=\"margin-right: 10px\"></i>Lista wszystkich chorób</a>\n";
			echo "\t\t\t	<a id=\"addDisease\" class=\"btn btnMenu\"> <i class=\"fas fa-plus\" style=\"margin-right: 10px\"></i>Dodaj chorobę</a>\n";
			echo "\t\t	</div>\n";
			echo "\t\t	<div id=\"contentTitle\">\n";
			echo "\t\t	</div>\n";
            echo "\t\t	<div id=\"contentDescription\">\n";
            echo "\t\t	</div>\n";
        }
	}

	$diseases = new DiseasesService("Obsługa chorób",unserialize($_SESSION['DOCTOR']));
	$scripts = Array("jquery-3.3.1.min.js","doctorDiseasesService.js","logout.js","messages.js");
	$diseases->setScripts($scripts);
	$diseases->showPage();
?>