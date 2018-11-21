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
            echo "\t\t\t <table id=\"doctorsList\"> \n";
            echo "\t\t\t\t <thead> \n";
            echo "\t\t\t\t\t <tr> \n";
            echo "\t\t\t\t\t\t <th>First Name</th> \n";
            echo "\t\t\t\t\t\t <th>Last Name</th> \n";
            echo "\t\t\t\t\t\t <th>Academic Title</th> \n";
            echo "\t\t\t\t\t\t <th>Phone Number</th> \n";
            echo "\t\t\t\t\t\t <th></th> \n";
            echo "\t\t\t\t\t </tr> \n";
            echo "\t\t\t\t </thead> \n";
            echo "\t\t\t\t  <tbody \n";
            
            foreach($this->getAllDoctors() as $doctor){
                echo "\t\t\t\t\t <tr> \n";
                echo "\t\t\t\t\t\t <td>".$doctor['FIRST_NAME']."</td>\n";
                echo "\t\t\t\t\t\t <td>".$doctor['LAST_NAME']."</td>\n";
                echo "\t\t\t\t\t\t <td>".$doctor['ACADEMIC_TITLE']."</td>\n";
                echo "\t\t\t\t\t\t <td>".$doctor['PHONE_NUMBER']."</td>\n";
                echo "\t\t\t\t\t\t <td><button class=\"btnDoctorHours\">Godziny przyjęć</button></td>\n";
                echo "\t\t\t\t\t </tr> \n";
            }
            echo "\t\t\t\t </tbody> \n";
			echo "\t\t\t </table> \n";
            echo "\t\t	</div>\n";
        }
        
        private function getAllDoctors(){
            require('../connect.php');        
            @$db=new mysqli($server,$user,$password,$dataBase);
            if(mysqli_connect_errno())
                return "Brak danych";
            else{
                $query="SELECT FIRST_NAME, LAST_NAME, ACADEMIC_TITLE, PHONE_NUMBER FROM DOCTOR";
                $result=$db->query($query);
                if($result->num_rows==0)
                    return "Brak danych";
                else{
                    while($row=mysqli_fetch_array($result,MYSQLI_ASSOC))
                        $array[] = $row;
                    return $array;
                    // return $row;
                }
            }
        }

		
	}

	$doctors = new DoctorList("Lista lekarzy",unserialize($_SESSION['CUSTOMER']));
	$doctors->showPage();
?>