$('#logoutButton').on('click', function(){
    localStorage.setItem('messageSuccess', 'Pomyslnie wylogowano.')
	location.href="../logout.php";
});

let validationObjects = {
	"firstName": true,
	"lastName": true,
	"address": true,
	"phoneNumber": true
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

        $button.html("Zapisz dane");
        $button.removeClass("btnEdit");
        $button.addClass("btnSaveEdit");
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
    $obj.html("<input id='" + $obj[0].id + "' type='text' value='" + $value + "' onkeyup='validateInputValue(event)'>");
}

// sprawdza czy przypadkiem nie jest puste
function validateInputValue(e){
	//const name="emptyInput";
    if(e.target.value == ''){
        e.target.style.background="#ffa8a8";
        validationObjects[e.target.id] = false;
		//errorService(name,"Prosze uzupełnić wszystkie pola.");
    } else{
        e.target.style.background="white";
        validationObjects[e.target.id] = true;
    }
	let emptyInputError=false;
	$("input").each(function() {
		if($(this).css("background-color")=="rgb(255, 168, 168)"){
			console.log("błąd");
			emptyInputError=true;
			errorService("emptyInput","Prosze uzupełnić wszystkie pola");
		}
	});
	if(!emptyInputError)
		if($("#emptyInputErr").length>0)
			$("#emptyInputErr").remove();

    // gdy po przejsciu przez ponizszego for'a, flag będzie true, to znaczy
    // że wszystkie pola sa poprawnie uzupełnione i można aktywowac przycisk
    let flag = true;
    const btnRegister = $('#editUserInfoButton');
	for (var k in validationObjects){
		if (validationObjects.hasOwnProperty(k)) {
			if(!validationObjects[k]){
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

function errorService(name,msg){													//przyjmuje nazwe błędu, obiekt, który wywołał błąd (input) oraz treść błędu
	//validationObjects[$obj[0].id] = false;
	if($('#'+name+'Err').length<1){													//jesli nie ma jeszcze takiego błędu to wchodzimy do ifa
		$error = $('<span></span>');
		$error.prop('class','edit-data-error');
		$error.prop('id',name+'Err');
		$error.html(msg);
		$('#content').append($error);
	}
}