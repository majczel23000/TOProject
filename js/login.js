const mailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/					//regularne dla maila
$("#email").on('blur',function(){
	if(!mailReg.test($(this).val())){								//jesli nie jest poprawne i nie ma błędu juz to pokazujemy błąd
		if($('.login-error').length>0)
			$('.login-error').remove();
		$loginBlurError = $('<span></span>');
		$loginBlurError.prop('class','login-error');
		$loginBlurError.prop('id','loginBlurError');
		$loginBlurError.html('Adres Email posiada niewłaściwy format!');
		$('#loginForm').append($loginBlurError);
	}
	else{
		if($('#loginBlurError').length>0)
			$('#loginBlurError').remove();
	}
});
$('.btnLogin').on('click',function(){
	login();
});

$('body').on("keypress", function(e){
	if(e.which === 13){
		login();
	}
})

function login(){
	const email=$('#email').val();
	const password=$('#password').val();
	
	if($('.login-error').length>0)																	//jesli byly jakies błędy to je usuwamy
		$('.login-error').remove();
	
	if(!email || !password){
		$loginEmptyInput = $('<span></span>');
		$loginEmptyInput.prop('class','login-error');
		$loginEmptyInput.html('Proszę uzupełnić wszystkie pola!');
		$('#loginForm').append($loginEmptyInput);
	}
	else if(!mailReg.test(email)){																//jesli nie jest poprawne i nie ma błędu juz to pokazujemy błąd
		$wrongSyntaxEmail = $('<span></span>');
		$wrongSyntaxEmail.prop('class','login-error');
		$wrongSyntaxEmail.html('Adres Email posiada niewłaściwy format!');
		$('#loginForm').append($wrongSyntaxEmail);
	}
	else{
		$.ajax({
			type:"post",
			url:"loginproccess.php",
			dataType:"json",
			data:{
				email:email,
				password:password
			},
			beforeSend: function(){
				$('body').css('opacity','0.6');
				$('body').css('cursor','progress');
			},
			success: function(json){						//json to tablica, idx 0 - rezultat logowania, idx 1 - dokąd przekierować(doctor, customer)
				switch(json[0]){
					case 1:
						$errLogin = $('<span></span>');
						$errLogin.prop('class','login-error');
						$errLogin.html('Nie można nawiazać połączenia! Prosimy spróbować ponowanie później.');
						$('#loginForm').append($errLogin);
						break;
					case 2:
						$errLogin = $('<span></span>');
						$errLogin.prop('class','login-error');
						$errLogin.html('Wprowadzone dane są nieprawidłowe!');
						$('#loginForm').append($errLogin);
						break;
					case 0:
						localStorage.setItem('messageSuccess', 'Pomyślnie zalogowano. Witamy ponownie.');
						location.href=json[1];
						break;	
					default:
						$errLogin = $('<span></span>');
						$errLogin.prop('class','login-error');
						$errLogin.html('Wystąpił nieznany błąd!');
						$('#loginForm').append($errLogin);
						break;
				}
				console.log(json);
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

