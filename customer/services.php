<?php
	session_start();
	require("../class/customer.inc");
	require("../class/customerPage.inc");
	
	class ServicesList extends CustomerPage{

		public function __construct($t,$u){
			parent::__construct($t,$u);
		}
		
		protected function showContent(){
            echo "\t\t <div id=\"contentTitle\">\n";
			echo "\t\t\t<h1><i class=\"fas fa-clipboard-list\"></i> Lista świadczonych usług (zabiegów)</h1>\n";
			echo "\t\t </div>\n";
            echo "\t\t <div id=\"contentDescription\">\n";
            echo "\t\t <div id=\"searchServiceBox\">";
            echo "\t\t\t <input id=\"searchServiceInput\" type=\"text\" placeholder=\"Wyszukaj (wpisz minimum 3 znaki)\">";
            echo "\t\t </div>";
            echo "\t\t\t <table id=\"servicesList\"> \n";
            echo "\t\t\t\t <thead> \n";
            echo "\t\t\t\t\t <tr> \n";
            echo "\t\t\t\t\t\t <th>Nazwa</th> \n";
            echo "\t\t\t\t\t\t <th>Cena</th> \n";
            echo "\t\t\t\t\t\t <th>Opis</th> \n";
            echo "\t\t\t\t\t </tr> \n";
            echo "\t\t\t\t </thead> \n";
            echo "\t\t\t\t  <tbody id=\"servicesListTbody\"\n"; 
            echo "\t\t\t\t </tbody> \n";
			echo "\t\t\t </table> \n";
            echo "\t\t </div>";
        }		
	}

    $services = new ServicesList("Usługi",unserialize($_SESSION['CUSTOMER']));
    $scripts = Array("jquery-3.3.1.min.js","customerServicesService.js","logout.js","messages.js");
    $services->setScripts($scripts);
	$services->showPage();
?>