// do przechowywania wszystkich zwróconych z bazy zwierząt
let animalsList = [];
// do przechowywania ID wybranego zwierzęcie (tego którego detale są aktualnie pokazane)
let animalID = null;

// po załadowaniu strony
$(window).on('load', function(){
    showAnimalsList('onLoad'); 
});

// from - skąd wywołana została metoda. 'details' - z przycisku powrotu na detalach zwierzaka
function showAnimalsList(from){
	if(from === 'details'){
		$(".btnBackToAnimalList").remove();
		$("#btnEditAnimalInfo").remove();
		$("#contentTitle").empty();
		$("#contentTitle").html("<h1><i class='fas fa-paw'></i> Twoje zwierzęta </h1>");
		// jesli pojawiły nam się błędy walidacji podczas edycji, a ich nie naprawimy i naciśniemy przycisk 
		// 'Wróć do listy zwierząt' to musimy je usunąć ze strony
		$('.edit-data-error').each(function(index){
			$(this).remove();
		});
		// czyścimy tabele z wcześniejszymi wynikami z bazy
		$thead = $("#animalListThead");
		$tbody = $("#animalsListTbody");
		$thead.empty();
		$tbody.empty();
		$thead.html("<tr><th>Gatunek</th><th>Rasa</th><th>Imię</th></tr>");
	}
	$.ajax({									
		type:"post",
		url:"getAnimalsData.php",
		dataType:"json",
		data:{
			accType:"customer",
			returnVal:"fullData" // parametr określa że chcemy liste zwierząt
		},
		beforeSend: function(){
			$('#animalsList').css('opacity','0.6');
			$('#animalsList').css('cursor','progress');
		},
		success: function(json){
			// w przypadku braku wyników
			if(json[0]==0){
				$tr=$("<tr><td colspan='3'>Brak zwierząt</td></tr>");
				$("#animalsListTbody").append($tr);			
			}
			else if(json[0]==1){
				$tr=$("<tr><td colspan='3'>Brak zwierząt</td></tr>");
				$("#animalsListTbody").append($tr);		
				console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				// wstawiamy otrzymaną tablicę zwierząt na stronę do <tbody></tbody>
				animalsList = json;
				$tbody=$("#animalsListTbody");
				for(let i=0;i<json.length;i++){
					$tr=$("<tr></tr>");
					$tr.html("<td>"+json[i]['SPECIES']+"</td><td>"+
					json[i]['RACE']+"</td><td>"+json[i]['NAME']+"</td>");
					$tr.addClass('singleAnimalRow');
					$tbody.append($tr);
					// tworze Click Event dla każdego zwierzaka (rekordu)
					$tr.on('click', function(){
						showSelectedAnimalDetails(animalsList[i]);
					});
				};
			}
			$('#animalsList').css('opacity','1');
			$('#animalsList').css('cursor','default');
		},
		error: function(e){
			console.warn(e);
			$('body').css('opacity','1');
			$('body').css('cursor','default');
		}
	});
}

