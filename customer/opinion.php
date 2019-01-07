<?php
	session_start();
	require("../class/customer.inc");
	require("../class/customerPage.inc");
	
	class Opinion extends CustomerPage{

		public function __construct($t,$u){
			parent::__construct($t,$u);
		}
		
		protected function showContent(){
            echo "\t\t <div id=\"contentTitle\">\n";
			echo "\t\t\t<h1><i class=\"far fa-envelope\"></i> Podziel się z nami swoją opinią!</h1>\n";
			echo "\t\t </div>\n";
            echo "\t\t <div id=\"contentDescription\">\n";
            echo "\t\t\t <textarea placeholder=\"Napisz swoją wiadomość\" id=\"opinionText\"></textarea>";
            echo "\t\t\t <button id=\"btnSendOpinion\">Wyślij opinię</button>";
            echo "\t\t </div>";
        }		
	}

    $services = new Opinion("Opinia",unserialize($_SESSION['CUSTOMER']));
    $scripts = Array("jquery-3.3.1.min.js","customerOpinion.js","logout.js","messages.js");
    $services->setScripts($scripts);
	$services->showPage();
?>