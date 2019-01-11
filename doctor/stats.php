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
			$arr=$this->user->getStats();															//tabela ze statystykami
			echo '<table id="mainStatsTable">';
				echo '<thead><tr><th colspan="2">Stan na: '.$arr['DATE'].'</th></tr></thead>';
				echo '<tbody>';
					echo '<tr>';
						echo '<td>Liczba lekarzy</td><td>'.$arr['NUM_DOCTORS'].'</td>';
					echo '</tr>';
					echo '<tr>';
						echo '<td>Liczba klientów</td><td>'.$arr['NUM_CUSTOMERS'].'</td>';
					echo '</tr>';
					echo '<tr>';
						echo '<td>Liczba zwierząt</td><td>'.$arr['NUM_CUSTOMER_ANIMALS'].'</td>';
					echo '</tr>';
					echo '<tr>';
						echo '<td>Liczba leków</td><td>'.$arr['NUM_MEDICINES'].'</td>';
					echo '</tr>';
					echo '<tr>';
						echo '<td>Liczba chorób</td><td>'.$arr['NUM_DISEASES'].'</td>';
					echo '</tr>';
					echo '<tr>';
						echo '<td>Liczba przeprowadzonych wizyt</td><td>'.$arr['NUM_PREV_VISITS'].'</td>';
					echo '</tr>';
					echo '<tr>';
						echo '<td>Liczba zaplanowanych wizyt</td><td>'.$arr['NUM_NEXT_VISITS'].'</td>';
					echo '</tr>';
					echo '<tr>';
						echo '<td>Najnowszy klient</td><td>'.$arr['NEWEST_CUSTOMER'].'</td>';
					echo '</tr>';
					echo '<tr>';
						echo '<td>Najczęściej występująca rasa</td><td>'.$arr['MOST_ANIMALS'].'</td>';
					echo '</tr>';
				echo '</tbody>';
			echo '</table>';
        }
	}

	$stats = new StatsService("Statystyki przychodni",unserialize($_SESSION['DOCTOR']));
	$scripts = Array("jquery-3.3.1.min.js","logout.js","messages.js");
	$stats->setScripts($scripts);
	$stats->showPage();
?>