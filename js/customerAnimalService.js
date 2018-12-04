// do przechowywania wszystkich zwróconych z bazy zwierząt, gatunków i ras
let animalsList = [];
let animalsSpecies = [];
let animalsRaces = [];
// do przechowywania ID wybranego zwierzęcie (tego którego detale są aktualnie pokazane)
let animalID = null;
let speciesID = null;
let raceID = null;

// po załadowaniu strony
$(window).on('load', function(){
    showAnimalsList('onLoad'); 
});

// from - skąd wywołana została metoda. 'details' - z przycisku powrotu na detalach zwierzaka
function showAnimalsList(from){
	if(from === 'details'){
		$(".btnBackToAnimalList").remove();
		$("#btnEditAnimalInfo").remove();
		$("#btnConfirmAddAnimal").remove();
		$("#contentTitle").empty();
		$("#contentTitle").html("<h1><i class='fas fa-paw'></i> Twoje zwierzaki </h1>");
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
					$tr.html("<td style=\"width: 33.3%\">"+json[i]['SPECIES']+"</td><td style=\"width: 33.3%\">"+
					json[i]['RACE']+"</td><td style=\"width: 33.3%\">"+json[i]['NAME']+"</td>");
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
				console.log(json);
				// czyszcze tytuł strony i zamieniam na tytuł z detalami zwierzaka
				$("#contentTitle").empty();
				$("#contentTitle").html("<h1><i class='fas fa-paw'></i> Szczegóły zwierzaka: " + json['NAME'] + "</h1>");
				showBackButton();
				showEditButton();
				$thead = $("#animalListThead");
				$tbody = $("#animalsListTbody");
				$thead.empty();
				$tbody.empty();
				// wstawiamy konkretne otrzymane detale zwierzaka do <tbody></tbody>, czyli wyswietlam jego info
				$tbody.append("<tr><td style=\"width: 50%\">Imię: </td><td style=\"width: 50%\" id='name' class='darkTheme'>"+json['NAME']+"</td></tr>");
				$tbody.append("<tr><td style=\"width: 50%\">Gatunek: </td><td style=\"width: 50%\" class='darkTheme'>"+json['SPECIES']+
					"<button id='btnSpeciesDesc' class='btnInfo'><i class='fas fa-info'></i></button></td></tr>");
				$tbody.append("<tr><td style=\"width: 50%\">Rasa: </td><td id='race' style=\"width: 50%\" class='darkTheme'>"+json['RACE']+ 
					"<button id='btnRaceDesc' class='btnInfo'><i class='fas fa-info'></i></button></td></tr>");
				if(json['GENDER'] === 'MALE')
					translatedGender = 'Samiec';
				else
					translatedGender = 'Samica';
				$tbody.append("<tr><td style=\"width: 50%\">Płeć: </td><td style=\"width: 50%\" id='gender' class='darkTheme'>"+translatedGender+"</td></tr>");	
				$tbody.append("<tr><td style=\"width: 50%\">Wzrost: </td><td style=\"width: 50%\" id='height' class='darkTheme'>"+json['HEIGHT']+"</td></tr>");
				$tbody.append("<tr><td style=\"width: 50%\">Waga: </td><td style=\"width: 50%\" id='weight' class='darkTheme'>"+json['WEIGHT']+"</td></tr>");
				$tbody.append("<tr><td style=\"width: 50%\">Data urodzenia: </td><td style=\"width: 50%\" class='darkTheme'>"+json['BIRTH_DATE']+"</td></tr>");
				$("#btnRaceDesc").on('click', function(){
					showModalComponent('Opis Rasy', json['RACE_DESC']);
				});
				$("#btnSpeciesDesc").on('click', function(){
					showModalComponent('Opis gatunku', json['SPECIES_DESC']);
				});
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
			editAnimalData(animalData);
		}
	});
}

