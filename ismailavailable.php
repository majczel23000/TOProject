<?php
class CheckMail{
	private $email;
	private $isMailAvailable=true;
	private $db;

	public function __construct($e){												//konstruktor przyjmuje login i hasło
		$this->email=$e;
	}
	
	public function run(){
		session_start();
		require('connect.php');
		@$this->db=new mysqli($server,$user,$password,$dataBase);
		if(!mysqli_connect_errno()){
			$this->checkCustomers();												//najpierw sprawdzamy w klientach
			if($this->isMailAvailable)
				$this->checkDoctors();											//a potem w lekarzach
		}
		@$this->db->close();
		echo json_encode($this->isMailAvailable);
	}
	public function checkCustomers(){
		$query="SELECT * FROM CUSTOMER WHERE EMAIL='".$this->email."'";				//szukamy po podanym adresie mail
		$result=$this->db->query($query);
		$num_rows=$result->num_rows;
		if($num_rows!=0)															//jesli liczba pobranych wierszy jest różna od 0, to na razie dostępny
			$this->isMailAvailable=false;
	}
	public function checkDoctors(){													//to samo co wyżej tylko dla klienta
		$query="SELECT * FROM DOCTOR WHERE EMAIL='".$this->email."'";					
		$result=$this->db->query($query);
		$num_rows=$result->num_rows;
		if($num_rows!=0)															
			$this->isMailAvailable=false;
	}
}
$checkMail = new CheckMail($_POST['email']);
$checkMail->run();

?>