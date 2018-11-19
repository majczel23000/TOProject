<?php

    class CustomerPage{
        private $title = "[CustomerProfile]";
        private $buttons = Array(
            0 => Array
                (
                    "text" => "Wyloguj się",
                    "id" => "logoutButton",
                    "class" => "btn btnLogout",
                    "iClass" => "fas fa-sign-out-alt"
                ),
            1 => Array
                (
                    "text" => "Profil",
                    "href" => "index.php",
                    "class" => "btn btnMenu",
                    "iClass" => "fas fa-user"
                ),
            2 => Array
                (
                    "text" => "Zwierzęta",
                    "href" => "#",
                    "class" => "btn btnMenu",
                    "iClass" => "fas fa-paw"
                ),
            3 => Array
                (
                    "text" => "Lekarze",
                    "href" => "#",
                    "class" => "btn btnMenu",
                    "iClass" => "fas fa-user-md"
                ),
            4 => Array
                (
                    "text" => "Umów wizytę",
                    "href" => "#",
                    "class" => "btn btnMenu",
                    "iClass" => "fas fa-plus-square"
                )
        );
        private $styles = Array("mainStyles.css","doctorStyles.css");
		private $scripts = Array("jquery-3.3.1.min.js","customer.js","messages.js");
        private $user;
        
        public function __construct($t,$u){
            $this->title=$t;
            $this->user=$u;
        }

        public function showPage(){
            echo "<!DOCTYPE html>\n";
            echo "<html>\n";
            $this->showHead();
            $this->showBody();
        }

        private function showHead(){
            echo "<head>\n";
                echo "\t<meta charset=\"utf-8\">\n";
                echo "\t<title>".$this->title."</title>\n";
                echo "\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n";
                foreach($this->styles as $style)
                    echo "\t<link rel=\"Stylesheet\" type=\"text/css\" href=\"../css/".$style."\">\n";
                echo "\t<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.5.0/css/all.css\" integrity=\"sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU\" crossorigin=\"anonymous\">\n";
            echo "</head>\n";
        }

        private function showBody(){
            echo "<body>\n";
            $this->showNav();
            echo "\t<div id=\"content\">\n";				
            $this->showContent();
            echo "\t</div>\n";
            $this->showScripts();
            echo "</body>\n";
            echo "</html>";
        }

        private function showNav(){
            echo "\t<nav id=\"menu\">\n";
            echo "\t\t<div id=\"appTitle\">\n";
            echo "\t\t\t<a>VetManager</a>\n";
            echo "\t\t</div>\n";
            echo "\t\t<div id=\"actionButtons\">\n";
            foreach($this->buttons as $butt){
                echo "\t\t\t<a ";
                if(isset($butt['id']))
                    echo "id=\"".$butt['id']."\" ";
                if(isset($butt['href']))
                    echo "href=\"".$butt['href']."\" ";
                echo "class=\"".$butt['class']."\"> <i class=\"".$butt['iClass']."\" style=\"margin-right: 10px\"></i>".$butt['text']."</a>\n";
            }
            echo "\t\t</div>\n";
            echo "\t\t<div class=\"clear\"></div>\n";
            echo "\t\t<div id=\"messages\">\n";
            echo "\t\t\t<div id=\"messagesInfo\"></div>\n";
            echo "\t\t\t<div id=\"messagesClose\"><i id=\"messagesCloseIcon\" class=\"fas fa-times-circle\"></i></div>\n";
            echo "\t\t\t<div class=\"clear\"></div>\n";
            echo "\t\t</div>\n";
            echo "\t</nav>\n";
        }

        public function showContent(){															//publiczna zeby mozna było ją zmienić na potrzeby danej pdostrony (albo protected)
            echo "\t\t	<div id=\"contentTitle\">\n";
            echo "\t\t\t<h1>Witaj ".$this->user->getFirstName()." ".$this->user->getLastName()."</h1>\n";
            echo "\t\t	</div>\n";
            echo "\t\t	<div id=\"contentDescription\">\n";
            echo "\t\t\tJesteś na podstronie ".$this->title.".\n";
            echo "\t\t	</div>\n";
        }

        private function showScripts(){
            foreach($this->scripts as $script)
                echo "\t<script src=\"../js/".$script."\"></script>\n";
        }
    }

?>