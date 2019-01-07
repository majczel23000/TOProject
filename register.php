<?php
	session_start();
	if(isset($_SESSION['DOCTOR'])){			//if logged as DOCTOR
		header('Location: doctor');
		exit();
	}
	if(isset($_SESSION['CUSTOMER'])){			//if logged as CUSTOMER
		header('Location: customer');
		exit();
	}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>VetManager - Rejestracja</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="Stylesheet" type="text/css" href="css/mainStyles.css" />
</head>
<body class="bodyNotlogged">
    <nav id="menu">
        <div id="appTitle">
            <a href="index.php">VetManager</a>
        </div>
        <div id="appAuthButtons">
            <a href="login.php" class="btn btnLogin">Logowanie</a>
            <a href="register.php" class="btn btnRegister">Rejestracja</a>
        </div>
        <div class="clear"></div>
    </nav>

    <div id="content">
        
        <div id="registerForm">
                <h1>Zarejestruj się w systemie:</h1>
            <div class="formGroup">
                <label for="firstName">Imię: </label>
                <input id="firstName" type="text" name="firstName">
                <div class="clear"></div>
            </div>
            <div class="formGroup">
                <label for="lastName">Nazwisko: </label>
                <input id="lastName" type="text" name="lastName">
                <div class="clear"></div>
            </div>
            <div class="formGroup">
                <label for="email">Email: </label>
                <input id="email" type="email" name="email">
                <div class="clear"></div>
            </div>
            <div class="formGroup">
                <label for="password">Hasło: </label>
                <input id="password" type="password" name="password">
                <div class="clear"></div>
            </div>
            <div class="formGroup">
                <label for="confirmPassword">Potwierdź hasło: </label>
                <input id="confirmPassword" type="password" name="confirmPassword">
                <div class="clear"></div>
            </div>
            <button id="btnRegister" type="submit" class="btn btnRegisterDisabled">Zarejestruj</button>
            <div class="clear"></div>
        </div>
    </div>
	<script src="js/jquery-3.3.1.min.js"></script>
	<script src="js/register.js"></script>
</body>
</html>