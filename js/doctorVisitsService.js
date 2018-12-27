let isSomeoneActive = false;												//czy jest obsługwana jakaś funkcja 
//$(document).ready(function(){deleteContent('todayVisits');$("#todayVisits").attr('class','btn btnMenu active-btn');});	//domyslne pokazujemy dzisijesze wizyty
$("#todayVisits").on('click',function(){									//po kliknieciu pokaż liste dzisiejszych wizyt
	if(isSomeoneActive)														//jesli juz jest cos aktywnego
		deleteContent("todayVisits");
	else
		todayVisits();														//jesli nie ma nic aktywnego]
	$(this).attr('class','btn btnMenu active-btn');							//ustawiamy ten przycisk aktywny
});

$("#prevVisits").on('click',function(){										//funkcja do poprzednich wizyt
	if(isSomeoneActive)														
		deleteContent("prevVisits");
	else
		prevVisits();												
	$(this).attr('class','btn btnMenu active-btn');
});

$("#nextVisits").on('click',function(){										//funkcja do nastepnych wizyt
	if(isSomeoneActive)														
		deleteContent("nextVisits");
	else
		nextVisits();												
	$(this).attr('class','btn btnMenu active-btn');
});

$("#addVisit").on('click',function(){										//funkcja dodania wizyty
	if(isSomeoneActive)														
		deleteContent("addVisit");
	else
		addVisit();												
	$(this).attr('class','btn btnMenu active-btn');
});

function deleteContent(name){											//funkcja usuwa aktualny kontant, a paramtert mówi, który przycisk został aktywowany
	$('#doctorSubMenu a').each(function(){									//resetujemy wszystkie przyciski
		$(this).attr('class','btn btnMenu');
	});
	$("#contentTitle").html("");											//czyścimy środek tytułu
	$("#contentDescription").html("");										//to samo dla cotnentu
	switch (name){															//teraz od name zależy co pokażemy
		case "todayVisits":
			todayVisits();
			break;
		case "prevVisits":
			prevVisits();
			break;
		case "nextVisits":
			nextVisits();
			break;
		case "addVisit":
			addVisit();
			break;
		default:
			console.warn("err");
			break;
	}
}

function todayVisits(){
	$.ajax({									
		type:"post",
		url:"visitsService.php",
		dataType:"json",
		data:{
			accType:"doctor",
			returnVal:"today"											//określa które wizyty chcemy
		},
		beforeSend: function(){
			$('body').css('opacity','0.6');
			$('body').css('cursor','progress');
		},
		success: function(json){
			if(json[0]==0 || json[0]==1){													//jesli zero wyników lub błąd połaczenia (1)
				$("#contentTitle").append("<hr>");																//dajemy se kreske 
				$("#contentTitle").append("<h1><i class=\"fas fa-arrow-down\"></i> Dzisiejsze wizyty</h1>");	//ustawiamy tytuł
				$h3=$("<h3>Brak wizyt w dniu dzisiejszym.</h3>");
				$h3.css({
					'display':'block',
					'width':'50%',
					'margin':'auto'
				});
				$("#contentDescription").append($h3);															//wstawiamy na strone tabele juz pelną
				if(json[0]==1)
					console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				$("#contentTitle").append("<hr>");																//dajemy se kreske 
				$("#contentTitle").append("<h1><i class=\"fas fa-arrow-down\"></i> Dzisiejsze wizyty</h1>");	//ustawiamy tytuł
				let $table=$("<table></table>");																//tworzymy tabele
				$table.attr("id","visitsList");																//dajemy jej id
				$table.append("<thead><tr><th>Godzina</th><th>Rasa</th><th>Właściciel</th><th>Dodatkowe informacje</th><th>Status</th><th>Otwórz</th></tr></thead>");	//wstawiamy do niej thead
				$tbody=$("<tbody></tbody>");
				for(let i=0;i<json.length;i++){
					let status="Otwarta";
					if(json[i]['STATUS']=="FINISHED")
						status="Zamknięta";
					if(json[i]['DESCRIPTION']=="")
						json[i]['DESCRIPTION']="Brak";
					$tr=$("<tr></tr>");
					$tr.attr("value",i);			//wpisujemy do value id lekarza, które siedzi w JSON
					//$tr.on('click',function(){showDoctorDetail(json[$(this).attr('value')])});	//i na zdarzenie klikniecia ustawiamy funkcje z przekazaniem tego wiersza z JSON, aby nie pobierać znowu z bazy
					$tr.html("<td>"+json[i]['HOUR']+"</td><td>"+json[i]['RACE']+"</td><td>"+json[i]['OWNER']+"</td><td>"+json[i]['DESCRIPTION']+"</td><td>"+status+"</td><td><i class=\"fas fa-folder-open\"></i></td>");
					$tbody.append($tr);
				}
				$table.append($tbody);
				$("#contentDescription").append($table);														//wstawiamy na strone tabele juz pelną
			}
			$('body').css('opacity','1');
			$('body').css('cursor','default');
			isSomeoneActive=true;														// !!!!!!!!!! zmieniać gdy jest wyswietlone, bo potem sie psuje!
		},
		error: function(e){
			console.warn(e);
			$('body').css('opacity','1');
			$('body').css('cursor','default');
		}
	});
}

