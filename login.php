<?php
	session_start();
	if (isset($_SESSION['LOGGED']) && $_SESSION['LOGGED']){			//if logged 
		header('Location: home.php');
		exit();
	}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>VetManager - Login</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="Stylesheet" type="text/css" href="css/style.css" />
</head>
<body>
    <nav id="menu">
        <div id="appTitle">
            <a href="index.php">VetManager</a>
        </div>
        <div id="appAuthButtons">
            <a href="login.php" class="btn btnLogin">Login</a>
            <a href="register.php" class="btn btnRegister">Register</a>
        </div>
        <div class="clear"></div>
    </nav>

    <div id="content">
        <div id="loginForm">
            <h1>Log into the system:</h1>
            <div class="formGroup">
                <label for="email">Email: </label>
                <input id="email" type="email" name="email">
                <div class="clear"></div>
            </div>
            <div class="formGroup">
                <label for="password">Password: </label>
                <input id="password" type="password" name="password">
                <div class="clear"></div>
            </div>
            <button type="submit" class="btn btnLogin">Login</button>
            <div class="clear"></div>
        </div>
    </div>
	<script src="js/jquery-3.3.1.min.js"></script>
	<script src="js/login.js"></script>
</body>
</html>