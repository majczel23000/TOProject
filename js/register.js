// obiekt ktory przyjmuje jako key nazwe pola rejestracji,
// a jako value true - poprawnie uzupełnione pole,
// albo false - błędnie uzupełnione pole
let validationObjects = {
	"firstName": false,
	"lastName": false,
	"email": false,
	"password": false,
	"confirmPassword": false
};

//obsługa maila
var rotation=0;
$('#email').on('blur',function(){
	const mailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/					//regularne dla maila
	const name="wrongSyntaxEmail";
	let isSyntaxError = false;
	if(!mailReg.test($(this).val())){																//sprawdzamy czy zgadza sie z wyrażeniem regularnym
		errorService(name,$(this),'Adres Email posiada niewłaściwy format!');						//wywołanie funkcji generującej błąd
		isSyntaxError=true;																			//zapisujemy, ze był błąd, aby nie sprawdzać już czy email wolny
		validationObjects["email"] = false;
	}
	else{
		deleteErrors(name);
		validationObjects["email"] = true;
	}
	checkIfAllValid();
	
	if(!isSyntaxError){																				//jesli nie było błędu to sprawdzamy czy mail jest wolny
		$.ajax({
			type:"post",
			url:"ismailavailable.php",
			dataType:"json",
			data:{
				email:$(this).val()
			},
			beforeSend: function(){
				$loadingImg=$('<img src="img/loading.png">');													//tworzymy wykrzyknik i nadajemy odpowiednie paramatery i właściwości
				$loadingImg.prop('id','loadingImg');
				$loadingImg.css({
					'position':'absolute',
					'top':$('#email').offset().top,
					'left':$('#email').offset().left - 50,
					'width':$('#email').outerHeight(),
					'height':$('#email').outerHeight(),
				});	
				$('body').append($loadingImg);
				setInterval(function(){ 
					rotation += 5;
					$('#loadingImg').css({'-webkit-transform' : 'rotate('+ rotation +'deg)',
								 '-moz-transform' : 'rotate('+ rotation +'deg)',
								 '-ms-transform' : 'rotate('+ rotation +'deg)',
								 'transform' : 'rotate('+ rotation +'deg)'});
				}, 20);
				
				//$('#registerForm').css('opacity','0.8');
				//$('#registerForm').css('cursor','progress');
			},
			success: function(json){
				const name="mailNotAvailable";
				if(!json)																			//jesli json==false to znaczy, ze mail zajęty
					errorService(name,$('#email'),'Adres Email jest już zajęty!');					//wiec generujemy błąd
				else
					deleteErrors(name);																//jesli był błąd a juz nie powinien byc to usuwamy		
				$('#loadingImg').remove();
				checkIfAllValid();
			},
			error: function(e){
				console.warn(e);
				$('#loadingImg').remove();
			}
		})
	}
});

//obsługa imienie
$('#firstName').on('blur',function(){
	const nameReg = /^([a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ.-\s]){3,20}$/								//regularne tylko dla liter
	const name="emptyFirstName";															//nazwa błędu z pustym inputem
	const name2="tooLessLetterFN";															//nazwa błęd, gdy za mało liter
	if(!$(this).val()){																		//jesli pole puste	
		deleteErrors(name2);																//usuwamy drugi błąd dla tego pola, jesli był generowany 	
		errorService(name,$(this),'Prosze uzupełnić imię!');								//i tworzymy aktualny błąd
	}
	else if(!nameReg.test($(this).val())){													//to samo co w IF powyżej
		deleteErrors(name);
		errorService(name2,$(this),'Imię musi zawierać od 3 do 20 liter!');						
	}
	else{																					//jesli ok, to usuwamy dwa błędy
		deleteErrors(name);
		deleteErrors(name2);
		validationObjects["firstName"] = true;												//zapisujemy, ze pole jest ok
	}
	checkIfAllValid();																		//sprawdzamy czy mozna aktywować przycisk
});

//obsługa nazwiska
$('#lastName').on('blur',function(){
	const nameReg = /^([a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ.-\s]){3,20}$/								//regularne tylko dla liter
	const name="emptyLastName";
	const name2="tooLessLetterLN";															//nazwa błęd, gdy za mało liter
	if(!$(this).val()){																		//jesli pole puste	
		deleteErrors(name2);																//usuwamy drugi błąd dla tego pola, jesli był generowany 	
		errorService(name,$(this),'Prosze uzupełnić nazwisko!');								//i tworzymy aktualny błąd
	}
	else if(!nameReg.test($(this).val())){													//to samo co w IF powyżej
		deleteErrors(name);
		errorService(name2,$(this),'Nazwisko musi zawierać od 2 do 25 liter!');						
	}
	else{																					//jesli ok, to usuwamy dwa błędy
		deleteErrors(name);
		deleteErrors(name2);
		validationObjects["lastName"] = true;												//zapisujemy, ze pole jest ok
	}
	checkIfAllValid();	
});

