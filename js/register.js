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
$('#email').on('blur',function(){
	const mailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/					//regularne dla maila
	const name="wrongSyntaxEmail";
	let isSyntaxError = false;
	if(!mailReg.test($(this).val())){																//sprawdzamy czy zgadza sie z wyrażeniem regularnym
		errorService(name,$(this),'Adres Email posiada niewłaściwy format!');						//wywołanie funkcji generującej błąd
		isSyntaxError=true;																			//zapisujemy, ze był błąd, aby nie sprawdzać już czy email wolny
		validationObjects["email"] = false;
	}
	else
	{
		if($('#'+name+'Info').length>0)																//jesli był błąd a juz nie powinien byc to usuwamy		
			$('#'+name+'Info').remove();
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
				$('#registerForm').css('opacity','0.8');
				$('#registerForm').css('cursor','progress');
			},
			success: function(json){
				const name="mailNotAvailable";
				if(!json)																			//jesli json==false to znaczy, ze mail zajęty
					errorService(name,$('#email'),'Adres Email jest już zajęty!');					//wiec generujemy błąd
				else
					if($('#'+name+'Info').length>0)													//jesli był błąd a juz nie powinien byc to usuwamy		
						$('#'+name+'Info').remove();
				$('#registerForm').css('opacity','1');
				$('#registerForm').css('cursor','default');
			},
			error: function(e){
				console.warn(e);
				$('#registerForm').css('opacity','1');
				$('#registerForm').css('cursor','default');
			}
		})
	}
});

//obsługa imienie
$('#firstName').on('keyup',function(){
	const name="emptyFirstName";
	if(!$(this).val())																		//jesli hasło ma mniej niz 5 liter	
		errorService(name,$(this),'To pole nie może pozostać puste!');						//no a tu to to samo co wczesniej
	else{
		if($('#'+name+'Info').length>0)
			$('#'+name+'Info').remove();
		validationObjects["firstName"] = true;
	}
	checkIfAllValid();	
});

//obsługa nazwiska
$('#lastName').on('keyup',function(){
	const name="emptyLastName";
	if(!$(this).val())																		//jesli hasło ma mniej niz 5 liter	
		errorService(name,$(this),'To pole nie może pozostać puste!');						//no a tu to to samo co wczesniej
	else{
		if($('#'+name+'Info').length>0)
			$('#'+name+'Info').remove();
		validationObjects["lastName"] = true;
	}
	checkIfAllValid();	
});

//obsługa hasła
$('#password').on('keyup',function(){
	const name="weakPass";
	if($(this).val().length<5)																		//jesli hasło ma mniej niz 5 liter	
		errorService(name,$(this),'Hasło musi zawierać co najmniej 5 znaków!');						//no a tu to to samo co wczesniej
	else{
		if($('#'+name+'Info').length>0)
			$('#'+name+'Info').remove();
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
		if($('#'+name+'Info').length>0)
			$('#'+name+'Info').remove();
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
						localStorage.setItem('messageSuccess', 'Pomyslnie zarejestrowano. Prosze się zalogować.')
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