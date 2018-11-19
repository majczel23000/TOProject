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
<body onload="onLoad()">
    <nav id="menu">
        <div id="appTitle">
            <a href="index.php">VetManager</a>
        </div>
        <div id="actionButtons">
            <a href="login.php" class="btn btnLogin">Login</a>
            <a href="register.php" class="btn btnRegister">Register</a>
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
            <h1>Welcome to VetManager!</h1>
        </div>
        <div id="contentDescription">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, 
            saepe placeat quas asperiores nam laudantium tenetur commodi accusamus, 
            nisi deserunt nemo aut eveniet quis quod totam quae praesentium officia 
            earum neque delectus aspernatur cum. Rem hic aliquid, repellendus praesentium 
            assumenda debitis commodi repudiandae quas, porro eum quia, maxime iste! Pariatur.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, 
            saepe placeat quas asperiores nam laudantium tenetur commodi accusamus, 
            nisi deserunt nemo aut eveniet quis quod totam quae praesentium officia 
            earum neque delectus aspernatur cum. Rem hic aliquid, repellendus praesentium 
            assumenda debitis commodi repudiandae quas, porro eum quia, maxime iste! Pariatur.
        </div>
        <div id="contentFunctions">
            <div class="functionItem">
                <div class="functionItemImage">
                    <img src="https://via.placeholder.com/300x150/ddd/000000" alt="">
                </div>
                <div class="functionItemDescription">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate nostrum 
                    officiis, exercitationem asperiores laboriosam corrupti atque tempora animi. Quis, officia!</p>
                </div>
                <div class="clear"></div>
            </div>
            <div class="functionItem">
                <div class="functionItemImage">
                    <img src="https://via.placeholder.com/300x150/333/fff" alt="">
                </div>
                <div class="functionItemDescription">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate nostrum 
                    officiis, exercitationem asperiores laboriosam corrupti atque tempora animi. Quis, officia!</p>
                </div>
                <div class="clear"></div>
            </div>
            <div class="functionItem">
                <div class="functionItemImage">
                    <img src="https://via.placeholder.com/300x150/ffffff/000000" alt="">
                </div>
                <div class="functionItemDescription">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate nostrum 
                    officiis, exercitationem asperiores laboriosam corrupti atque tempora animi. Quis, officia!</p>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>

    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/messages.js"></script>
</body>
</html>