// pierwszy element tablicy wykorzystywany jest do wyswietlania błędów
// drugi do okreslenia czy dane są poprawnie wpisane
let validationObjectsAdd = {
	"weight": ['Waga', false],
	"height": ['Wzrost', false],
	"name": ['Imię', false],
	"birthDate": ['Data urodzenia', false]
};
let validationObjectsEdit = {
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
                validateInputValue($(this), $button, validationObjectsEdit);
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
function validateInputValue($obj, $button, $objects){
	console.log($objects);
    if($obj.val() == ''){
        $obj.css('background',"#ffa8a8");
        $objects[$obj[0].id][1] = false;
        // wysyłam error do wyswietlenia
        errorService(true, 'Pole ' + $objects[$obj[0].id][0] + ' nie może być puste', $obj[0].id + "Error");
    } else if($obj[0].id == 'weight' || $obj[0].id == 'height'){
        // zawiera też litery lub znaki specjalne
        if(isNaN($obj.val())){
            $obj.css('background',"#ffa8a8");
            $objects[$obj[0].id][1] = false;
            // wysyłam error do wyswietlenia
            errorService(true, 'Pole ' + $objects[$obj[0].id][0] + ' musi być liczbą', $obj[0].id + "Error");
        } 
        else {
            $obj.css('background',"white");
            $objects[$obj[0].id][1] = true;
            // wysyłam info żeby usunąć error jesli taki był
            errorService(false, "" , $obj[0].id + "Error");
        }
	}else if($obj[0].id == 'birthDate'){
		selectedDate = new Date($obj.val());
		currentDate = new Date();
		if(selectedDate > currentDate){
			$obj.css('background',"#ffa8a8");
            $objects[$obj[0].id][1] = false;
			errorService(true, "Pole " + $objects[$obj[0].id][0] + " musi mieć datę wcześniejszą od aktualnej", $obj[0].id + "Error");
		}else{
			$obj.css('background',"white");
            $objects[$obj[0].id][1] = true;
            // wysyłam info żeby usunąć error jesli taki był
            errorService(false, "" , $obj[0].id + "Error");
		}	
	}else{
        $obj.css('background',"white");
        $objects[$obj[0].id][1] = true;
        // wysyłam info żeby usunąć error jesli taki był
        errorService(false, "" , $obj[0].id + "Error");
	}
    disableOrEnableEditButton($button, $objects);
}

// Zmiana buttona na disabled/enabled
function disableOrEnableEditButton($button, $objects){
    // gdy po przejsciu przez ponizszego for'a, flag będzie true, to znaczy
    // że wszystkie pola sa poprawnie uzupełnione i można aktywowac przycisk
    let flag = true;
	const btnRegister = $('#btnEditAnimalInfo');
	for (var k in $objects){
		if ($objects.hasOwnProperty(k)) {
			if(!$objects[k][1]){
				$button.removeClass("saveAnimalButton");
				$button.addClass("saveAnimalButtonDisabled");
                $button.attr("disabled", "disabled");
                flag = false;
			}
		}
    }
    if(flag){
        // wszystkie elementy poprawne, można aktywować przycisk 'Zapisz dane zwierzaka'
        $button.removeClass("saveAnimalButtonDisabled");
        $button.addClass("saveAnimalButton");
        $button.removeAttr("disabled");
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
	$(".btnBackToAnimalList").remove();
	showBackButton();
	$("#btnConfirmAddAnimal").remove();
	$("#btnEditAnimalInfo").remove();
	$("#contentTitle").empty();
	$("#contentTitle").html("<h1><i class='fas fa-plus'></i> Dodaj zwierzaka </h1>");
	$thead = $("#animalListThead");
	$tbody = $("#animalsListTbody");
	$tbody.addClass('tbodyAddAnimal');
	$thead.empty();
	$tbody.empty();
	// wyswietlanie formularza
	$tbody.append("<tr><td class='tdAddAnimalSelect'>Imię: </td><td class='tdAddAnimal'><input class='inputAddAnimal' placeholder='Wpisz imię' id='name' type='text'></td></tr>");
	$tbody.append("<tr><td class='tdAddAnimalSelect'>Gatunek: </td><td class='tdAddAnimalSelect'><select class='inputAddAnimal' id='selectSpecies'></select></td></tr>");
	$tbody.append("<tr><td class='tdAddAnimalSelect'>Rasa: </td><td class='tdAddAnimalSelect'><select class='inputAddAnimal' id='selectRace'></select></td></tr>");
	$tbody.append("<tr><td class='tdAddAnimalSelect'>Płeć: </td><td class='tdAddAnimalSelect'><select class='inputAddAnimal' id='selectGender'><option>Samiec</option><option>Samica</option></select></td></tr>");
	$tbody.append("<tr><td class='tdAddAnimalSelect'>Wzrost: </td><td class='tdAddAnimal'><input class='inputAddAnimal' placeholder='Podaj wzrost' id='height' type='text'></td></tr>");
	$tbody.append("<tr><td class='tdAddAnimalSelect'>Waga: </td><td class='tdAddAnimal'><input class='inputAddAnimal' placeholder='Podaj wagę' id='weight' type='text'></td></tr>");
	$tbody.append("<tr><td class='tdAddAnimalSelect'>Data urodzenia: </td><td class='tdAddAnimal'><input class='inputAddAnimal' id='birthDate' type='date'></td></tr>");
	$button = $("<button id='btnConfirmAddAnimal' class='saveAnimalButtonDisabled'><i class='fas fa-plus' style='margin-right: 10px'></i>Dodaj zwierzaka</button>");
	$content = $("#content");
	$content.append($button);

	// Dodanie keyup eventów za pomocą jQuery do każdego inputka
	$('input').each(function(index){
		$(this).on('keyup', function(){
			validateInputValue($(this), $("#btnConfirmAddAnimal"), validationObjectsAdd);
		});
	});
	// Event change dla inputa typu date
	$('#birthDate').change(function(){
		validateInputValue($(this), $("#btnConfirmAddAnimal"), validationObjectsAdd);
	})

	$('#btnConfirmAddAnimal').on('click', function(){
		if(!$(this).hasClass('saveAnimalButtonDisabled'))
			collectDataFromAddForm();
	});

	getAnimalSpecies();

});

// zapytanie do bazy o pobranie gatunków zwierząt a potem pokazanie opcji w select
function getAnimalSpecies(){
	$.ajax({									
		type:"post",
		url:"getAnimalsData.php",
		dataType:"json",
		data:{
			accType:"customer",
			returnVal:"speciesData" // parametr określa że chcemy liste gatunków zwierząt
		},
		success: function(json){
			// w przypadku braku wyników
			if(json[0]==0){
				$selectSpecies=$("#selectSpecies");
				$selectSpecies.html('brak');		
			}
			else if(json[0]==1){
				$selectSpecies=$("#selectSpecies");
				$selectSpecies.html('brak');	
				console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				animalsSpecies = json;
				// wstawiamy otrzymaną tablicę gatunków do selecta <select id='selectSpecies'></select>
				$selectSpecies=$("#selectSpecies");
				for(let i=0;i<json.length;i++){
					$option=$("<option></option>");
					$option.html(json[i]['SPECIES']);
					$selectSpecies.append($option);
				};

				// dodaje event do zmiany option w selectSpecies
				$("#selectSpecies").change(function () {
   					$("#selectSpecies option:selected" ).each(function() {
						for(let i = 0; i < animalsSpecies.length; i++){
							if(animalsSpecies[i]['SPECIES'] === $(this).text()){
								getAnimalsRace(animalsSpecies[i]['ANI_SPE_ID']);
							}
						}
    				});
  				}).change();
			}
		},
		error: function(e){
			console.warn(e);
		}
	});
}

// wyswietla liste ras według zaznaczonej opcji gatunku
function getAnimalsRace(species){
	$.ajax({									
		type:"post",
		url:"getAnimalsData.php",
		dataType:"json",
		data:{
			accType:"customer",
			returnVal:"racesData", // parametr określa że chcemy liste ras zwierząt
			ANI_SPE_ID: species
		},
		success: function(json){
			// w przypadku braku wyników
			if(json[0]==0){
				$selectRaces=$("#selectRace");
				$selectRaces.html('brak');		
			}
			else if(json[0]==1){
				$selectRaces=$("#selectRace");
				$selectRaces.html('brak');	
				console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				animalsRaces = json;
				// wstawiamy otrzymaną tablicę gatunków do selecta <select id='selectRace'></select>
				$selectRaces=$("#selectRace");
				$selectRaces.empty();
				for(let i=0;i<json.length;i++){
					$option=$("<option></option>");
					$option.html(json[i]['RACE']);
					$selectRaces.append($option);
				};
			}
		},
		error: function(e){
			console.warn(e);
		}
	});
}

function collectDataFromAddForm(){
	const animalData = {
		name:"",
		species:"",
		race: "",
		height: "",
		weight: "",
		birthDate: "",
		gender: ""
	}
	animalData.name = $("#name").val();
	for(let i = 0; i < animalsSpecies.length; i++){
		if(animalsSpecies[i]['SPECIES'] === $( "#selectSpecies option:selected" ).text()){
			animalData.species = animalsSpecies[i]['ANI_SPE_ID'];
		}
	}
	for(let i = 0; i < animalsRaces.length; i++){
		if(animalsRaces[i]['RACE'] === $( "#selectRace option:selected" ).text()){
			animalData.race = animalsRaces[i]['ANI_RAC_ID'];
		}
	}
	if($( "#selectGender option:selected" ).text() === 'Samiec')
		animalData.gender = 'MALE';
	else
		animalData.gender = 'FEMALE';
	animalData.height = $("#height").val();
	animalData.weight = $("#weight").val();
	animalData.birthDate = $("#birthDate").val();
	console.log(animalData.birthDate);
	addNewAnimal(animalData);
}


// DO ZROBIENIA JESZCZE JEST TO WŁASNIE
function addNewAnimal(animalData){
	console.log('Dane zwierzaka', animalData);
	$.ajax({									
		type:"post",
		url:"addAnimal.php",
		dataType:"json",
		data:{
			accType:"customer",
			name: animalData.name,
			species: animalData.species,
			race: animalData.race,
			height: animalData.height,
			weight: animalData.weight,
			birthDate: animalData.birthDate,
			gender: animalData.gender
		},
		success: function(json){
			// w przypadku braku wyników
			if(json[0]==0){
				showMessage('Wystąpił błąd w trakcie dodawania zwierzaka', false);		
			}
			else if(json[0]==1){
				showMessage('Wystąpił błąd w trakcie dodawania zwierzaka', false);		
				console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				showMessage('Zwierzak został dodany!', true);
				$("html, body").animate({ scrollTop: 0 }, "slow");	
			}
		},
		error: function(e){
			console.warn(e);
		}
	});
}

// funkcja do tworzenia komponentu modala
function showModalComponent($titleText, $messageText){
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
	$message.html($messageText);
	$content.append($message);

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

$("#btnStatsAnimal").on('click', function(){
	$(".btnBackToAnimalList").remove();
	showBackButton();
	$("#btnConfirmAddAnimal").remove();
	$("#btnEditAnimalInfo").remove();
	$("#contentTitle").empty();
	$("#contentTitle").html("<h1><i class='fas fa-poll'></i> Statystyki </h1>");
	$thead = $("#animalListThead");
	$tbody = $("#animalsListTbody");
	$tbody.addClass('tbodyAddAnimal');
	$thead.empty();
	$tbody.empty();
	$.ajax({									
		type:"post",
		url:"getAnimalsData.php",
		dataType:"json",
		data:{
			accType:"customer",
			returnVal:"stats"
		},
		success: function(json){
			// w przypadku braku wyników
			if(json[0]==0){
				showMessage('Wystąpił błąd w trakcie pobierania statystyk', false);		
			}
			else if(json[0]==1){
				showMessage('Wystąpił błąd w trakcie pobierania statystyk', false);		
				console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				console.log(json);
				if(json['OLDEST_ANIMAL'] == null)
					json['OLDEST_ANIMAL'] = 'Brak zwierząt';
				if(json['YOUNGEST_ANIMAL'] == null)
					json['YOUNGEST_ANIMAL'] = 'Brak zwierząt';
				$tbody.append("<tr><td style=\"width: 70%\">Liczba posiadanych zwierząt: </td><td style=\"width: 30%\" class='darkTheme'>" + json['ANIMAL_COUNT'] + "</td></tr>");
				$tbody.append("<tr><td style=\"width: 70%\">Najstarsze zwierzę: </td><td style=\"width: 30%\" class='darkTheme'>" + json['OLDEST_ANIMAL'] + "</td></tr>");
				$tbody.append("<tr><td style=\"width: 70%\">Najmłodsze zwierzę: </td><td style=\"width: 30%\" class='darkTheme'>" + json['YOUNGEST_ANIMAL'] + "</td></tr>");
				$tbody.append("<tr><td style=\"width: 70%\">Procent klientów z większą ilością zwierząt: </td><td style=\"width: 30%\" class='darkTheme'>" + (json['MORE_ANIMALS']/json['CUSTOMER_NUMBER'])*100 + "%</td></tr>");
			}
		},
		error: function(e){
			console.warn(e);
		}
	});
});
