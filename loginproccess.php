<?php
class Logowanie{
	private $email;
	private $password;
	private $returnVal = -1;
	private $db;
	
	public function __construct($e, $p){								//konstruktor przyjmuje login i hasło
		$this->email=$e;
		$this->password=$p;
	}
	
	public function loginProccess(){										//obsługa logowania
		session_start();
		require('connect.php');
		@$this->db=new mysqli($server,$user,$password,$dataBase);
		if(mysqli_connect_errno())
			$this->returnVal=1;
		else{
			//najpierw sprawdzamy w klientach, jesli po przejsciu przez tą funkcje returnVal==2 to znaczy, ze nie znalazło tam pasujacego, wiec teraz sprawdzamy w lekarzach
			$this->customerService();
			if($this->returnVal==2)
				$this->employeeService();
		}
		@$this->db->close();
		echo json_encode($this->returnVal); 								//2-wrong login data, 1-no db connect, 0-successful
	}
	
	public function customerService(){										//funkcja obsługująca lgoowanie klienta
		$query="SELECT * FROM customer WHERE Email='".$this->email."'";			//pobieramy dane klienta o podanym loginie
		$result=$this->db->query($query);
		$num_rows=$result->num_rows;
		if($num_rows!=1){														//jesli liczba pobranych wierszy jest różna od 1, to nie ma takiego klienta
			$result->free();
			$this->returnVal=2;													//zapisujemy bład
		}
		else{
			$user = $result->fetch_assoc();
			if(password_verify($this->password,$user['password'])){				//jesli jest jeden wiersz to porównujemy hasło
				$_SESSION['LOGGED']=true;										//ustawiamy zmienne sesji
				$_SESSION['USER_ID']=$user['IDCustomer'];							
				$_SESSION['ACC_TYPE']='CUSTOMER';
				$result->free();
				$this->returnVal=0;
			}
			else {																//jeśli podane hasło się różni
				$_SESSION['USER_ID']=$user['IDCustomer'];							//zeby wiadomoe było na czyje konto chciał sie zalogować delikfent
				$result->free();
				$this->returnVal=2;
			}
		}
		$this->insertLoginHistory("CUS");									//wysyłamy informacje do tabeli LOGIN_HISTORY
	}
	
	public function employeeService(){										//to samo co wyżej tylko, że dla pracownika
		$query="SELECT * FROM doctor WHERE Email='".$this->email."'";
		$result=$this->db->query($query);
		$num_rows=$result->num_rows;
		if($num_rows!=1){
			$result->free();
			$this->returnVal=2;
		}
		else{
			$user = $result->fetch_assoc();
			if(password_verify($this->password,$user['Password'])){
				$_SESSION['LOGGED']=true;
				$_SESSION['USER_ID']=$user['IDDoctor'];
				$_SESSION['ACC_TYPE']='ADMIN';
				$_SESSION['ADM_TYPE']=$user['Adm_Type'];
				$result->free();
				$this->returnVal=0;
			}
			else {
				$_SESSION['USER_ID']=$user['IDDoctor'];
				$result->free();
				$this->returnVal=2;
			}
		}
		$this->insertLoginHistory("EMP");
	}
	
	public function insertLoginHistory($userType){					//funckja wprowadzająca rezultat logowania do tabeli LOGIN_HISTORY, $userType to CUS lub EMP
		if($this->returnVal==2){
			$userID = "NULL";											//potrzebne, bo tablica SESSION nie zawsze może istnieć
			if(isset($_SESSION['USER_ID']))								//jesli został podany zły login to nie bedzie zmiennych SESSION, wiec ustawiamy na NULL
				$userID=$_SESSION['USER_ID'];
			$query="INSERT INTO LOGIN_HISTORY(".$userType."_ID,IP_ADDRESS,DATE,RESULT) VALUES (".$userID.",'".$_SERVER['REMOTE_ADDR']."','".date('Y-m-d H:i:s')."','DENIED')";
			$this->db->query($query);
		}
		else if($this->returnVal==0){									//tutaj SESSION bedzie zawsze istnieć, bo udało sie zalogować, czyli SESSION jest stworzona
			$query="INSERT INTO LOGIN_HISTORY(EMP_ID,IP_ADDRESS,DATE,RESULT) VALUES (".$_SESSION['USER_ID'].",'".$_SERVER['REMOTE_ADDR']."','".date('Y-m-d H:i:s')."','ACCESS')";
			$this->db->query($query);
		}
	}
	
}

