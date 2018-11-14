<?php
	session_start();
	if (!(isset($_SESSION['LOGGED'])) || !($_SESSION['LOGGED'])){			//if doesnt logged 
		header('Location: login.php');
		exit();
	}
	echo "zalogowany<br>";
	echo '<a href="logout.php">Wyloguj się</a><br>';
	foreach($_SESSION as $key => $value)
		echo $key." = ".$value."</br>";
?>