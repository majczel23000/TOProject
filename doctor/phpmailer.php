<?php
define('PATH', dirname(__FILE__));
set_time_limit(0);
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require PATH.'/PHPMailer/src/Exception.php';
require PATH.'/PHPMailer/src/PHPMailer.php';
require PATH.'/PHPMailer/src/SMTP.php';

if(isset($_POST['email']) && isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['message'])){
    if(sendMail($_POST['email'],$_POST['firstName'],$_POST['lastName'], $_POST['message'])){
        echo json_encode(200);
    } else{
        echo json_encode(1);
    }
}

function sendMail($mailAddress, $imie, $nazwisko, $message){
	$mail = new PHPMailer(true);
	try {
        $mail = new PHPMailer();
        $mail->IsSMTP();
        // $mail->Mailer = 'smtp';
        $mail->SMTPAuth = true;
        $mail->SMTPDebug = 1;
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';
        
        $mail->Username = "vet.manager.to@gmail.com";
        $mail->Password = "VetManager1996";
        
        $mail->IsHTML(true);
        // $mail->SingleTo = true;
        
        $mail->From = "vet.manager.to@gmail.com";
        $mail->FromName = "VetManager";
        
        $mail->addAddress($mailAddress,$nazwisko." ".$imie);
        
        $mail->Subject = "Testing PHPMailer";
        $mail->Body = $message;

		$mail->SMTPOptions = array(
			'ssl' => array(
				'verify_peer' => false,
				'verify_peer_name' => false,
				'allow_self_signed' => true
			)
		);

		$mail->send();																
		return true;
	}
	catch (Exception $e){
		echo $e->errorMessage();														
		return false;
	}
	catch (\Exception $e){
		echo $e->getMessage();
		return false;
    }
    mail($mailAddress,"My subject",$message);
}

?>