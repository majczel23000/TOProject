<?php

class EditDoctorData{
    private $firstName;
    private $lastName;
    private $email;
    private $address;
    private $phoneNumber;
    private $db;
    private $returnVal = -1;
    
    public function __construct($fN, $lN, $e, $a, $pN){
        $this->firstName = $fN;
        $this->lastName = $lN;
        $this->email = $e;
        $this->address = $a;
        $this->phoneNumber = $pN;
    }

    public function editDoctorDataProccess(){
        session_start();
        require('../connect.php');
        require("../class/doctor.inc");
        //require("../class/customerPage.inc");
        
		@$this->db=new mysqli($server,$user,$password,$dataBase);
		if(mysqli_connect_errno())
            $this->returnVal = 1;
        else{
			$this->db->query("SET NAMES `utf8` COLLATE `utf8_polish_ci`"); 
            $query = "UPDATE doctor SET FIRST_NAME='".$this->firstName."', LAST_NAME='".$this->lastName."', ADDRESS='".$this->address."', PHONE_NUMBER='".$this->phoneNumber."' WHERE EMAIL='".$this->email."'";
            $this->db->query($query);
            $this->returnVal = 0;
            $CUS = unserialize($_SESSION['DOCTOR']);
            $CUS->setFirstName($this->firstName);
            $CUS->setLastName($this->lastName);
            $CUS->setAddress($this->address);
            $CUS->setPhoneNumber($this->phoneNumber);
            $_SESSION['DOCTOR']=serialize($CUS);
        }
        @$this->db->close();
		echo json_encode($this->returnVal);
    }
}

if(isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['email']) && isset($_POST['address']) && isset($_POST['phoneNumber'])){
    $edition = new EditDoctorData($_POST['firstName'],$_POST['lastName'],$_POST['email'],$_POST['address'], $_POST['phoneNumber']);
    $edition->editDoctorDataProccess();
}

?>