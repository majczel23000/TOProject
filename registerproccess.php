<?php

class Rejestracja{
    private $firstName;
    private $lastName;
    private $email;
    private $password;
    private $db;
    private $returnVal = -1;
    
    public function __construct($fN, $lN, $e, $p){
        $this->firstName = $fN;
        $this->lastName = $lN;
        $this->email = $e;
        $this->password = $p;
    }

    public function registerProccess(){
        /*session_start();
		require('connect.php');
		@$this->db=new mysqli($server,$user,$password,$dataBase);
		if(mysqli_connect_errno())
            $this->returnVal = 1;
        else{
            $hashedPassword = password_hash($this->password, PASSWORD_DEFAULT);
            $query = "INSERT INTO customer (FIRST_NAME, LAST_NAME, PASSWORD, EMAIL) VALUES('".$this->firstName."','".$this->lastName."','".$hashedPassword."','".$this->email."')";
            $this->db->query($query);
            $this->returnVal = 0;
        }
        @$this->db->close();
		echo json_encode($this->returnVal);*/
		require('class/user.inc');
		$this->returnVal=User::addUser($this->firstName,$this->lastName,$this->email,$this->password);
		echo json_encode($this->returnVal);
    }
}

if(isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['email']) && isset($_POST['password'])){
    $rejestracja = new Rejestracja($_POST['firstName'],$_POST['lastName'],$_POST['email'],$_POST['password']);
    $rejestracja->registerProccess();
}

?>