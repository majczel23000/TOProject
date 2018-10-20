<!doctype html>
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
            <a href="index.html">VetManager</a>
        </div>
        <div id="appAuthButtons">
            <a href="login.php" class="btn btnLogin">Login</a>
            <a href="register.php" class="btn btnRegister">Register</a>
        </div>
        <div class="clear"></div>
    </nav>

    <div id="content">
        <div id="contentTitle">
            <h1>Log into the system:</h1>
        </div>
        <form id="loginForm">
            <div class="formGroup">
                <label>Email: </label>
                <input type="email" name="email">
                <div class="clear"></div>
            </div>
            <div class="formGroup">
                <label>Password: </label>
                <input type="password" name="password">
                <div class="clear"></div>
            </div>
            <button type="submit" class="btn btnLogin">Login</button>
            <div class="clear"></div>
        </form>
    </div>

</body>
</html>