// odpalana po kliknięciu konkretnego zwierzaka z tabeli zwierząt
function showSelectedAnimalDetails(animal){
	$.ajax({									
		type:"post",
		url:"getAnimalsData.php",
		dataType:"json",
		data:{
			accType:"customer",
			returnVal:"detailsData", // parametr określa że chcemy detale zwierza o CUS_ANI_ID
			animalID: animal['CUS_ANI_ID']
		},
		beforeSend: function(){
			$('#animalsList').css('opacity','0.6');
			$('#animalsList').css('cursor','progress');
		},
		success: function(json){
			// w przypadku braku wyników
			if(json[0]==0){
				showMessage('Wystąpił błąd w tkracie pobierania szczegółów zwierzaka', false);		
			}
			else if(json[0]==1){
				showMessage('Wystąpił błąd w tkracie pobierania szczegółów zwierzaka', false);	
				console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				// czyszcze tytuł strony i zamieniam na tytuł z detalami zwierzaka
				$("#contentTitle").empty();
				$("#contentTitle").html("<h1><i class='fas fa-paw'></i> Szczegóły zwierzaka: " + animal['NAME'] + "</h1>");
				showBackButton();
				showEditButton();
				$thead = $("#animalListThead");
				$tbody = $("#animalsListTbody");
				$thead.empty();
				$tbody.empty();
				// wstawiamy konkretne otrzymane detale zwierzaka do <tbody></tbody>, czyli wyswietlam jego info
				$tbody.append("<tr><td>Imię: </td><td id='name' class='darkTheme'>"+json['NAME']+"</td></tr>");
				$tbody.append("<tr><td>Gatunek: </td><td class='darkTheme'>"+json['SPECIES']+" (" + json['SPECIES_DESC'] + ")</td></tr>");
				$tbody.append("<tr><td>Rasa: </td><td class='darkTheme'>"+json['RACE']+" (" + json['RACE_DESC'] + ")</td></tr>");
				$tbody.append("<tr><td>Wzrost: </td><td id='height' class='darkTheme'>"+json['HEIGHT']+"</td></tr>");
				$tbody.append("<tr><td>Waga: </td><td id='weight' class='darkTheme'>"+json['WEIGHT']+"</td></tr>");
				$tbody.append("<tr><td>Data urodzenia: </td><td class='darkTheme'>"+json['BIRTH_DATE']+"</td></tr>");
				// zapisuje CUS_ANI_ID z bazy w zmiennej animalID (przyda się do edycji danych tego zwierzaka)						
				animalID = animal['CUS_ANI_ID'];
			}
			$('#animalsList').css('opacity','1');
			$('#animalsList').css('cursor','default');
		},
		error: function(e){
			console.warn(e);
			$('body').css('opacity','1');
			$('body').css('cursor','default');
		}
	});
}

// tworzę przycisk do cofnięcia się do listy wszystkich zwierząt
function showBackButton(){
	$button = $("<button class='btnBackToAnimalList'><i class='fas fa-arrow-circle-left' style='margin-right: 10px'></i>Wróc do listy zwierząt</button>");
	$content = $("#content");
	$content.prepend($button);
	// tworze clickEvent dla stworzonego przycisku
	$('.btnBackToAnimalList').each(function(index){
		$(this).on('click', function(){
			showAnimalsList('details');
		});
	});
}

// tworzę przycisk do edycji danych zwierzęcia
function showEditButton(){
	$button = $("<button id='btnEditAnimalInfo' class='editAnimalButton'><i class='fas fa-edit' style='margin-right: 10px'></i>Edytuj dane zwierzaka</button>");
	$content = $("#content");
	$content.append($button);
	// tworze clickEvent dla stworzonego przycisku
	$button.on('click', function(e){
		// jesli ma klasę 'editAnimalButton' to pokazuję inputy
		if($button.hasClass('editAnimalButton')){
			showEditInputs($button);
		} 
		// jeśli ma klasę 'saveAnimalButton' to zapisuje dane z inputów i odpalam funkcje edytującą dane
		else if($button.hasClass('saveAnimalButton')){
			$weight = $('#weight');
			$height = $('#height');
			$name = $('#name');
			const animalData = {
				name: $name[0].childNodes[0].value,
				weight: $weight[0].childNodes[0].value,
				height: $height[0].childNodes[0].value,
				animalID: animalID
			}
			console.log(animalData);
			editAnimalData(animalData);
		}
	});
}

// pierwszy element tablicy wykorzystywany jest do wyswietlania błędów
// drugi do okreslenia czy dane są poprawnie wpisane
let validationObjects = {
	"weight": ['Waga', true],
	"height": ['Wzrost', true],
	"name": ['Imię', true]
};

// funkcja wywołana po kliknięciu przycisku 'Edytuj dane zwierzaka' z klasą 'editAnimalButton'
function showEditInputs($button){
	$weight = $('#weight');
    $height = $('#height');
	$name = $('#name');
	if($button.hasClass('editAnimalButton')){
        insertInput($weight, $weight.html());
        insertInput($height, $height.html());
        insertInput($name, $name.html());

        $button.html("<i class='fas fa-save'></i> Zapisz dane zwierzaka");
        $button.removeClass("editAnimalButton");
        $button.addClass("saveAnimalButton");

        // Dodanie keyup eventów za pomocą jQuery do każdego inputka
        $('input').each(function(index){
            $(this).on('keyup', function(){
                validateInputValue($(this));
            });
        });
    }
}

// Wstawienie inputów w miejsce tekstu w tabelce
function insertInput($obj, $value){
    $obj.addClass('tdDuringAnimalEdit');
    $obj.html("<input id='" + $obj[0].id + "' type='text' value='" + $value + "'>");
}

