<?php
	session_start();
	require("../class/customer.inc");
	require("../class/customerPage.inc");
	
	class VisitsList extends CustomerPage{

		public function __construct($t,$u){
			parent::__construct($t,$u);
		}
		
		protected function showContent(){
            echo "\t\t <div id=\"visitSubMenu\">\n";
			echo "\t\t\t <a id=\"addVisit\" class=\"btn btnMenu\"> <i class=\"fas fa-plus\" style=\"margin-right: 10px\"></i>Umów wizytę</a>\n";
			echo "\t\t\t <a id=\"historyVisits\" class=\"btn btnMenu\"> <i class=\"fas fa-history\" style=\"margin-right: 10px\"></i>Pokaż historię swoich wizyt</a>\n";
            echo "\t\t </div>\n";
            echo "\t\t <div id=\"contentTitle\">\n";
			// echo "\t\t\t<h1><i class=\"fas fa-eye\"></i> Wizyty</h1>\n";
			echo "\t\t </div>\n";
			echo "\t\t <div id=\"visitFiltersContainer\">\n";
            echo "\t\t </div>\n";
            echo "\t\t <div id=\"contentDescription\">\n";
            echo "\t\t </div>\n";
        }		
	}

    $visits = new VisitsList("Wizyty",unserialize($_SESSION['CUSTOMER']));
    $scripts = Array("jquery-3.3.1.min.js","customerVisitService.js","logout.js","messages.js");
    $visits->setScripts($scripts);
	$visits->showPage();
?>