function prevVisits(){
	$.ajax({									
		type:"post",
		url:"visitsService.php",
		dataType:"json",
		data:{
			accType:"doctor",
			returnVal:"prev"											//określa które wizyty chcemy
		},
		beforeSend: function(){
			$('body').css('opacity','0.6');
			$('body').css('cursor','progress');
		},
		success: function(json){
			if(json[0]==0 || json[0]==1){													//jesli zero wyników lub błąd połaczenia (1)
				$("#contentTitle").append("<hr>");																//dajemy se kreske 
				$("#contentTitle").append("<h1><i class=\"fas fa-backward\"></i> Poprzednie wizyty</h1>");	//ustawiamy tytuł
				$h3=$("<h3>Brak wizyt w poprzednich dniach.</h3>");
				$h3.css({
					'display':'block',
					'width':'50%',
					'margin':'auto'
				});
				$("#contentDescription").append($h3);															//wstawiamy na strone tabele juz pelną
				if(json[0]==1)
					console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				$("#contentTitle").append("<hr>");																//dajemy se kreske 
				$("#contentTitle").append("<h1><i class=\"fas fa-backward\"></i> Poprzednie wizyty</h1>");	//ustawiamy tytuł
				let $table=$("<table></table>");																//tworzymy tabele
				$table.attr("id","visitsList");																//dajemy jej id
				$table.append("<thead><tr><th>Data</th><th>Rasa</th><th>Właściciel</th><th>Dodatkowe informacje</th><th>Status</th><th>Otwórz</th></tr></thead>");	//wstawiamy do niej thead
				$tbody=$("<tbody></tbody>");
				for(let i=0;i<json.length;i++){
					let status="Otwarta";
					if(json[i]['STATUS']=="FINISHED")
						status="Zamknięta";
					if(json[i]['DESCRIPTION']=="")
						json[i]['DESCRIPTION']="Brak";
					$tr=$("<tr></tr>");
					$tr.attr("value",i);			//wpisujemy do value id lekarza, które siedzi w JSON
					//$tr.on('click',function(){showDoctorDetail(json[$(this).attr('value')])});	//i na zdarzenie klikniecia ustawiamy funkcje z przekazaniem tego wiersza z JSON, aby nie pobierać znowu z bazy
					$tr.html("<td>"+json[i]['DATE']+" "+json[i]['HOUR']+"</td><td>"+json[i]['RACE']+"</td><td>"+json[i]['OWNER']+"</td><td>"+json[i]['DESCRIPTION']+"</td><td>"+status+"</td><td><i class=\"fas fa-folder-open\"></i></td>");
					$tbody.append($tr);
				}
				$table.append($tbody);
				$("#contentDescription").append($table);														//wstawiamy na strone tabele juz pelną
			}
			$('body').css('opacity','1');
			$('body').css('cursor','default');
			isSomeoneActive=true;														// !!!!!!!!!! zmieniać gdy jest wyswietlone, bo potem sie psuje!
		},
		error: function(e){
			console.warn(e);
			$('body').css('opacity','1');
			$('body').css('cursor','default');
		}
	});
}