// Wstawienie tekstu w miejsce inputów w tabelce
function deleteInput($obj, $value){
    $obj.removeClass('tdDuringAnimalEdit');
    $obj.html($value);
}

// Sprawdzenie czy pola nie sa puste, czyli walidacja
function validateInputValue($obj){
    if($obj.val() == ''){
        $obj.css('background',"#ffa8a8");
        validationObjects[$obj[0].id][1] = false;
        // wysyłam error do wyswietlenia
        errorService(true, 'Pole ' + validationObjects[$obj[0].id][0] + ' nie może być puste', $obj[0].id + "Error");
    } else if($obj[0].id == 'weight' || $obj[0].id == 'height'){
        // zawiera też litery lub znaki specjalne
        if(isNaN($obj.val())){
            $obj.css('background',"#ffa8a8");
            validationObjects[$obj[0].id][1] = false;
            // wysyłam error do wyswietlenia
            errorService(true, 'Pole ' + validationObjects[$obj[0].id][0] + ' musi być liczbą', $obj[0].id + "Error");
        } 
        else {
            $obj.css('background',"white");
            validationObjects[$obj[0].id][1] = true;
            // wysyłam info żeby usunąć error jesli taki był
            errorService(false, "" , $obj[0].id + "Error");
        }
    } else{
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
    const btnRegister = $('#btnEditAnimalInfo');
	for (var k in validationObjects){
		if (validationObjects.hasOwnProperty(k)) {
			if(!validationObjects[k][1]){
				btnRegister.removeClass("saveAnimalButton");
				btnRegister.addClass("saveAnimalButtonDisabled");
                btnRegister.attr("disabled", "disabled");
                flag = false;
			}
		}
    }
    if(flag){
        // wszystkie elementy poprawne, można aktywować przycisk 'Zapisz dane zwierzaka'
        btnRegister.removeClass("saveAnimalButtonDisabled");
        btnRegister.addClass("saveAnimalButton");
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

// odpala się po kliknięciu przycisku 'Zapisz dane zwierzaka'
function editAnimalData(animalData){
	$.ajax({
		type:"post",
		url:"editAnimalData.php",
		dataType:"json",
		data: animalData,
		beforeSend: function(){
			$('body').css('opacity','0.6');
			$('body').css('cursor','progress');
		},
		success: function(json){
			switch(json){
				case 0:
					// bo nie odświeżam strony, to muszę zamienić tytuł na nowo zapisane dane
					$("#contentTitle").empty();
					$("#contentTitle").html("<h1><i class='fas fa-paw'></i> Szczegóły zwierzaka: " + animalData['name'] + "</h1>");
					// wyświetlam komunikat o powodzeniu
					showMessage('Pomyślnie zedytowano dane zwierzaka', true);
					$("html, body").animate({ scrollTop: 0 }, "slow");
					// zmieniam wartość buttona na 'Edytuj dane zwierzaka'
					$button = $('#btnEditAnimalInfo');
					$button.html("<i class='fas fa-edit'></i> Edytuj dane zwierzaka");
					$button.removeClass("saveAnimalButton");
					$button.addClass("editAnimalButton");
					// usuwanie inputów do edycji, pokazanie zwykłego tekstu już po edycji
					deleteInput($("#name"), animalData['name']);
					deleteInput($("#weight"), animalData['weight']);
					deleteInput($("#height"), animalData['height']);
					break;
				default:
					console.log('Default success response');
					break;
			}
			$('body').css('opacity','1');
			$('body').css('cursor','default');
		},
		error: function(e){
			showMessage('Wystąpił błąd w trakcie edycji danych', false);
			console.warn(e);
			$('body').css('opacity','1');
			$('body').css('cursor','default');
		}
	});
}

// funkcje istnieją, bo nie odświeżam strony w trakcie edycji zwierzęcia
function showMessage(msg, type){
	$message = $('#messagesInfo');
	$messageBox = $('#messages');
	$messageBox.css('display','block');
	if(type)
		$messageBox.prop('class','messageSuccess');
	else
	    $messageBox.prop('class','messageError');
	$message.html(msg);
}
$('#messagesCloseIcon').on("click", function(){
    $("#messages").css('display',"none");
});

// po kliknięciu przycisku 'Dodaj zwierzaka'
$("#btnAddAnimal").on('click', function(){
	console.log('add');
});