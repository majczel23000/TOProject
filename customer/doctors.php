<?php
	session_start();
	require("../class/customer.inc");
	require("../class/customerPage.inc");
	
	class DoctorList extends CustomerPage{

		public function __construct($t,$u){
			parent::__construct($t,$u);
		}
		
		protected function showContent(){															//nadpisana funkcja poakzujaća zawartosc
			echo "\t\t	<div id=\"contentTitle\">\n";
			echo "\t\t\t<h1><i class=\"fas fa-list-ul\"></i> Lista lekarzy kliniki</h1>\n";
			echo "\t\t	</div>\n";
            echo "\t\t	<div id=\"contentDescription\">\n";
            echo "\t\t <div id=\"searchDoctorBox\">";
            echo "\t\t\t <input id=\"searchDoctorInput\" type=\"text\" placeholder=\"Wyszukaj (wpisz minimum 3 znaki)\">";
            echo "\t\t </div>";
            echo "\t\t\t <table id=\"doctorsList\"> \n";
            echo "\t\t\t\t <thead> \n";
            echo "\t\t\t\t\t <tr> \n";
            echo "\t\t\t\t\t\t <th>Imię</th> \n";
            echo "\t\t\t\t\t\t <th>Nazwisko</th> \n";
            echo "\t\t\t\t\t\t <th></th> \n";
            echo "\t\t\t\t\t </tr> \n";
            echo "\t\t\t\t </thead> \n";
            echo "\t\t\t\t  <tbody id=\"doctorsListTbody\"\n"; 
            echo "\t\t\t\t </tbody> \n";
			echo "\t\t\t </table> \n";
            echo "\t\t	</div>\n";
        }		
	}

    $doctors = new DoctorList("Lista lekarzy",unserialize($_SESSION['CUSTOMER']));
    $scripts = Array("jquery-3.3.1.min.js","customerDoctorService.js","logout.js","messages.js");
    $doctors->setScripts($scripts);
	$doctors->showPage();
?>