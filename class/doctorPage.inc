<?php
	class DoctorPage{
		private $title = "[DoctorProfile]";													//zmienna przechowująca tytuł
		private $buttons = Array(															//zmianna z przyciskami, nie każdy przycisk ma href i niekażdy ma id
									0 => Array
										(
											"text" => "Wyloguj się",
											//"href" => "",
											"id" => "logoutButton",
											"class" => "btn btnLogout",
											"iClass" => "fas fa-sign-out-alt"
										),
									1 => Array
										(
											"text" => "Profil",
											"href" => "index.php",
											//"id" => "logoutButton",
											"class" => "btn btnMenu",
											"iClass" => "fas fa-user"
										),
									2 => Array
										(
											"text" => "Lekarze",
											"href" => "doctors.php",
											//"id" => "logoutButton",
											"class" => "btn btnMenu",
											"iClass" => "fas fa-user-md"
										),
									3 => Array
										(
											"text" => "Klienci",
											"href" => "customers.php",
											//"id" => "logoutButton",
											"class" => "btn btnMenu",
											"iClass" => "fas fa-users"
										),
									4 => Array
										(
											"text" => "Zwierzęta",
											"href" => "pets.php",
											//"id" => "logoutButton",
											"class" => "btn btnMenu",
											"iClass" => "fas fa-paw"
										),
									5 => Array
										(
											"text" => "Wizity",
											"href" => "visits.php",
											//"id" => "logoutButton",
											"class" => "btn btnMenu",
											"iClass" => "fas fa-plus-square"
										),
									6 => Array
										(
											"text" => "Leki",
											"href" => "medicines.php",
											//"id" => "logoutButton",
											"class" => "btn btnMenu",
											"iClass" => "fas fa-pills"
										),
									7 => Array
										(
											"text" => "Choroby",
											"href" => "diseases.php",
											//"id" => "logoutButton",
											"class" => "btn btnMenu",
											"iClass" => "fas fa-book-dead"
										),
									8 => Array
										(
											"text" => "Statystyki",
											"href" => "stats.php",
											//"id" => "logoutButton",
											"class" => "btn btnMenu",
											"iClass" => "fas fa-chart-area"
										)
								);
			private $styles = Array("mainStyles.css","doctorStyles.css");								//nazwy plików ze stylami
			private $scripts = Array("jquery-3.3.1.min.js","doctor.js","messages.js","logout.js");		//nazwy plików ze skryptami
			protected $user;
			
			public function __construct($t,$u){															//konstruktor przyjmuje użytkownika i tytuł strony
				$this->title=$t;
				$this->user=$u;
			}
			
			public function showPage(){																	//strona wyswietlajaca strone
				$this->authorization();
				echo "<!DOCTYPE html>\n";
				echo "<html>\n";
				$this->showHead();
				$this->showBody();
			}
			
			private function authorization(){															//sprawdzanie czy dany użytkownika ma tutaj dostep
				if (!(isset($_SESSION['DOCTOR'])) || !unserialize($_SESSION['DOCTOR'])->checkIsLogged()){			//jesli nie zalogował sie to go wyrzucamy
					header('Location: ../login.php');
					exit();
				}
			}
			
			private function showHead(){																//wyswietlenie head
				echo "<head>\n";
					echo "\t<meta charset=\"utf-8\">\n";
					echo "\t<title>".$this->title."</title>\n";
					echo "\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n";
					foreach($this->styles as $style)
						echo "\t<link rel=\"Stylesheet\" type=\"text/css\" href=\"../css/".$style."\">\n";
					echo "\t<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.5.0/css/all.css\" integrity=\"sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU\" crossorigin=\"anonymous\">\n";
				echo "</head>\n";
			}
			
			private function showBody(){																//wysweitlenie body
				echo "<body>\n";
				$this->showNav();
				echo "\t<div id=\"content\">\n";				
				$this->showContent();
				echo "\t</div>\n";
				$this->showScripts();
				$this->showFooter();
				echo "</body>\n";
				echo "</html>";
			}
			
			private function showNav(){																	//nawigacaja
				echo "\t<nav id=\"menu\">\n";
				echo "\t\t<div id=\"appTitle\">\n";
				echo "\t\t\t<a href=\"index.php\">VetManager</a>\n";
				echo "\t\t</div>\n";
				echo "\t\t<div id=\"actionButtons\">\n";
				foreach($this->buttons as $butt){
					echo "\t\t\t<a ";
					if(isset($butt['id']))																//jesli przycisk posiada id to wypisujemy, jak nie to idziemy dalej
						echo "id=\"".$butt['id']."\" ";
					if(isset($butt['href']) && !strpos($_SERVER['PHP_SELF'],$butt['href']))				//jesli posiada href i nie znajdujemy sie w tej lokalizacji					
						echo "href=\"".$butt['href']."\" class=\"".$butt['class']."\"> <i class=\"".$butt['iClass']."\" style=\"margin-right: 10px\"></i>".$butt['text']."</a>\n";
					else if(isset($butt['href']) && strpos($_SERVER['PHP_SELF'],$butt['href']))			//jesli posiada href i aktualnie znajdujemy sie na tej stronie					
						echo "href=\"".$butt['href']."\" class=\"btn btnMenu active-btn\"> <i class=\"".$butt['iClass']."\" style=\"margin-right: 10px\"></i>".$butt['text']."</a>\n";
					else																				//w innym przypadku wypisujemy bez artybutu href
						echo "class=\"".$butt['class']."\"> <i class=\"".$butt['iClass']."\" style=\"margin-right: 10px\"></i>".$butt['text']."</a>\n";
				}
				echo "\t\t	<div class=\"clear\"></div>\n";
				echo "\t\t</div>\n";
				echo "\t\t<div class=\"clear\"></div>\n";
				echo "\t\t<div id=\"messages\">\n";
				echo "\t\t\t<div id=\"messagesInfo\"></div>\n";
				echo "\t\t\t<div id=\"messagesClose\"><i id=\"messagesCloseIcon\" class=\"fas fa-times-circle\"></i></div>\n";
				echo "\t\t\t<div class=\"clear\"></div>\n";
				echo "\t\t</div>\n";
				echo "\t</nav>\n";
			}
			
			protected function showContent(){															//protected zeby mozna było ją zmienić w klasach dziedziczących
				echo "\t\t	<div id=\"contentTitle\">\n";
				echo "\t\t\t<h1>Witaj ".$this->user->getFirstName()." ".$this->user->getLastName()."</h1>\n";
				echo "\t\t	</div>\n";
				echo "\t\t	<div id=\"contentDescription\">\n";
				echo "\t\t\tJesteś na podstronie ".$this->title.".\n";
				echo "\t\t	</div>\n";
			}
			
			private function showScripts(){																//wyswwiuetlenie skryptów
				foreach($this->scripts as $script)
					echo "\t<script src=\"../js/".$script."\"></script>\n";
			}
			
			private function showFooter(){
					echo "\t<div id=\"footer\">Michał Raźny, Daniel Pupczyk &#xA9; 2018</div>\n";
			}
			
			public function setStyles($stl){
				$this->styles=$stl;
			}
			
			public function setScripts($scr){
				$this->scripts=$scr;
			}
			
	}


?>