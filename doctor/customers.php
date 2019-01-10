<?php
	session_start();
	require("../class/doctor.inc");
	require("../class/doctorPage.inc");
	
	class CustomerList extends DoctorPage{
		
		public function __construct($t,$u){
			parent::__construct($t,$u);
		}
		
		protected function showContent(){															//nadpisana funkcja poakzujaća zawartosc
			echo "\t\t	<div id=\"doctorSubMenu\">\n";
			echo "\t\t\t	<a id=\"showCustomerList\" class=\"btn btnMenu\"> <i class=\"fas fa-bars\" style=\"margin-right: 10px\"></i>Lista wszystkich klientów</a>\n";
			echo "\t\t\t	<a id=\"showCustomerDetail\" class=\"btn btnMenu\"> <i class=\"fas fa-clipboard\" style=\"margin-right: 10px\"></i>Pokaż szczegółowe dane klienta</a>\n";
			echo "\t\t	</div>\n";
			echo "\t\t	<div id=\"contentTitle\">\n";
			echo "\t\t	</div>\n";
            echo "\t\t	<div id=\"contentDescription\">\n";
            echo "\t\t	</div>\n";
        }
	}

	$customers = new CustomerList("Obsługa klientów",unserialize($_SESSION['DOCTOR']));
	$scripts = Array("jquery-3.3.1.min.js","doctorPatientService.js","logout.js");
	$customers->setScripts($scripts);
	$customers->showPage();
?>