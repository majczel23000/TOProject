<!-- <?php
	session_start();
	require("../class/customer.inc");
	if (!(isset($_SESSION['CUSTOMER'])) || !unserialize($_SESSION['CUSTOMER'])->checkIsLogged()){			//jesli nie zalogował sie to go wyrzucamy
		header('Location: ../login.php');
		exit();
	}
	$customer = unserialize($_SESSION['CUSTOMER']);
?> -->
<!DOCTYPE html>
<html>
<html>
<head>
  <meta charset="utf-8">
  <title>[CustomerProfile] VetManager</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="Stylesheet" type="text/css" href="../css/mainStyles.css" />
  <link rel="Stylesheet" type="text/css" href="../css/customerStyles.css" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">


</head>
<body>
    <nav id="menu">
        <div id="appTitle">
            <a>VetManager</a>
        </div>
        <div id="actionButtons">
            <a id="logoutButton" class="btn btnLogout"><i class="fas fa-sign-out-alt" style="margin-right: 10px"></i>Wyloguj się</a>
            <a href="index.php" class="btn btnMenu"><i class="fas fa-user" style="margin-right: 10px"></i>Profil</a>
            <a class="btn btnMenu"><i class="fas fa-paw" style="margin-right: 10px"></i>Zwierzęta</a>
            <a class="btn btnMenu"><i class="fas fa-user-md" style="margin-right: 10px"></i>Lekarze</a>
            <a class="btn btnMenu"><i class="fas fa-plus-square" style="margin-right: 10px"></i>Umów wizytę</a>
        </div>
        <div class="clear"></div>
        <div id="messages">
            <div id="messagesInfo"></div>
            <div id="messagesClose"><i id="messagesCloseIcon" class="fas fa-times-circle"></i></div>
            <div class="clear"></div>
        </div>
    </nav>

    <div id="content">
        <div id="contentTitle">
            <h1>Witaj <?php echo $customer->getFirstName(); echo ' '; echo $customer->getLastName()?></h1>
        </div>
        <div id="contentDescription">
            Na stronie startowej po zalogowaniu to nie wiem co ma być, może od razu to będzie profil?
            Tzn. zalogujemy się i potem jak nas przekieruje, to ten plik customer/index.php odpowiadać będzie
            zakładce Profil. No i tutaj na dole tabelka z danymi zalogowanego klienta i będzie można
            je edytować.
        </div>
    </div>

    <script src="../js/jquery-3.3.1.min.js"></script>
    <script src="../js/customer.js"></script>
    <script src="../js/messages.js"></script>
</body>
</html>