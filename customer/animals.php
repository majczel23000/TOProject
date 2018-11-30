<?php
	session_start();
	require("../class/customer.inc");
	require("../class/customerPage.inc");
	
	class AnimalList extends CustomerPage{

		public function __construct($t,$u){
			parent::__construct($t,$u);
		}
		
		protected function showContent(){
            echo "\t\t	<button id=\"btnAddAnimal\"><i class=\"fas fa-plus-circle\" style=\"margin-right: 10px\"></i>Dodaj zwierzaka</button>\n";
            echo "\t\t	<button id=\"btnStatsAnimal\"><i class=\"fas fa-poll\" style=\"margin-right: 10px\"></i>Statystyki</button>\n";
            echo "\t\t <div class=\"clear\"></div>";
            echo "\t\t	<div id=\"contentTitle\">\n";
			echo "\t\t\t<h1><i class=\"fas fa-paw\"></i> Twoje zwierzaki</h1>\n";
			echo "\t\t	</div>\n";
            echo "\t\t	<div id=\"contentDescription\">\n";
            // echo "\t\t <div id=\"searchDoctorBox\">";
            // echo "\t\t\t <input id=\"searchAnimalInput\" type=\"text\" placeholder=\"Wyszukaj zwierzaka (minimum 3 znaki)\">";
            // echo "\t\t </div>";
            echo "\t\t\t <table id=\"animalList\"> \n";
            echo "\t\t\t\t <thead id=\"animalListThead\"> \n";
            echo "\t\t\t\t\t <tr> \n";
            echo "\t\t\t\t\t\t <th style=\"width: 33.3%\">Gatunek</th> \n";
            echo "\t\t\t\t\t\t <th style=\"width: 33.3%\">Rasa</th> \n";
            echo "\t\t\t\t\t\t <th style=\"width: 33.3%\">Imię</th> \n";
            echo "\t\t\t\t\t </tr> \n";
            echo "\t\t\t\t </thead> \n";
            echo "\t\t\t\t  <tbody id=\"animalsListTbody\"\n"; 
            echo "\t\t\t\t </tbody> \n";
			echo "\t\t\t </table> \n";
            echo "\t\t	</div>\n";
        }		
	}

    $doctors = new AnimalList("Twoje zwierzęta",unserialize($_SESSION['CUSTOMER']));
    $scripts = Array("jquery-3.3.1.min.js","customerAnimalService.js","logout.js","messages.js");
    $doctors->setScripts($scripts);
	$doctors->showPage();
?>