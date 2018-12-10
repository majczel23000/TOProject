<?php
	session_start();
	require("../class/doctor.inc");
	require("../class/doctorPage.inc");
	
	class MedicinesService extends DoctorPage{
		
		public function __construct($t,$u){
			parent::__construct($t,$u);
		}
		
		protected function showContent(){															//nadpisana funkcja poakzujaća zawartosc
			echo "\t\t	<div id=\"doctorSubMenu\">\n";
			echo "\t\t\t	<a id=\"showMedicinesList\" class=\"btn btnMenu\"> <i class=\"fas fa-bars\" style=\"margin-right: 10px\"></i>Lista wszystkich leków</a>\n";
			echo "\t\t\t	<a id=\"addMedicine\" class=\"btn btnMenu\"> <i class=\"fas fa-plus\" style=\"margin-right: 10px\"></i>Dodaj lek</a>\n";
			echo "\t\t	</div>\n";
			echo "\t\t	<div id=\"contentTitle\">\n";
			echo "\t\t	</div>\n";
            echo "\t\t	<div id=\"contentDescription\">\n";
            echo "\t\t	</div>\n";
        }
	}

	$medicines = new MedicinesService("Obsługa leków",unserialize($_SESSION['DOCTOR']));
	$scripts = Array("jquery-3.3.1.min.js","doctorMedicinesService.js","logout.js","messages.js");
	$medicines->setScripts($scripts);
	$medicines->showPage();
?>