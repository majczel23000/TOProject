let validationObjects = {
	"firstName": ['Imię', true],
	"lastName": ['Nazwisko', true],
	"address": ['Adres', true],
	"phoneNumber": ['Numer telefonu', true],
	"academicTitle": ['Tytuł naukowy', true]
};

$('#editUserInfoButton').on('click', function(e){
    // jesli button to 'Edytuj dane' to wtedy zamieniamy pola na inputy
    // wraz z value będącymi aktualnymi danymi customera
    $button = $(e.currentTarget);
    $firstName = $('#firstName');
    $lastName = $('#lastName');
    $address = $('#address');
    $phoneNumber = $('#phoneNumber');
    $academicTitle = $('#academicTitle');
    if($button.hasClass('btnEdit')){
        insertInput($firstName, $firstName.html());
        insertInput($lastName, $lastName.html());
        insertInput($address, $address.html());
        insertInput($phoneNumber, $phoneNumber.html());
        insertInput($academicTitle, $academicTitle.html());
		
		//dodanie inputów do godzin przyjęć 
		$adminssionHours=$(".adminssion-hours");						//pobieramy godziny przyjęć
		$adminssionHours.each(function(){								//dla każdej komórki z godzinami przyjęć
			$(this).css('padding','10px');								//zmieniamy padding komórki, w której znajdują sie te godziny
			let startH;
			let finishH;
			
			$tableAH= $('<table></table>');								//tworzymy tabele;
			const dayID = $(this).attr('id');
			$tableAH.attr('id',dayID+'Table');
			$tableAH.addClass("editAH");								
			$trAH=$("<tr></tr>");
			$inputCheckbox=$('<input>');								//input z checkboxem
			$inputCheckbox.attr('id',dayID+'Checkbox');					//dajemy mu id 
			$val=$(this).html();
			if($val=="Brak Przyjęć"){									//jesli nie było godzin przyjeć to uznajemy, ze w tym dniu nie ma przyjęć
				$tdAH=$('<td></td>');									//tworzymy td
				$tdAH.attr('colspan','4');							
				$tdAH.css('width','80%');
				$tdAH.addClass('can-remove');							//potrzebny przy klikaniu w checkbox
				$tdAH.html('Dzień bez przyjęć');
				$trAH.append($tdAH);									//wstawiamy go do tr
				$inputCheckbox.attr('checked','true');					//zaznaczymy inputa
			}
			else{
				var splited = $val.split("-");							//w przeciwnym razie rozdzielamy godziny na startową i końcową
				startH=splited[0];
				finishH=splited[1];								
				//dodajemy tabele do uzupełnienia danych edycji
				$tdAH1=$('<td></td>');									//tworzymy td
				$tdAH1.html('Od');
				$tdAH1.addClass('can-remove');							//potrzebny przy klikaniu w checkbox
				$tdAH1.attr('style','font-size:13px');							
				$trAH.append($tdAH1);									//wstawiamy go do tr
				
				$inputSh=$('<input>');									//input z godzinami startowymi
				$inputSh.attr('type','time');
				$inputSh.attr('required','true');
				$inputSh.attr('id',dayID+'S');
				$inputSh.attr('value',startH);
				$tdAH2=$('<td></td>');									//td z inputem z godzinami startowymi
				$tdAH2.addClass('can-remove');
				$tdAH2.append($inputSh);
				$trAH.append($tdAH2);
				
				$tdAH3=$('<td></td>');									//tworzymy td
				$tdAH3.html('do');
				$tdAH3.attr('style','font-size:13px');		
				$tdAH3.addClass('can-remove');
				$trAH.append($tdAH3);									//wstawiamy go do tr
				
				$inputFh=$('<input>');									//input z godzinami finiszowymi
				$inputFh.attr('type','time');
				$inputFh.attr('required','true');
				$inputFh.attr('id',dayID+'F');
				$inputFh.attr('value',finishH);
				$tdAH4=$('<td></td>');									//td z inputem
				$tdAH4.addClass('can-remove');
				$tdAH4.append($inputFh);
				$trAH.append($tdAH4);
			}	
			
			$inputCheckbox.attr('type','checkbox');
			$inputCheckbox.on('click',function(){										//przy zaznaczaniu albo pokazujemy godziny, albo je zamykamy
				const id = $(this).parent().parent().parent().parent().attr('id');		//bo chcemy sie dostać do id tabeli, zeby sprawdzic jaki dzien został klikniety
				if($(this).is(':checked')){												//gdy został zaznaczony
					$("#"+id+" .can-remove ").remove();									//usuwamy komórki oprócz checkboxa			
					$td=$('<td></td>');									
					$td.attr('colspan','4');
					$td.addClass('can-remove');					
					$td.css('width','80%');
					$td.html('Dzień bez przyjęć');
					$("#"+id+" > tbody > tr").prepend($td);				
				}
				else{																	//to samo co wczesniej, ale idziemy od tyłu, zeby prepend pasowało
					$("#"+id+" .can-remove ").remove();	
					
					$input2=$('<input>');									
					$input2.attr('type','time');
					$input2.attr('id',dayID+'F');
					$input2.attr('required','true');
					$td4=$('<td></td>');									
					$td4.addClass('can-remove');
					$td4.append($input2);
					$("#"+id+" > tbody > tr").prepend($td4);
					
					$td3=$('<td></td>');								
					$td3.html('do');
					$td3.addClass('can-remove');
					$("#"+id+" > tbody > tr").prepend($td3);
					
					$input1=$('<input>');								
					$input1.attr('type','time');
					$input1.attr('required','true');
					$input1.attr('id',dayID+'S');
					$td2=$('<td></td>');								
					$td2.addClass('can-remove');
					$td2.append($input1);
					$("#"+id+" > tbody > tr").prepend($td2);

					$td1=$('<td></td>');									
					$td1.html('Od');
					$td1.addClass('can-remove');							
					$("#"+id+" > tbody > tr").prepend($td1);	
				}
			});
			$tdAH5=$('<td></td>');									//td z checkboxem
			$tdAH5.css('color','yellow');
			$tdAH5.append($inputCheckbox);
			$tdAH5.append('<i style="margin:0" class="far fa-lightbulb hint"></i>');	//dodanie żarówki która, po najechaniu na nią, pokaze podpowiedź
			$trAH.append($tdAH5);
			
			$tbodyAH=$('<tbody></tbody>');
			$tbodyAH.append($trAH);									//wstawiamy tr do tbody
			$tableAH.append($tbodyAH);								//wstawiamy tbody do tabeli
			$(this).html('');
			$(this).append($tableAH);	
			$hint=$('.hint');										//pokazanie wskazówki po najechaniu na żarówkę
			$hint.css('cursor','pointer');
			$hint.on('mouseover',function(){
				$(this).removeClass('far');
				$(this).addClass('fas');
				$hintDiv=$('<div></div>');
				$hintDiv.attr('id','hintDiv');
				$hintDiv.html('Jeśli w tym dniu nie prowadzisz przyjęć zaznacz kwadracik znajdujący się obok żarówki, w przeciwnim razie odznacz go i wprowadź godziny.');
				$hintDiv.css({
					'position':'absolute',
					'background-color':'#d9d9d9',
					'letter-spacing':'0.7px',
					'box-shadow':'0 5px 10px rgba(0, 0, 0, 0.1)',
					'border-radius':'10px',
					'padding':'10px',
					'margin-right':'20px',
					'text-align':'justify',
					'top':$(this).offset().top - 30,
					'left':$(this).offset().left + $(this).outerWidth() + 30
				});
				$('body').append($hintDiv);
				
			});
			$hint.on('mouseout',function(){
				$(this).removeClass('fas');
				$(this).addClass('far');
				$('#hintDiv').remove();
			});
		});

        $button.html("Zapisz dane");
        $button.removeClass("btnEdit");
        $button.addClass("btnSaveEdit");
		
		 // Dodanie keyup eventów za pomocą jQuery do każdego inputka
        $('#userInfo > tbody > tr > td > input').each(function(){
            $(this).on('keyup', function(){
                validateInputValue($(this));
            });
        });
    }

    // jesli button to 'Zapisz dane' to wtedy aktualizujemy dane
    // usuwamy inputy i wracamy do wyswietlania tylko tekstu
    else if($button.hasClass('btnSaveEdit')){
		//pobieramy dane o godzinach
		let mondayHours="";let tuesdayHours="";let wednesdayHours="";let thursdayHours="";let fridayHours="";let saturdayHours="";let sundayHours="";
		if(!$("#mondayAHCheckbox").is(':checked')){
			mondayHours=$("#mondayAHS").val()+"-"+$("#mondayAHF").val();
		}
		if(!$("#tuesdayAHCheckbox").is(':checked')){
			tuesdayHours=$("#tuesdayAHS").val()+"-"+$("#tuesdayAHF").val();
		}
		if(!$("#wednesdayAHCheckbox").is(':checked')){
			wednesdayHours=$("#wednesdayAHS").val()+"-"+$("#wednesdayAHF").val();
		}
		if(!$("#thursdayAHCheckbox").is(':checked')){
			thursdayHours=$("#thursdayAHS").val()+"-"+$("#thursdayAHF").val();
		}
		if(!$("#fridayAHCheckbox").is(':checked')){
			fridayHours=$("#fridayAHS").val()+"-"+$("#fridayAHF").val();
		}
		if(!$("#saturdayAHCheckbox").is(':checked')){
			saturdayHours=$("#saturdayAHS").val()+"-"+$("#saturdayAHF").val();
		}
		if(!$("#sundayAHCheckbox").is(':checked')){
			sundayHours=$("#sundayAHS").val()+"-"+$("#sundayAHF").val();
		}
			
        $.ajax({
            type:"post",
            url:"editDoctorData.php",
            dataType:"json",
            data:{
				firstName: $firstName[0].childNodes[0].value,
				lastName: $lastName[0].childNodes[0].value,
				address: $address[0].childNodes[0].value,
				phoneNumber: $phoneNumber[0].childNodes[0].value,
				academicTitle: $academicTitle[0].childNodes[0].value,
				mondayHours:mondayHours,
				tuesdayHours:tuesdayHours,
				wednesdayHours:wednesdayHours,
				thursdayHours:thursdayHours,
				fridayHours:fridayHours,
				saturdayHours:saturdayHours,
				sundayHours:sundayHours
			},
            beforeSend: function(){
                $('body').css('opacity','0.6');
                $('body').css('cursor','progress');
            },
            success: function(json){
				console.log(json);
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
    } 
	else if($obj[0].id == 'phoneNumber'){
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
    }
	else{
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
                url:"editDoctorData.php",
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