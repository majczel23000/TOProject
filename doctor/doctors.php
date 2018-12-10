<?php
	session_start();
	require("../class/doctor.inc");
	require("../class/doctorPage.inc");
	
	class DoctorsService extends DoctorPage{
		
		public function __construct($t,$u){
			parent::__construct($t,$u);
		}
		
		protected function showContent(){															//nadpisana funkcja poakzujaća zawartosc
			echo "\t\t	<div id=\"doctorSubMenu\">\n";
			echo "\t\t\t	<a id=\"showDoctorList\" value=\"".$this->user->getAdmType()."\" class=\"btn btnMenu\"> <i class=\"fas fa-bars\" style=\"margin-right: 10px\"></i>Lista wszystkich lekarzy</a>\n";	//value przekazywane, zeby nie było przycisku edycji dla normalnych lekarzy w szczegółach
			if($this->user->getAdmType()=="HEAD"){
				echo "\t\t\t	<a id=\"editDoctorData\" class=\"btn btnMenu\"> <i class=\"fas fa-cogs\" style=\"margin-right: 10px\"></i>Edytuj dane lekarza</a>\n";
				echo "\t\t\t	<a id=\"addDoctor\" class=\"btn btnMenu\"> <i class=\"fas fa-plus\" style=\"margin-right: 10px\"></i>Dodaj nowego lekarza</a>\n";
			}
			echo "\t\t	</div>\n";
			echo "\t\t	<div id=\"contentTitle\">\n";
			echo "\t\t	</div>\n";
            echo "\t\t	<div id=\"contentDescription\">\n";
            echo "\t\t	</div>\n";
        }
	}

	$doctors = new DoctorsService("Obsługa lekarzy",unserialize($_SESSION['DOCTOR']));
	$scripts = Array("jquery-3.3.1.min.js","doctorDoctorsService.js","logout.js","messages.js");
	$doctors->setScripts($scripts);
	$doctors->showPage();
?>