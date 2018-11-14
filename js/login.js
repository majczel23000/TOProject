$('.btnLogin').on('click',function(){
	const mailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/					//regularne dla maila
	const email=$('#email').val();
	const password=$('#password').val();
	
	if($('.login-error').length>0)																	//jesli byly jakies błędy to je usuwamy
		$('.login-error').remove();
	
	if(!email || !password){
		$loginEmptyInput = $('<span></span>');
		$loginEmptyInput.prop('class','login-error');
		/*$loginEmptyInput.css({
			'top': $(this).offset().top,
			'left': $(this).offset().left + $(this).outerWidth() + 20
		})*/
		$loginEmptyInput.html('Proszę uzupełnić wszystkie pola!');
		$('#loginForm').append($loginEmptyInput);
	}
	else if(!mailReg.test(email)){																//jesli nie jest poprawne i nie ma błędu juz to pokazujemy błąd
		$loginEmptyInput = $('<span></span>');
		$loginEmptyInput.prop('class','login-error');
		/*$loginEmptyInput.css({
			'top': $(this).offset().top,
			'left': $(this).offset().left + $(this).outerWidth() + 20
		})*/
		$loginEmptyInput.html('Adres Email posiada niewłaściwy format!');
		$('#loginForm').append($loginEmptyInput);
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
			success: function(json){
				switch(json){
					case 1:
						$loginEmptyInput = $('<span></span>');
						$loginEmptyInput.prop('class','login-error');
						$loginEmptyInput.html('Nie można nawiazać połączenia! Prosimy spróbować ponowanie później.');
						$('#loginForm').append($loginEmptyInput);
						break;
					case 2:
						$loginEmptyInput = $('<span></span>');
						$loginEmptyInput.prop('class','login-error');
						$loginEmptyInput.html('Wprowadzone dane są nieprawidłowe!');
						$('#loginForm').append($loginEmptyInput);
						break;
					case 0:
						location.href="home.php";
						break;	
					default:
						$loginEmptyInput = $('<span></span>');
						$loginEmptyInput.prop('class','login-error');
						$loginEmptyInput.html('Wystąpił nieznany błąd!');
						$('#loginForm').append($loginEmptyInput);
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
})