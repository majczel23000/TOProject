
// lista zwierząt potrzebna do wybrania zwierzaka podczas umawiania wizyty
animalsList = [];
// dane wizyty do dodania, te dane zostaną zapisane w bazie (po uzupełnieniu)
visitDataToAdd = {
    CUS_ANI_ID: "",
    DOC_ID: "",
    DATE: "",
    HOUR: ""
};

let selectedDay;
let days = ["SUNDAY","MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

// pokazuje widok dodawania wizyty
$("#addVisit").on('click', function(){
    updateContent('Umów nową wizytę', 'plus');
    showAddVisitForm();
    $(this).attr('class','btn btnMenu active-btn');
});

// pokazuje widok historii wizyt
$("#historyVisits").on('click', function(){
    updateContent('Historia wizyt', 'history');
    showHistoryVisits();
    $(this).attr('class','btn btnMenu active-btn');
});

// czysci strone i podmienia tytuł na podstawie przekazanych argumentów
function updateContent($title, $iconClass){
    $('#visitSubMenu a').each(function(){
		$(this).attr('class','btn btnMenu');
    });
    $("#contentTitle").empty();
    $("#contentDescription").empty();
    $("#btnAddVisit").remove();
    $("#contentTitle").append("<hr>"); 
    $("#contentTitle").append("<h1><i class='fas fa-" + $iconClass + "' style='margin-right: 20px'></i>" + $title + "</h1>");
}

// pokazuje widok dodawania wizyty
function showAddVisitForm(){
    // tworzę tabelke, tbody oraz wiersze
    let $table=$("<table></table>");
    $table.attr("id","addVisitList");
    $tbody=$("<tbody></tbody>");
    $tbody.attr('id','addVisitListTbody');
    $tbody.append("<tr><td class='tdAddAnimalSelect'>Zwierzę: </td><td class='tdAddAnimalSelect'><select class='inputAddAnimal' id='animals'></select></td></tr>");
    $tbody.append("<tr><td>Data: </td><td class='darkTheme tdDuringAnimalEdit'><input type='date' id='date'></td></tr>");
    $table.append($tbody);
    $("#contentDescription").append($table);
    $addButton = $("<button></button>");
    $addButton.prop('id', 'btnAddVisit');
    $addButton.prop('class', 'btnAddVisit btnAddVisitDisabled');
    $addButton.html('Umów wizytę');
    $("#content").append($addButton);
    // pobranie listy zwierząt z bazy
    getCustomerAnimals();

    // change event przy zmianie daty
    $('#date').change(function(){
        selectedDate = new Date($(this).val());
        currentDate = new Date();
        if(selectedDate < currentDate){
            $(this).css('background',"#ffa8a8");
            errorService(true, "Data nie może być z przeszłości", $(this).id + "Error");
            $addButton.addClass("btnAddVisitDisabled");
        } else {
            $(this).css('background',"white");
            // wysyłam info żeby usunąć error jesli taki był
            errorService(false, "" , $(this).id + "Error");
            $addButton.removeClass("btnAddVisitDisabled");
            visitDataToAdd['DATE'] = $("#date").val();
            selectedDay = days[selectedDate.getDay()];
            getDoctorsListWorkingOnSelectedDay();
            //getAllAdmissionHoursFromSelectedDay(days[selectedDay]);
        }
    });

    // click event dla zapisania danych wizyty
    $addButton.on('click', function(){
        if(!$(this).hasClass('btnAddVisitDisabled')){
            console.log(visitDataToAdd);
            makeAnAppointment();
        } 
    })
}

function showHistoryVisits(){
   
}

// pobiera liste zwierząt klienta (wywietla imiona zwierząt w select)
function getCustomerAnimals(){
    $.ajax({									
		type:"post",
		url:"getAnimalsData.php",
		dataType:"json",
		data:{
			accType:"customer",
			returnVal:"fullData" // parametr określa że chcemy liste zwierząt
		},
		success: function(json){
			// w przypadku braku wyników
			if(json[0]==0){
				$option=$("<option>Brak zwierząt<option>");
				$("#animals").append($option);			
			}
			else if(json[0]==1){
				$option=$("<option>Brak zwierząt<option>");
				$("#animals").append($option);	
				console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				// wstawiamy otrzymaną tablicę zwierząt do selecta
				animalsList = json;
				for(let i = 0; i < json.length; i++){
					$option=$("<option></option>");
					$option.html(json[i]['NAME']);
					$("#animals").append($option);
                };
                
                // dodaje change event, który po każdej zmianie w select'ie zapisze CUS_ANI_ID wybranego zwierzaka
				$("#animals").change(function () {
                    $("#animals option:selected" ).each(function() {
                     for(let i = 0; i < animalsList.length; i++){
                         if(animalsList[i]['NAME'] === $(this).text()){
                             visitDataToAdd['CUS_ANI_ID'] = animalsList[i]['CUS_ANI_ID'];
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

// pobiera liste lekarzy przyjmujących w wybranym dniu
function getDoctorsListWorkingOnSelectedDay(){
    $.ajax({									
		type:"post",
		url:"admissionHoursService.php",
		dataType:"json",
		data:{
			accType:"customer",
			returnVal:"selectedDay", // parametr określa że chcemy lekarzy i godziny przyjęć z dnia selectedDay
            day: selectedDay
        },
		success: function(json){
			// w przypadku braku wyników
			if(json[0]==0){
                // wstawiam błąd na strone że brak przyjęć w tym dniu
				$('#date').css('background',"#ffa8a8");
                errorService(true, "Brak przyjęć w wybranym dniu", $('#date').id + "Error");
                $addButton.addClass("btnAddVisitDisabled");		
			}
			else if(json[0]==1){
				// wstawiam błąd na strone że błąd połączenia
				$('#date').css('background',"#ffa8a8");
                errorService(true, "Błąd połączenia, spróbuj ponownie", $('#date').id + "Error");
                $addButton.addClass("btnAddVisitDisabled");	
			}
			else{
                console.log(json);
                $('#date').css('background',"white");
                // wysyłam info żeby usunąć error jesli taki był
                errorService(false, "" , $('#date').id + "Error");
                $addButton.removeClass("btnAddVisitDisabled");
                createAvailableHours(json);
			}
		},
		error: function(e){
			console.warn(e);
		}
	});
}

// tworzy liste możliwych godzin, oraz wypisuje je na ekranie 
function createAvailableHours(data){
    $('#trWithDoctors').remove();
    $('#trWithHours').remove();
    // dodaje wierz do tabeli z godzinami
    $tbody = $("#addVisitListTbody");
    $tr = $("<tr></tr>");
    $tr.attr('id','trWithDoctors');
    $firstTd = $("<td></td>");
    $firstTd.attr('class', 'tdAddAnimalSelect');
    $firstTd.html('Lekarze:');
    $secondTd = $("<td></td>");
    $secondTd.attr('class','tdAddAnimalSelect');
    $doctorSelect = $("<select></select>");
    $doctorSelect.attr('id','doctorSelect');
    $doctorSelect.attr('class','inputAddAnimal');
    $secondTd.append($doctorSelect);
    $tr.append($firstTd);
    $tr.append($secondTd);
    $tbody.append($tr);
    
    // dodaje option (lekarzy)
    for(let i = 0; i < data.length; i++){
        if(data[i][selectedDay] !== ''){
            $option=$("<option></option>");
            $option.html(data[i]['FIRST_NAME']+ " " + data[i]['LAST_NAME']);
            $option.attr('ADM_H_ID', data[i]['ADM_H_ID']);
            $doctorSelect.append($option);
        }
    }

    // dodaje change event, który po każdej zmianie w select'ie lekarza wywietli jego wolne terminy godzin przyjec 
    $doctorSelect.change(function () {
        $("#doctorSelect option:selected" ).each(function() {
            $('#trWithHours').remove();
            visitDataToAdd['DOC_ID'] = $(this).attr('ADM_H_ID');
            showAvailableHoursList($(this).attr('ADM_H_ID'), data);
        });
    }).change();
}

function showAvailableHoursList(adm_h_id, data){
    // szukam najwczesniejszej i najpóźniejszej godziny od której będą prowadzone przyjęcia w wybranym dniu dla wybranego lekarza
    for(let i = 0; i < data.length; i++){
        if(data[i]['ADM_H_ID'] === adm_h_id){
            minimum = parseInt(data[i][selectedDay].split('-')[0]);
            maksimum = parseInt(data[i][selectedDay].split('-')[1]);
        }
    }

    busyHours = []; // tablica na zajęte już godziny
    $.ajax({									
		type:"post",
		url:"admissionHoursService.php",
		dataType:"json",
		data:{
			accType:"customer",
			returnVal:"plannedVisits", // parametr określa że chcemy godziny umówionych już wizyt w danym dniu dla danego lekarza
            date: $("#date").val(),
            status: 'PLANNED',
            doc_id: adm_h_id
        },
		success: function(json){
			// w przypadku braku wyników
			if(json[0]==0){
                // gdy nie ma jeszcze umówionych wizyt w danym dniu, wyswietlam wszystkie możliwe godziny
                availableHours = [];
                for(let i = minimum; i < maksimum; i++){
                    if(i<10){
                        availableHours.push("0"+i+":00");
                        availableHours.push("0"+i+":30");
                    }
                    else if(i>=10){
                        availableHours.push(i+":00");
                        availableHours.push(i+":30");
                    }		
                }
                // dodaje je na strone
                $tbody = $("#addVisitListTbody");
                $tr = $("<tr></tr>");
                $tr.attr('id','trWithHours');
                $firstTd = $("<td></td>");
                $firstTd.attr('class', 'tdAddAnimalSelect');
                $firstTd.html('Godziny:');
                $secondTd = $("<td></td>");
                $secondTd.attr('class','tdAddAnimalSelect');
                $hoursSelect = $("<select></select>");
                $hoursSelect.attr('id','hoursSelect');
                $hoursSelect.attr('class','inputAddAnimal');
                $secondTd.append($hoursSelect);
                $tr.append($firstTd);
                $tr.append($secondTd);
                $tbody.append($tr);
                for(let i = 0; i < availableHours.length; i++){
                    $option=$("<option></option>");
                    $option.html(availableHours[i]);
                    $hoursSelect.append($option);
                };

                // dodaje change event, który po każdej zmianie w select'ie zapisze wybrane HOUR 
                $hoursSelect.change(function () {
                    $("#hoursSelect option:selected" ).each(function() {
                        visitDataToAdd['HOUR'] = $(this).text();
                    });
                }).change();
			}
			else if(json[0]==1){
				//błąd połączenia
			}
			else{
                busyHours = json;
                // tworzę liste możliwych godzin do umówienia pomijając już te zajęte
                availableHours = [];
                existFull = false;
                existHalf = false;
                for(let i = minimum; i < maksimum; i++){
                    for(let j = 0; j < busyHours.length; j++){
                        if(i<10){
                            if(("0"+i+":00")==busyHours[j])
                                existFull = true;  
                            else if(("0"+i+":30")==busyHours[j])
                                existHalf = true;
                        }
                        if(i>=10){
                            if((i+":00")==busyHours[j])
                                existFull = true;
                            else if((i+":30")==busyHours[j])
                                existHalf = true;
                        }
                    }
                    if(i<10){
                        if(!existFull)
                            availableHours.push("0"+i+":00");
                        if(!existHalf)
                            availableHours.push("0"+i+":30");
                    }
                    else if(i>=10){
                        if(!existFull)
                            availableHours.push(i+":00");
                        if(!existHalf)
                            availableHours.push(i+":30");
                    }
                    existFull = false;
                    existHalf = false;
                }

                // dodaje je na strone
                $tbody = $("#addVisitListTbody");
                $tr = $("<tr></tr>");
                $tr.attr('id','trWithHours');
                $firstTd = $("<td></td>");
                $firstTd.attr('class', 'tdAddAnimalSelect');
                $firstTd.html('Godziny:');
                $secondTd = $("<td></td>");
                $secondTd.attr('class','tdAddAnimalSelect');
                $hoursSelect = $("<select></select>");
                $hoursSelect.attr('id','hoursSelect');
                $hoursSelect.attr('class','inputAddAnimal');
                $secondTd.append($hoursSelect);
                $tr.append($firstTd);
                $tr.append($secondTd);
                $tbody.append($tr);
                for(let i = 0; i < availableHours.length; i++){
                    $option=$("<option></option>");
                    $option.html(availableHours[i]);
                    $hoursSelect.append($option);
                };

                // dodaje change event, który po każdej zmianie w select'ie zapisze wybrane HOUR 
                $hoursSelect.change(function () {
                    $("#hoursSelect option:selected" ).each(function() {
                        visitDataToAdd['HOUR'] = $(this).text();
                });
                }).change();
			}
		},
		error: function(e){
			console.warn(e);
		}
	});
}

// zapisuje nową wizytę do bazy i zajętą godzinę w danym dniu
function makeAnAppointment(){
    $.ajax({									
		type:"post",
		url:"admissionHoursService.php",
		dataType:"json",
		data:{
			accType:"customer",
			returnVal:"makeAppointment", // parametr określa że chcemy umówić wizytę
            CUS_ANI_ID: visitDataToAdd['CUS_ANI_ID'],
            DOC_ID: visitDataToAdd['DOC_ID'],
            DATE: visitDataToAdd['DATE'],
            HOUR: visitDataToAdd['HOUR']
        },
		success: function(json){
			// w przypadku braku wyników
			if(json==1){
                showMessage('Błąd w trakcie dodawania wizyty!', false);
                $('#trWithHours').remove();
			}
			else if(json==0){
                showMessage('Wizyta została dodana!', true);
                $('#trWithHours').remove();
                $("#date").val("");
                $("#btnAddVisit").addClass("btnAddVisitDisabled");
			}
		},
		error: function(e){
			console.warn(e);
		}
	});
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
        $('#trWithHours').remove();
    } else{
        $('#'+id).remove();
    }
}

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