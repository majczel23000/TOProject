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
  <title>VetManager - Logowanie</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="Stylesheet" type="text/css" href="css/mainStyles.css" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">

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
        <div id="messages">
            <div id="messagesInfo"></div>
            <div id="messagesClose"><i id="messagesCloseIcon" class="fas fa-times-circle"></i></div>
            <div class="clear"></div>
        </div>
    </nav>

    

    <div id="content">
        <div id="loginForm">
            <h1>Zaloguj się w systemie:</h1>
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
            <button type="submit" class="btn btnLogin">Zaloguj</button>
            <div class="clear"></div>
        </div>
    </div>
	<script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/login.js"></script>
    <script src="js/messages.js"></script>
</body>
</html>