if(isset($_POST['email']) && isset($_POST['password'])){					//jeśli zostały wypełnione inputy to tworzymy obiekt i przeprowadzamy lgoowanie
	$logowanie = new Logowanie($_POST['email'],$_POST['password']);
	$logowanie->loginProccess();
}
	/*LOGOWANIE NIEOBIEKTOWO
	if(isset($_POST['login']) && isset($_POST['password'])){
		session_start();
		$return = -1;
		
		require('connect.php');
		@$db=new mysqli($server,$user,$password,$dataBase);
		if(mysqli_connect_errno())
			$return= 1;
		else{
			if(is_numeric(substr($_POST['login'], 0, 1))){				//jeśli pierwsza jest cyfrą, to znaczy, ze użytkownik jest klientem, jesli inna to admin
				$query="SELECT * FROM CUSTOMER WHERE NIP='".$_POST['login']."'";		//pobieramy dane klienta o podanym loginie
				$result=$db->query($query);
				$num_rows=$result->num_rows;
				if($num_rows!=1){														//jesli liczba pobranych wierszy jest różna od 1, to nie ma takiego klienta
					$result->free();
					$return=2;															//zapisujemy bład
				}
				else{
					$user = $result->fetch_assoc();
					if(password_verify($_POST['password'],$user['PASSWORD'])){			//jesli jest jeden wiersz to porównujemy hasło
						$_SESSION['LOGGED']=true;										//ustawiamy zmienne sesji
						$_SESSION['USER_ID']=$user['CUS_ID'];							
						$_SESSION['ACC_TYPE']='CUSTOMER';
						$_SESSION['CUS_TYPE']=$user['ACC_TYPE'];
						$result->free();
						$return=0;
					}
					else {																//jeśli podane hasło się różni
						$_SESSION['USER_ID']=$user['CUS_ID'];
						$result->free();
						$return=2;
					}
				}
				
				if($return==2){															//wprowadzamy dane o logowaniu
					if(!isset($_SESSION['USER_ID']))									//jesli został podany zły login to nie bedzie zmiennych SESSION, wiec ustawiamy na NULL
						$_SESSION['USER_ID']="NULL";
					$query="INSERT INTO LOGIN_HISTORY(CUS_ID,IP_ADDRESS,DATE,RESULT) VALUES (".$_SESSION['USER_ID'].",'".$_SERVER['REMOTE_ADDR']."','".date('Y-m-d H:i:s')."','DENIED')";
					$db->query($query);
					unset($_SESSION['USER_ID']);
				}
				else if($return==0){
					$query="INSERT INTO LOGIN_HISTORY(CUS_ID,IP_ADDRESS,DATE,RESULT) VALUES (".$_SESSION['USER_ID'].",'".$_SERVER['REMOTE_ADDR']."','".date('Y-m-d H:i:s')."','ACCESS')";
					$db->query($query);
				}
				
			}
			else{
				$query="SELECT * FROM EMPLOYEE WHERE LOGIN='".$_POST['login']."'";
				$result=$db->query($query);
				$num_rows=$result->num_rows;
				if($num_rows!=1){
					$result->free();
					$return=2;
				}
				else{
					$user = $result->fetch_assoc();
					if(password_verify($_POST['password'],$user['PASSWORD'])){
						$_SESSION['LOGGED']=true;
						$_SESSION['USER_ID']=$user['EMP_ID'];
						$_SESSION['ACC_TYPE']='ADMIN';
						$_SESSION['ADM_TYPE']=$user['ADM_TYPE'];
						$result->free();
						$return=0;
					}
					else {
						$_SESSION['USER_ID']=$user['EMP_ID'];
						$result->free();
						$return=2;
					}
				}
				if($return==2){															//wprowadzamy dane o logowaniu
					if(!isset($_SESSION['USER_ID']))									//jesli został podany zły login to nie bedzie zmiennych SESSION, wiec ustawiamy na NULL
						$_SESSION['USER_ID']="NULL";
					$query="INSERT INTO LOGIN_HISTORY(EMP_ID,IP_ADDRESS,DATE,RESULT) VALUES (".$_SESSION['USER_ID'].",'".$_SERVER['REMOTE_ADDR']."','".date('Y-m-d H:i:s')."','DENIED')";
					$db->query($query);
					unset($_SESSION['USER_ID']);
				}
				else if($return==0){
					$query="INSERT INTO LOGIN_HISTORY(EMP_ID,IP_ADDRESS,DATE,RESULT) VALUES (".$_SESSION['USER_ID'].",'".$_SERVER['REMOTE_ADDR']."','".date('Y-m-d H:i:s')."','ACCESS')";
					$db->query($query);
				}
			}
		}
		$db->close();
		echo json_encode($return); //2-wrong login data, 1-no db connect, 0-successful
	}
	*/
?>