$('#logoutButton').on('click', function(){
    localStorage.setItem('messageSuccess', 'Pomyślnie wylogowano.')
	location.href="../logout.php";
});

// piewrszy element tablicy wykorzystywany jest do wyswietlania błędów
// drugi do okreslenia czy dane są poprawnie wpisane
let validationObjects = {
	"firstName": ['First Name', true],
	"lastName": ['Last Name', true],
	"address": ['Address', true],
	"phoneNumber": ['Phone Number', true]
};

$('#editUserInfoButton').on('click', function(e){
    // jesli button to 'Edytuj dane' to wtedy zamieniamy pola na inputy
    // wraz z value będącymi aktualnymi danymi customera
    $button = $(e.currentTarget);
    $firstName = $('#firstName');
    $lastName = $('#lastName');
    $email = $('#email');
    $address = $('#address');
    $phoneNumber = $('#phoneNumber');
    if($button.hasClass('btnEdit')){
        insertInput($firstName, $firstName.html());
        insertInput($lastName, $lastName.html());
        insertInput($address, $address.html());
        insertInput($phoneNumber, $phoneNumber.html());

        $button.html("<i class='fas fa-save'></i> Zapisz dane");
        $button.removeClass("btnEdit");
        $button.addClass("btnSaveEdit");

        // Dodanie keyup eventów za pomocą jQuery do każdego inputka
        $('input').each(function(index){
            $(this).on('keyup', function(){
                validateInputValue($(this));
            });
        });
    }

    // jesli button to 'Zapisz dane' to wtedy aktualizujemy dane
    // usuwamy inputy i wracamy do wyswietlania tylko tekstu
    else if($button.hasClass('btnSaveEdit')){
        const userData = {
            firstName: $firstName[0].childNodes[0].value,
            lastName: $lastName[0].childNodes[0].value,
            email: $email.html(),
            address: $address[0].childNodes[0].value,
            phoneNumber: $phoneNumber[0].childNodes[0].value,
        }
        console.log(userData);
        $.ajax({
            type:"post",
            url:"editCustomerData.php",
            dataType:"json",
            data: userData,
            beforeSend: function(){
                $('body').css('opacity','0.6');
                $('body').css('cursor','progress');
            },
            success: function(json){
                switch(json){
                    case 0:
                        localStorage.setItem('messageSuccess', 'Pomyślnie zedytowano dane.');
                        location.href="index.php"
                        break;
                    default:
                        console.log('Default success response');
                        break;
                }
                $('body').css('opacity','1');
                $('body').css('cursor','default');
            },
            error: function(e){
                console.warn(e);
                $('body').css('opacity','1');
                $('body').css('cursor','default');
            }
        });
    }
});

// Wstawienie inputów w miejsce tekstu w tabelce
function insertInput($obj, $value){
    $obj.removeClass('tdBeforeEdit');
    $obj.addClass('tdDuringEdit');
    $obj.html("<input id='" + $obj[0].id + "' type='text' value='" + $value + "'>");
}

// Sprawdzenie czy pola nie sa puste, czyli walidacja
function validateInputValue($obj){
    if($obj.val() == ''){
        $obj.css('background',"#ffa8a8");
        validationObjects[$obj[0].id][1] = false;
        // wysyłam error do wyswietlenia
        errorService(true, 'Pole ' + validationObjects[$obj[0].id][0] + ' nie może być puste', $obj[0].id + "Error");
    } else if($obj[0].id == 'phoneNumber'){
        // nie ma dokładnie 9 znaków:
        if($obj.val().length != 9){
            $obj.css('background',"#ffa8a8");
            validationObjects[$obj[0].id][1] = false;
            // wysyłam error do wyswietlenia
            errorService(true, 'Pole ' + validationObjects[$obj[0].id][0] + ' musi zawierać 9 cyfr', $obj[0].id + "Error");
        } 
        // phoneNumber zawiera też litery lub znaki specjalne
        else if(isNaN($obj.val())){
            $obj.css('background',"#ffa8a8");
            validationObjects[$obj[0].id][1] = false;
            // wysyłam error do wyswietlenia
            errorService(true, 'Pole ' + validationObjects[$obj[0].id][0] + ' nie może zawierać liter lub znaków specjalnych', $obj[0].id + "Error");
        } 
        // phoneNumber poprawne
        else {
            $obj.css('background',"white");
            validationObjects[$obj[0].id][1] = true;
            // wysyłam info żeby usunąć error jesli taki był
            errorService(false, "" , $obj[0].id + "Error");
        }
    }else{
        $obj.css('background',"white");
        validationObjects[$obj[0].id][1] = true;
        // wysyłam info żeby usunąć error jesli taki był
        errorService(false, "" , $obj[0].id + "Error");
    }
    disableOrEnableEditButton();
}

// Zmiana buttona na disabled/enabled
function disableOrEnableEditButton(){
    // gdy po przejsciu przez ponizszego for'a, flag będzie true, to znaczy
    // że wszystkie pola sa poprawnie uzupełnione i można aktywowac przycisk
    let flag = true;
    const btnRegister = $('#editUserInfoButton');
	for (var k in validationObjects){
		if (validationObjects.hasOwnProperty(k)) {
			if(!validationObjects[k][1]){
				btnRegister.removeClass("btnSaveEdit");
				btnRegister.addClass("btnSaveEditDisabled");
                btnRegister.attr("disabled", "disabled");
                flag = false;
			}
		}
    }
    if(flag){
        // wszystkie elementy poprawne, można aktywować przycisk Register
        btnRegister.removeClass("btnSaveEditDisabled");
        btnRegister.addClass("btnSaveEdit");
        btnRegister.removeAttr("disabled");
    }
}

