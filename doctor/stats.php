<?php
	session_start();
	require("../class/doctor.inc");
	require("../class/doctorPage.inc");
	
	class StatsService extends DoctorPage{
		
		public function __construct($t,$u){
			parent::__construct($t,$u);
		}
		
		protected function showContent(){															//nadpisana funkcja poakzujaća zawartosc
			$arr = Array();
			$arr=$this->user->getStats();
			print_r($arr);
        }
	}

	$stats = new StatsService("Statystyki przychodni",unserialize($_SESSION['DOCTOR']));
	$scripts = Array("jquery-3.3.1.min.js","logout.js","messages.js");
	$stats->setScripts($scripts);
	$stats->showPage();
?>