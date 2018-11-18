<!-- <?php
	session_start();
	require("../class/customer.inc");
	if (!(isset($_SESSION['CUSTOMER'])) || !unserialize($_SESSION['CUSTOMER'])->checkIsLogged()){			//jesli nie zalogował sie to go wyrzucamy
		header('Location: ../login.php');
		exit();
	}
	$customer = unserialize($_SESSION['CUSTOMER']);
	echo $customer;
	echo '<a href="../logout.php">Wyloguj się</a><br>';
?> -->

<html>
<html>
<head>
  <meta charset="utf-8">
  <title>[CustomerProfile] VetManager</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="Stylesheet" type="text/css" href="../css/style.css" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">


</head>
<body>
    <nav id="menu">
        <div id="appTitle">
            <a>VetManager</a>
        </div>
        <div id="appAuthButtons">
            <a href="../logout.php" class="btn btnRegister"><i class="fas fa-sign-out-alt" style="margin-right: 10px"></i>Wyloguj się</a>
            <a class="btn btnMenu"><i class="fas fa-user" style="margin-right: 10px"></i>Profil</a>
            <a class="btn btnMenu"><i class="fas fa-paw" style="margin-right: 10px"></i>Zwierzęta</a>
            <a class="btn btnMenu"><i class="fas fa-user-md" style="margin-right: 10px"></i>Lekarze</a>
            <a class="btn btnMenu"><i class="fas fa-plus-square" style="margin-right: 10px"></i>Umów wizytę</a>
        </div>
        <div class="clear"></div>
    </nav>

    <div id="content">
        <div id="contentTitle">
            <h1>Witaj <?php echo "elo" ?></h1>
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

</body>
</html>