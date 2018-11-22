$('#logoutButton').on('click', function(){
    localStorage.setItem('messageSuccess', 'Pomyslnie wylogowano.')
	location.href="../logout.php";
});

let validationObjects = {
	"firstName": ['First Name', true],
	"lastName": ['Last Name', true],
	"address": ['Address', true],
	"phoneNumber": ['Phone Number', true],
	"academicTitle": ['Academic Title', true]
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

        $button.html("Zapisz dane");
        $button.removeClass("btnEdit");
        $button.addClass("btnSaveEdit");
		
		 // Dodanie keyup eventów za pomocą jQuery do każdego inputka
        $('input').each(function(){
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
            address: $address[0].childNodes[0].value,
            phoneNumber: $phoneNumber[0].childNodes[0].value,
            academicTitle: $academicTitle[0].childNodes[0].value
        }
        //console.log(userData);
        $.ajax({
            type:"post",
            url:"editDoctorData.php",
            dataType:"json",
            data: userData,
            beforeSend: function(){
                $('body').css('opacity','0.6');
                $('body').css('cursor','progress');
            },
            success: function(json){
				switch(json){
                    case 0:
                        localStorage.setItem('messageSuccess', 'Pomyslnie zedytowano dane.');
                        location.href="index.php"
                        break;
                    default:
                        console.log('Default success response');
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