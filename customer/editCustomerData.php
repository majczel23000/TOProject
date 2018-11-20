<?php

class EditCustomerData{
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

    public function editCustomerDataProccess(){
        session_start();
        require('../connect.php');
        require("../class/customer.inc");
        require("../class/customerPage.inc");
        
		@$this->db=new mysqli($server,$user,$password,$dataBase);
		if(mysqli_connect_errno())
            $this->returnVal = 1;
        else{
            $query = "UPDATE customer SET FIRST_NAME='".$this->firstName."', LAST_NAME='".$this->lastName."', ADDRESS='".$this->address."', PHONE_NUMBER='".$this->phoneNumber."' WHERE EMAIL LIKE '".$this->email."'";
            $this->db->query($query);
            $this->returnVal = 0;
            $cst = unserialize($_SESSION['CUSTOMER']);
            $cst->setFirstName($this->firstName);
            $cst->setLastName($this->lastName);
            $cst->setAddress($this->address);
            $cst->setPhoneNumber($this->phoneNumber);
            $_SESSION['CUSTOMER']=serialize($cst);
        }
        @$this->db->close();
		echo json_encode($this->returnVal);
    }
}

if(isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['email']) && isset($_POST['address']) && isset($_POST['phoneNumber'])){
    $edition = new EditCustomerData($_POST['firstName'],$_POST['lastName'],$_POST['email'],$_POST['address'], $_POST['phoneNumber']);
    $edition->editCustomerDataProccess();
}

?>