function nextVisits(){
	$.ajax({									
		type:"post",
		url:"visitsService.php",
		dataType:"json",
		data:{
			accType:"doctor",
			returnVal:"next"											//określa które wizyty chcemy
		},
		beforeSend: function(){
			$('body').css('opacity','0.6');
			$('body').css('cursor','progress');
		},
		success: function(json){
			if(json[0]==0 || json[0]==1){													//jesli zero wyników lub błąd połaczenia (1)
				$("#contentTitle").append("<hr>");																//dajemy se kreske 
				$("#contentTitle").append("<h1><i class=\"fas fa-forward\"></i> Przyszłe wizyty</h1>");	//ustawiamy tytuł
				$h3=$("<h3>Brak wizyt w następnych dniach.</h3>");
				$h3.css({
					'display':'block',
					'width':'50%',
					'margin':'auto'
				});
				$("#contentDescription").append($h3);															//wstawiamy na strone tabele juz pelną
				if(json[0]==1)
					console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				$("#contentTitle").append("<hr>");																//dajemy se kreske 
				$("#contentTitle").append("<h1><i class=\"fas fa-forward\"></i> Przyszłe wizyty</h1>");	//ustawiamy tytuł
				let $table=$("<table></table>");																//tworzymy tabele
				$table.attr("id","visitsList");																//dajemy jej id
				$table.append("<thead><tr><th>Data</th><th>Rasa</th><th>Właściciel</th><th>Dodatkowe informacje</th><th>Status</th><th>Otwórz</th></tr></thead>");	//wstawiamy do niej thead
				$tbody=$("<tbody></tbody>");
				for(let i=0;i<json.length;i++){
					let status="Otwarta";
					if(json[i]['STATUS']=="FINISHED")
						status="Zamknięta";
					if(json[i]['DESCRIPTION']=="")
						json[i]['DESCRIPTION']="Brak";
					$tr=$("<tr></tr>");
					$tr.attr("value",i);			//wpisujemy do value id lekarza, które siedzi w JSON
					//$tr.on('click',function(){showDoctorDetail(json[$(this).attr('value')])});	//i na zdarzenie klikniecia ustawiamy funkcje z przekazaniem tego wiersza z JSON, aby nie pobierać znowu z bazy
					$tr.html("<td>"+json[i]['DATE']+" "+json[i]['HOUR']+"</td><td>"+json[i]['RACE']+"</td><td>"+json[i]['OWNER']+"</td><td>"+json[i]['DESCRIPTION']+"</td><td>"+status+"</td><td><i class=\"fas fa-folder-open\"></i></td>");
					$tbody.append($tr);
				}
				$table.append($tbody);
				$("#contentDescription").append($table);														//wstawiamy na strone tabele juz pelną
			}
			$('body').css('opacity','1');
			$('body').css('cursor','default');
			isSomeoneActive=true;														// !!!!!!!!!! zmieniać gdy jest wyswietlone, bo potem sie psuje!
		},
		error: function(e){
			console.warn(e);
			$('body').css('opacity','1');
			$('body').css('cursor','default');
		}
	});
}

