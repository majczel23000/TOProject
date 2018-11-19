<?php
class Logowanie{
	private $email;
	private $password;
	private $db;
	private $inLoginHistory = false;										//zmienna mówiąca, czy wprowadzono logowanie wiersz do historii logowań
	private $returnVal = -1;												//rezultat logowania
	private $returnUserType="";												//zmienna zwraca jakiego typu jest użytkownik 
	
	public function __construct($e, $p){									//konstruktor przyjmuje login i hasło
		$this->email=$e;
		$this->password=$p;
	}
	
	public function loginProccess(){										//obsługa logowania
		session_start();
		require('connect.php');
		@$this->db=new mysqli($server,$user,$password,$dataBase);			//łączymy się z bazą i przechowujemy polączenie w atrybucie klasy
		if(mysqli_connect_errno())
			$this->returnVal=1;												//jesli nie ma połączenia do zwracamy 1
		else{														  
			$this->customerService();										//najpierw sprawdzamy w klientach, jesli po przejsciu przez tę funkcje		
			if($this->returnVal==2)											//returnVal==2 to znaczy, ze nie znalazło tam pasujacego
				$this->employeeService();									//wiec teraz sprawdzamy w lekarzach
		}
		@$this->db->close();												//zamykamy połączenie
		echo json_encode([$this->returnVal,$this->returnUserType]); 		//2-wrong login data, 1-no db connect, 0-successful; drugi parametr to accType
	}
	
	public function customerService(){										//funkcja obsługująca lgoowanie klienta
		$query="SELECT * FROM CUSTOMER WHERE EMAIL='".$this->email."'";		//pobieramy dane klienta o podanym loginie
		$result=$this->db->query($query);									//pobieramy rezultat
		$num_rows=$result->num_rows;										//sprawdzamy ile zwrócił wyników
		if($num_rows!=1){													//jesli liczba pobranych wierszy jest różna od 1, to nie ma takiego klienta
			$result->free();												//czyścimy wyniki
			$this->returnVal=2;												//zapisujemy bład (value 2)
		}
		else{
			$customer = $result->fetch_assoc();									//jeśli jest jeden użytkownik to tworzymy tablice z pobranymi danymi
			if(password_verify($this->password,$customer['PASSWORD'])){			//najpierw sprawdzamy czy podane hasło jest prawidłowe					
				require('class/customer.inc');									//importujemy plik z klasą
				$_SESSION['CUSTOMER']=serialize(new Customer($customer['CUS_ID'],$this->db)); //i serializujemy nowy obiekt do SESSION
				$result->free();
				$this->returnVal=0;
				$this->returnUserType="customer";
				$this->insertLoginHistory("CUS",$customer['CUS_ID']);			//wysyłamy informacje do tabeli LOGIN_HISTORY z parametrem CUS i z jego id
				
			}
			else {															//jeśli podane hasło jest nieprawidłowe
				$result->free();
				$this->returnVal=2;										
				$this->insertLoginHistory("CUS",$customer['CUS_ID']);						
			}
		}
	}
	
	public function employeeService(){										//to samo co wyżej tylko, że dla pracownika
		$query="SELECT * FROM DOCTOR WHERE EMAIL='".$this->email."'";
		$result=$this->db->query($query);
		$num_rows=$result->num_rows;
		if($num_rows!=1){
			$result->free();
			$this->returnVal=2;
		}
		else{
			$doctor = $result->fetch_assoc();
			if(password_verify($this->password,$doctor['PASSWORD'])){
				require('class/doctor.inc');
				$_SESSION['DOCTOR']=serialize(new Doctor($doctor['DOC_ID'],$this->db));
				$result->free();
				$this->returnVal=0;
				$this->returnUserType="doctor";
				$this->insertLoginHistory("DOC",$doctor['DOC_ID']);								//wysyłamy informacje do tabeli LOGIN_HISTORY
			}
			else {
				$result->free();
				$this->returnVal=2;
				$this->insertLoginHistory("DOC",$doctor['DOC_ID']);								//wysyłamy informacje do tabeli LOGIN_HISTORY
			}
		}
		if(!$this->inLoginHistory)												//odpali się, gdy nie znadzije podanego loginu w tabeli z customer
			$this->insertLoginHistory("ERR","");								// oraz z doctor, ERR-ERROR oraz bez ID bo nie ma takiego loginu w bazie
	}
	
	public function insertLoginHistory($userType, $id){		//funckja wprowadzająca rezultat logowania do tabeli LOGIN_HISTORY;
		if($userType=="ERR"){								//$userType to CUS, DOC lub ERR, a $id to id uzytkownika
			$query="INSERT INTO LOGIN_HISTORY(IP_ADDRESS,DATE,RESULT) VALUES ('".$_SERVER['REMOTE_ADDR']."','".date('Y-m-d H:i:s')."','DENIED')";
			$this->db->query($query);
		}
		else if($this->returnVal==2){
			$query="INSERT INTO LOGIN_HISTORY(".$userType."_ID,IP_ADDRESS,DATE,RESULT) VALUES (".$id.",'".$_SERVER['REMOTE_ADDR']."','".date('Y-m-d H:i:s')."','DENIED')";
			$this->db->query($query);
		}
		else if($this->returnVal==0){									//tutaj SESSION bedzie zawsze istnieć, bo udało sie zalogować, czyli SESSION jest stworzona
			$query="INSERT INTO LOGIN_HISTORY(".$userType."_ID,IP_ADDRESS,DATE,RESULT) VALUES (".$id.",'".$_SERVER['REMOTE_ADDR']."','".date('Y-m-d H:i:s')."','ACCESS')";
			$this->db->query($query);
		}
		$this->inLoginHistory=true;										//zaznaczamy, ze zostało juz wprwadzone do historii logowań
	}
	
}

if(isset($_POST['email']) && isset($_POST['password'])){				//jeśli zostały wypełnione inputy to tworzymy obiekt i przeprowadzamy lgoowanie
	$logowanie = new Logowanie($_POST['email'],$_POST['password']);
	$logowanie->loginProccess();
}
?>