// wyswietlanie bledow
// action = true -> wyswietlanie błędu
// action = false -> usuwanie błędu
// msg - wiadomosć do wyswietlenia
// id - id span'u w którym pojawi sie konkretny błąd
function errorService(action, msg, id){
    if(action) {
        $('#'+id).remove();
        $error = $('<span></span>');
        $error.prop('class','edit-data-error');
        $error.html(msg);
        $error.prop('id', id);
        $('#content').append($error);
    } else{
        $('#'+id).remove();
    }
}

$('#changePasswordButton').on('click', function(){
    showModalComponent("Zmiana hasła");
})

// funkcja do tworzenia komponentu modala
function showModalComponent($titleText){
	// przezroczysty div na cały ekran
	$container=$('<div></div>');
	$container.prop('id','modalContainer');
	$container.css({
		'position':'fixed',
		'top':'0px',
		'left':'0px',
		'width':'100%',
		'height':'100%',
		'background':'rgba(255, 255, 255, 0.6)'
	});	

	$('body').append($container);

	// div wyśrodkowany w pionie i poziomie na tytuł i treść
	$content = $('<div></div>');
	$content.prop('id','modalContent');
	$content.css({
		'position':'absolute',
		'top':'50%',
		'left':'50%',
		'width':'500px',
		'padding': '20px 50px',
		'background':'#ff850c',
		'margin-left':'-270px',
		'margin-top':'-220px',
		'border-radius': '5px',
		'box-shadow': '0px 0px 5px 0px rgba(0,0,0,0.75)'
	});	
	$container.append($content).hide().fadeIn(100);

	// tytuł modala
	$title = $('<div></div>');
	$title.prop('id','modalTitle');
	$title.css({
		'width': '440px',
		'float': 'left',
		'padding': '10px 20px 20px 20px',
		'background':'#ff850c',
		'font-size':'1.3rem'
	});
	$title.html("<i class='fas fa-align-center' style='margin-right: 10px'></i>" + $titleText);
	$content.append($title);

	// przycisk do zamykania modala
	$closeButton = $('<div></div>');
	$closeButton.prop('id','closeModal');
	$closeButton.css({
		'width': '20px',
		'float': 'left',
		'font-size': '1.6rem',
		'background':'#ff850c'
	});
	$closeButton.hover(function(){
		$(this).css(
			"cursor", "pointer"
		);
	});
	$closeButton.html("<i class='fas fa-window-close'></i>");
	$content.append($closeButton);

	// div na wiadomosc do wyswietlenia
	$message = $('<div></div>');
	$message.prop('id','messageModal');
	$message.css({
		'width': '100%',
		'height': '100%',
		'font-size': '1.1rem'
	});

    $input = $("<input>");
    $input.attr('type', 'password');
    $input.attr('id', 'changePassInput');
    $input.attr('placeholder', 'Wpisz nowe hasło');
    $input.css({
		'width': '97%',
		'padding': '10px',
		'font-size': '1.1rem'
    });
    
    $button = $("<button></button>");
    $button.attr('id', 'acceptNewPassButton');
    $button.attr('class', 'btnEdit');
    $button.html('Zmień hasło');
    $button.css({
		'display': 'block',
		'margin': '0 auto',
		'margin-top': '10px'
    });

    $message.append($input);
    $message.append($button);
    $content.append($message);
    
    // po kliknięciu 'Zmień hasło'
    $button.on('click', function(){
        if($input.val().length < 5){
            $input.css('background',"#ffa8a8");
            $('#'+$input.attr('id')+"Error").remove();
            $error = $('<p></p>');
            $error.prop('class','edit-data-error');
            $error.attr('id', $input.attr('id')+"Error");
            $error.html('Nowe hasło musi mieć przynajmniej 5 znaków');
            
            $content.append($error);

            $input.on('keyup', function(){
                if($input.val().length < 5){
                    $input.css('background',"#ffa8a8");
                    $('#'+$input.attr('id')+"Error").remove();
                    $error = $('<span></span>');
                    $error.prop('class','edit-data-error');
                    $error.attr('id', $input.attr('id')+"Error");
                    $error.html('Nowe hasło musi mieć przynajmniej 5 znaków');
                    
                    $content.append($error);
                } else {
                    $input.css('background',"#f6f6f6");
                    $('#'+$input.attr('id')+"Error").remove();
                }
            })

        } else {
            $('#'+$input.attr('id')+"Error").remove();
            console.log($input.val());
            $.ajax({
                type:"post",
                url:"editCustomerData.php",
                dataType:"json",
                data: {
                    password: $input.val()
                },
                beforeSend: function(){
                    $('body').css('opacity','0.6');
                    $('body').css('cursor','progress');
                },
                success: function(json){
                    switch(json){
                        case 0:
                            localStorage.setItem('messageSuccess', 'Hasło zostało zmienione.');
                            location.href="index.php"
                            break;
                        default:
                            console.log('Default success response');
                            break;
                    }
                    $('body').css('opacity','1');
                    $('body').css('cursor','default');
                },
                error: function(e){
                    console.warn(e);
                    $('body').css('opacity','1');
                    $('body').css('cursor','default');
                }
            });
        }
        
    })

	// po kliknięciu gdziekolwiek poza content znika modal
	$container.on('click', function(){
		$container.fadeOut(100,function(){$container.remove();});
	}).children().click(function() {
		return false;
	});
	
	$closeButton.on('click', function(){
		$container.fadeOut(100,function(){$container.remove();});
	})
}