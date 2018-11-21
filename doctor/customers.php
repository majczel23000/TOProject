<?php
	session_start();
	require("../class/doctor.inc");
	require("../class/doctorPage.inc");
	
	class CustomerList extends DoctorPage{
		
		public function __construct($t,$u){
			parent::__construct($t,$u);
		}
		
		protected function showContent(){															//nadpisana funkcja poakzujaća zawartosc
			echo "\t\t	<div id=\"contentTitle\">\n";
			echo "\t\t\t<h1><i class=\"fas fa-list-ul\"></i> Lista Klientów kliniki</h1>\n";
			echo "\t\t	</div>\n";
            echo "\t\t	<div id=\"contentDescription\">\n";
            echo "\t\t\t <table id=\"customerList\"> \n";
            echo "\t\t\t\t <thead> \n";
            echo "\t\t\t\t\t <tr> \n";
            echo "\t\t\t\t\t\t <th>First Name</th> \n";
            echo "\t\t\t\t\t\t <th>Last Name</th> \n";
            echo "\t\t\t\t\t\t <th>Email</th> \n";
            echo "\t\t\t\t\t\t <th>Phone Number</th> \n";
            echo "\t\t\t\t\t </tr> \n";
            echo "\t\t\t\t </thead> \n";
            echo "\t\t\t\t  <tbody \n";
            
            foreach($this->getAllCustomers() as $customer){
                echo "\t\t\t\t\t <tr> \n";
                echo "\t\t\t\t\t\t <td>".$customer['FIRST_NAME']."</td>\n";
                echo "\t\t\t\t\t\t <td>".$customer['LAST_NAME']."</td>\n";
                echo "\t\t\t\t\t\t <td>".$customer['EMAIL']."</td>\n";
                echo "\t\t\t\t\t\t <td>".$customer['PHONE_NUMBER']."</td>\n";
                echo "\t\t\t\t\t </tr> \n";
            }
            echo "\t\t\t\t </tbody> \n";
			echo "\t\t\t </table> \n";
            echo "\t\t	</div>\n";
        }
        
        private function getAllCustomers(){
            require('../connect.php');        
            @$db=new mysqli($server,$user,$password,$dataBase);
            if(mysqli_connect_errno())
                return "Brak danych";
            else{
                $query="SELECT FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER FROM CUSTOMER";
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

	$customers = new CustomerList("Lista klientów",unserialize($_SESSION['DOCTOR']));
	$customers->showPage();
?>