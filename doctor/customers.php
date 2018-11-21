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
			echo "\t\t\t	<a id=\"showCustomerList\" class=\"btn btnMenu\"> <i class=\"fas fa-bars\" style=\"margin-right: 10px\"></i>Pokaż listę wszystkich klientów</a>\n";
			echo "\t\t\t	<a id=\"showCustomerDetail\" class=\"btn btnMenu\"> <i class=\"fas fa-clipboard\" style=\"margin-right: 10px\"></i>Pokaż szczegółowe dane klienta</a>\n";
			echo "\t\t\t	<a id=\"sendEmail\" class=\"btn btnMenu\"> <i class=\"fas fa-envelope-open\" style=\"margin-right: 10px\"></i>Wyślij wiadomość e-mail</a>\n";
			echo "\t\t\t	<div class=\"clear\"></div>\n";
			echo "\t\t	</div>\n";
			echo "\t\t	<div id=\"contentTitle\">\n";
			echo "\t\t	</div>\n";
            echo "\t\t	<div id=\"contentDescription\">\n";
            echo "\t\t	</div>\n";
        }
        
        private function getAllCustomers(){
            require('../connect.php');        
            @$db=new mysqli($server,$user,$password,$dataBase);
            if(mysqli_connect_errno())
                return "Brak danych";
            else{
                $query="SELECT FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER FROM CUSTOMER ORDER BY LAST_NAME, FIRST_NAME";
                $result=$db->query($query);
                if($result->num_rows==0)
                    return "Brak danych";
                else{
                    while($row=mysqli_fetch_array($result,MYSQLI_ASSOC))
                        $array[] = $row;
                    return $array;
                }
            }
        }
	}

	$customers = new CustomerList("Obsługa klientów",unserialize($_SESSION['DOCTOR']));
	$scripts = Array("jquery-3.3.1.min.js","doctorPatientService.js");
	$customers->setScripts($scripts);
	$customers->showPage();
?>