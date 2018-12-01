
// lista zwierząt potrzebna do wybrania zwierzaka podczas umawiania wizyty
animalsList = [];
// dane wizyty do dodania
visitDataToAdd = {
    CUS_ANI_ID: "",
    DATE: ""
};

$("#addVisit").on('click', function(){
    updateContent('Umów nową wizytę', 'plus');
    showAddVisitForm();
    $(this).attr('class','btn btnMenu active-btn');
});

$("#historyVisits").on('click', function(){
    updateContent('Historia wizyt', 'history');
    showHistoryVisits();
    $(this).attr('class','btn btnMenu active-btn');
});

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

function showAddVisitForm(){
    let $table=$("<table></table>");
    $table.attr("id","addVisitList");
    $tbody=$("<tbody></tbody>");
    $tbody.append("<tr><td>Zwierzę: </td><td class='darkTheme tdDuringAnimalEdit'><select id='animals'></select></td></tr>");
    $tbody.append("<tr><td>Data: </td><td class='darkTheme tdDuringAnimalEdit'><input type='date' id='date'></td></tr>");
    $table.append($tbody);
    $("#contentDescription").append($table);
    $addButton = $("<button></button>");
    $addButton.prop('id', 'btnAddVisit');
    $addButton.prop('class', 'btnAddVisit btnAddVisitDisabled');
    $addButton.html('Umów wizytę');
    $("#content").append($addButton);
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
        }
    });

    // click event dla zapisania danych wizyty
    $addButton.on('click', function(){
        if(!$(this).hasClass('btnAddVisitDisabled')){
            alert('Dodawanie trwa, prosze czekać');
        } 
    })
}

function showHistoryVisits(){
   
}

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