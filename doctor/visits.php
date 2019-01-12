<?php
	session_start();
	require("../class/doctor.inc");
	require("../class/doctorPage.inc");
	
	class VisitsService extends DoctorPage{
		
		public function __construct($t,$u){
			parent::__construct($t,$u);
		}
		
		protected function showContent(){															//nadpisana funkcja poakzujaća zawartosc
			echo "\t\t	<div id=\"doctorSubMenu\">\n";
			echo "\t\t\t	<a id=\"prevVisits\" class=\"btn btnMenu\"> <i class=\"fas fa-backward\" style=\"margin-right: 10px\"></i>Poprzednie wizyty</a>\n";
			echo "\t\t\t	<a id=\"todayVisits\" class=\"btn btnMenu\"> <i class=\"fas fa-arrow-down\" style=\"margin-right: 10px\"></i>Dzisiejsze wizyty</a>\n";
			echo "\t\t\t	<a id=\"nextVisits\" class=\"btn btnMenu\"> <i class=\"fas fa-forward\" style=\"margin-right: 10px\"></i>Przyszłe wizyty</a>\n";
			echo "\t\t\t	<a id=\"addVisit\" class=\"btn btnMenu\"> <i class=\"fas fa-calendar-plus\" style=\"margin-right: 10px\"></i>Dodaj nową wizytę </a>\n";
			echo "\t\t\t	<a id=\"countMedDos\" class=\"btn btnMenu\"> <i class=\"fas fa-calculator\" style=\"margin-right: 10px\"></i>Oblicz dawkę leku </a>\n";
			echo "\t\t\t	<a id=\"supportDiagnose\" class=\"btn btnMenu\"> <i class=\"fas fa-ambulance\" style=\"margin-right: 10px\"></i> Wspomaganie diagnozy </a>\n";
			echo "\t\t	</div>\n";
			echo "\t\t	<div id=\"contentTitle\">\n";
			echo "\t\t	</div>\n";
            echo "\t\t	<div id=\"contentDescription\">\n";
            echo "\t\t	</div>\n";
        }
	}

	$visits = new VisitsService("Obsługa wizyt",unserialize($_SESSION['DOCTOR']));
	$scripts = Array("jquery-3.3.1.min.js","doctorVisitsService.js","logout.js","messages.js");
	$visits->setScripts($scripts);
	$visits->showPage();
?>