function addVisit(){
	$("#contentTitle").append("<hr>");																//dajemy se kreske 
	$("#contentTitle").append("<h1><i class=\"fas fa-calendar-plus\"></i> Dodaj wizytę</h1>");	//ustawiamy tytuł
	//tabela do dodania wizyt
	$table=$('<table></table>');
	$table.prop('id','addNewVisit');
	$tr=$('<tr></tr>');
	$td=$('<td>Właściciel zwierzęcia: </td>');
	$tr.append($td);
	
	//wybór klientów
	$.ajax({									
		type:"post",
		url:"visitsService.php",
		dataType:"json",
		data:{
			accType:"doctor",
			returnVal:"getCustomers"											//określa co chcemy
		},
		beforeSend: function(){
			$('body').css('opacity','0.6');
			$('body').css('cursor','progress');
		},
		success: function(json){	
			//tworzymy select z wyborem własciela
			$td=$('<td></td>');
			$select = $("<select></select>");
			$select.prop('id','chooseCustomer');
			$select.append('<option value="-1">------------------</option>');
			for(let i=0;i<json.length;i++)
				$select.append('<option value="'+json[i]['CUS_ID']+'">'+json[i]['LAST_NAME']+' '+json[i]['FIRST_NAME']+' <--> '+json[i]['EMAIL']+'</option>');
			$td.append($select);
			$tr.append($td);
			$select.on('change',function(){
				if($select.val()!=-1){
					drawAnimalToSelect($select.val());
				}
			});
			$('body').css('opacity','1');
			$('body').css('cursor','default');
		},
		error: function(e){
			console.warn(e);
			$('body').css('opacity','1');
			$('body').css('cursor','default');
		}
	});

	$table.append($tr);
	$("#contentDescription").append($table);
	isSomeoneActive=true;														// !!!!!!!!!! zmieniać gdy jest wyswietlone, bo potem sie psuje!
}
//funkcja robi selekta z wyborem zwierzaka
function drawAnimalToSelect(ownerId){	
	$.ajax({									
		type:"post",
		url:"visitsService.php",
		dataType:"json",
		data:{
			accType:"doctor",
			returnVal:"getCustomerAnimals",											//określa co chcemy
			customerId:ownerId											
		},
		beforeSend: function(){
			$('body').css('opacity','0.6');
			$('body').css('cursor','progress');
		},
		success: function(json){	
			//tworzymy select z wyborem zwierzecia
			if($('#chooseCustomerAnimal').length==0){	//jesli selecta nie ma
				$tr=$('<tr></tr>');
				$td=$('<td>Zwierzę: </td>');
				$tr.append($td);
				$td=$('<td></td>');
				
				$selectAnimal = $("<select></select>");
				$selectAnimal.prop('id','chooseCustomerAnimal');
				if(json[0]==0 || json[0]==1)
					$selectAnimal.append('<option value="-20">Klient nie posiada zwierząt</option>');		//jesli nie ma zwierząt
				else{
					$selectAnimal.append('<option value="-2">------------------</option>');					//jesli są
					for(let i=0;i<json.length;i++)
						$selectAnimal.append('<option value="'+json[i]['CUS_ANI_ID']+'">'+json[i]['NAME']+' <--> '+json[i]['SPECIES']+' <--> '+json[i]['RACE']+'</option>');
				}
				$td.append($selectAnimal);
				$tr.append($td);
				$('#addNewVisit').append($tr);
				$selectAnimal.on('change',function(){														//jesli zostało wybrane jakies zwierze
					if($select.val()!=-2 && $select.val()!=-20){
						drawDateToSelect();
					}
				});
			}
			else{								//jesli jest to go czyscimy i dajemy nowe wartosci
				$('#chooseCustomerAnimal').html("");
				if(json[0]==0 || json[0]==1){
					$('#chooseCustomerAnimal').append('<option value="-20">Klient nie posiada zwierząt</option>');
					if($('#chooseDate').length>0)															//jsli nie ma zwierząt
						$('#chooseDate').parent().parent().remove();										//usuwamy tr z data i godzina, bo mogły sie
					if($('#chooseHour').length>0)															//pojawic, a skoro nie ma zwierzecia
						$('#chooseHour').parent().parent().remove();										//to nie ma co wybierac
				}
				else{
					$('#chooseCustomerAnimal').append('<option value="-2">------------------</option>');
					for(let i=0;i<json.length;i++)
						$('#chooseCustomerAnimal').append('<option value="'+json[i]['CUS_ANI_ID']+'">'+json[i]['NAME']+' <--> '+json[i]['SPECIES']+' <--> '+json[i]['RACE']+'</option>');
				}	
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
function drawDateToSelect(){
	if($('#chooseDate').length==0){	//jesli selecta nie ma
		$tr=$('<tr></tr>');
		$td=$('<td>Data: </td>');
		$tr.append($td);
		$td=$('<td></td>');
		$selectDate = $('<input type="date">');
		$selectDate.prop('id','chooseDate');
		$td.append($selectDate);
		$tr.append($td);
		$('#addNewVisit').append($tr);
		$selectDate.change(function(){
			selectedDate = new Date($(this).val());
			currentDate = new Date();
			// gdy wybrana data dotyczy przeszłosci lub tego samego dnia to błąd
			if(selectedDate < currentDate){
				$(this).css('background',"#ffa8a8");
			} else {
				$(this).css('background',"white");
				if(!isNaN(selectedDate.getDay())){
					//tutaj wyslanie zapytania o godziny przyjęć będzie
					let days = ["SUNDAY","MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
					$.ajax({									
						type:"post",
						url:"visitsService.php",
						dataType:"json",
						data:{
							accType:"doctor",
							returnVal:"getAvalibleHours",											//określa co chcemy
							day:days[selectedDate.getDay()],											
							date:$(this).val()										
						},
						beforeSend: function(){
							$('body').css('opacity','0.6');
							$('body').css('cursor','progress');
						},
						success: function(json){	
							//tworzymy select z wyborem godziny
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
			}
		});
	}
}