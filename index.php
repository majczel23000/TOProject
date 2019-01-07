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
  <title>VetManager</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="Stylesheet" type="text/css" href="css/mainStyles.css" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
</head>
<body>
    <nav id="menu">
        <div id="appTitle">
            <a href="index.php">VetManager</a>
        </div>
        <div id="actionButtons">
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

    <div id="contentMain">
        <div id="contentTitle">
            <h1>Witamy w VetManager!</h1>
        </div>
        <div id="contentDescription">
            Wsłuchując się w potrzeby lekarzy, stworzyliśmy oprogramowanie, które wspiera prowadzenie lecznicy weterynaryjnej w sposób: prosty,
            intuicyjny, mobilny oraz bezpieczny. Tworząc VetManager współpracowaliśmy z osobami powiązanymi z weterynarią oraz ekspertami w tej 
            dziedzinie. Dzięki tej współpracy jesteśmy przekonani, że VetManager sprosta oczekiwaniom nawet najbardziej wymagających klientów.
        </div>
        <div id="contentFunctions">
            <div class="functionItem">
                <div class="functionItemImage">
                    <img src="https://cdn.shopify.com/s/files/1/0972/9862/articles/Animals-week-Shopify1_300x300.jpg?v=1494278806" alt="">
                </div>
                <div class="functionItemDescription">
                    <p>Zarządzaj swoimi zwierzętami w sposób intuicyjny. Dodawanie oraz edytowanie danych zwierząt nie stanowi przeszkody dla
                        VetManager.
                    </p>
                </div>
                <div class="clear"></div>
            </div>
            <div class="functionItem">
                <div class="functionItemImage">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSro9F8E0CfXxEQ1KYwZjr2Dm4n7CD3o2v47jOFGJcn53kp54mB" alt="">
                </div>
                <div class="functionItemDescription">
                    <p>Umawiaj wizytę nie wychodząc z domu. Dzięki systemowi możesz umówić wizytę dla dowolnego zwierzęcia zarejestrowanego
                        w systemie, o porze, w której prowadzone będą w gabinecie wizyty. Umawiaj się także na wizyty do swoich ulubionych lekarzy!
                    </p>
                </div>
                <div class="clear"></div>
            </div>
            <div class="functionItem">
                <div class="functionItemImage">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWZRtpwr-Qo8uiaOq7YFvtFqbfKq8Kz_IGCTY-JEZLVsa1KDaE" alt="">
                </div>
                <div class="functionItemDescription">
                    <p>Uzyskaj informację dotyczące zabiegów, lekarzy, a także zerknij na statystyki swoich zwierząt - te wszystkie rzeczy zawiera
                        właśnie VetManager!
                    </p>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>

    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/messages.js"></script>
</body>
</html>