//obsługa hasła
$('#password').on('keyup',function(){
	const name="weakPass";
	if($(this).val().length<5)																		//jesli hasło ma mniej niz 5 liter	
		errorService(name,$(this),'Hasło musi zawierać co najmniej 5 znaków!');						//no a tu to to samo co wczesniej
	else{
		deleteErrors(name);
		validationObjects["password"] = true;
	}
	checkIfAllValid();	
});

//obsługa potwierdzenia hasła
$('#confirmPassword').on('keyup',function(){
	const name="diffrentPass";
	if($(this).val()!=$('#password').val())															//jesli hasła się różnią	
		errorService(name,$(this),'Podane hasła nie są takie same!');								//no a tu to to samo co wczesniej
	else{
		deleteErrors(name);
		validationObjects["confirmPassword"] = true;
	}
	checkIfAllValid();
});

// akcja po kliknięciu przycisku register
$('#btnRegister').on('click', function(){
	register();
});

//funkcja wyswietlająca błedy
function errorService(name,$obj,msg){													//przyjmuje nazwe błędu, obiekt, który wywołał błąd (input) oraz treść błędu
	validationObjects[$obj[0].id] = false;
	if($('#'+name+'Info').length<1){													//jesli nie ma jeszcze takiego błędu to wchodzimy do ifa
		$errorInfo=$('<span></span>');													//tworzymy wykrzyknik i nadajemy odpowiednie paramatery i właściwości
		$errorInfo.prop('class','register-error-info');
		$errorInfo.prop('id',name+'Info');
		$errorInfo.html('!');
		$errorInfo.css({
			'top':$obj.offset().top,
			'left':$obj.offset().left + $obj.outerWidth() + 10,
			'width':$obj.outerHeight(),
			'height':$obj.outerHeight(),
			'font-size':$obj.outerHeight() - 10,
		});	
		$errorInfo.on('mouseover',function(){											//po najechaniu pokazuje nam się treśc błędu
			$error = $('<span></span>');
			$error.prop('class','register-error');
			$error.prop('id',name);
			$error.html(msg);
			$('#registerForm').append($error);
		})
		$errorInfo.on('mouseout',function(){											//a po zjechaniu usuwa
			if($('#'+name))
				$('#'+name).remove();
		})
		$('body').append($errorInfo);													//i dodajemy błąd do strony
	}
}
//funkcja usuwająca błedy
function deleteErrors(name){
	if($('#'+name+'Info').length>0)
		$('#'+name+'Info').remove();
	if($('#'+name).length>0)
		$('#'+name).remove();
}

// sprawdź, czy wszystkie elementy z validationObjects są poprawne 
// i odpowiednio pokaż przycisk rejestracji (disabled/enabled)
function checkIfAllValid(){
	const btnRegister = $('#btnRegister');
	for (var k in validationObjects){
		if (validationObjects.hasOwnProperty(k)) {
			if(!validationObjects[k]){
				btnRegister.removeClass("btnRegister");
				btnRegister.addClass("btnRegisterDisabled");
				btnRegister.attr("disabled", "disabled");
				return false;
			}
		}
	}
	// wszystkie elementy poprawne, można aktywować przycisk Register
	btnRegister.removeClass("btnRegisterDisabled");
	btnRegister.addClass("btnRegister");
	btnRegister.removeAttr("disabled"); 
	return true;    
}

$('body').on("keypress", function(e){
	if(e.which === 13 && checkIfAllValid()){
		register();
	}
})

function register(){
	// czy wszystkie są poprawnie wpisane
	if(checkIfAllValid()){
		const firstName = $("#firstName").val();
		const lastName = $("#lastName").val();
		const email = $("#email").val();
		const password = $("#password").val();
		$.ajax({
			type:"post",
			url:"registerproccess.php",
			dataType:"json",
			data:{
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password
			},
			beforeSend: function(){
				$('body').css('opacity','0.6');
				$('body').css('cursor','progress');
			},
			success: function(json){
				switch(json){
					case 0:
						localStorage.setItem('messageSuccess', 'Pomyślnie zarejestrowano. Prosze się zalogować.')
						location.href="login.php";
					default:
						console.log('Default success response');
				}
				$('body').css('opacity','1');
				$('body').css('cursor','default');
			},
			error: function(e){
				console.warn(e);
				$('body').css('opacity','1');
				$('body').css('cursor','default');
			}
		})
	}
}