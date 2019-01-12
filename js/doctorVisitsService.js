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
					$tr.html("<td>"+json[i]['HOUR']+"</td><td>"+json[i]['RACE']+"</td><td>"+json[i]['OWNER']+"</td><td>"+json[i]['DESCRIPTION']+"</td><td>"+status+"</td>");
					$tdOpen = $("<td><i class=\"fas fa-folder-open\"></i></td>")			//komórka do klikniecia w celu otwarcia
					$tdOpen.attr('value',i);						//zapisujemy id
					$tdOpen.on('click',function(){showVisitDetail(json[$(this).attr('value')])}); //przekazuje vizyte do funkcji
					$tr.append($tdOpen);
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
					$tr.html("<td>"+json[i]['DATE']+" "+json[i]['HOUR']+"</td><td>"+json[i]['RACE']+"</td><td>"+json[i]['OWNER']+"</td><td>"+json[i]['DESCRIPTION']+"</td><td>"+status+"</td>");
					$tdOpen = $("<td><i class=\"fas fa-folder-open\"></i></td>")			//komórka do klikniecia w celu otwarcia
					$tdOpen.attr('value',i);						//zapisujemy id
					$tdOpen.on('click',function(){showVisitDetail(json[$(this).attr('value')])}); //przekazuje vizyte do funkcji
					$tr.append($tdOpen);
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
					$tr.html("<td>"+json[i]['DATE']+" "+json[i]['HOUR']+"</td><td>"+json[i]['RACE']+"</td><td>"+json[i]['OWNER']+"</td><td>"+json[i]['DESCRIPTION']+"</td><td>"+status+"</td>");
					$tdOpen = $("<td><i class=\"fas fa-folder-open\"></i></td>")			//komórka do klikniecia w celu otwarcia
					$tdOpen.attr('value',i);						//zapisujemy id
					$tdOpen.on('click',function(){showVisitDetail(json[$(this).attr('value')])}); //przekazuje vizyte do funkcji
					$tr.append($tdOpen);
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
					if($('#addVisitButton').length>0)														//i przycisk
						$('#addVisitButton').parent().parent().remove();	
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
//rysuje date do wyboru
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
				if($('#chooseHour').length>0)															//usuwamy tez selecta z godziną
					$('#chooseHour').parent().parent().remove();
				if($('#addVisitButton').length>0)														//i przycisk
					$('#addVisitButton').parent().parent().remove();
			} else {
				$(this).css('background',"white");
				if(!isNaN(selectedDate.getDay())){
					let days = ["SUNDAY","MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
					$.ajax({									
						type:"post",
						url:"visitsService.php",
						dataType:"json",
						data:{
							accType:"doctor",
							returnVal:"getAvalibleHours",											//określa co chcemy
							day:days[selectedDate.getDay()],										//dzien tygodnia							
							date:$(this).val()														//data						
						},
						beforeSend: function(){
							$('body').css('opacity','0.6');
							$('body').css('cursor','progress');
						},
						success: function(json){	
							if($("#tdForHour").length==0){
								$tr=$('<tr></tr>');
								$td=$('<td>Godzina: </td>');
								$tr.append($td);
								$td=$('<td></td>');
								$td.prop('id','tdForHour');										//komórka dla selecta lub inputa z godziną
								$tr.append($td);
								$('#addNewVisit').append($tr);
							}
							else{
								$("#tdForHour").children().remove();
							}
							//json zwraca godziny przjec a po przecinku zajete godziny, np: 9:00-11:00,9:30,10:00 
							//0 gdy w danym dniu nie ma przyjec, 1 gdy błąd z bazą
							if(json==0 || json==1){												//jesli w danym dniu lekarz nie prowadzi przyjec	
								$selectHour = $('<input>');
								$selectHour.prop('type','text');
								$selectHour.prop('disabled','true');
								$selectHour.prop('id','chooseHour');
								$selectHour.prop('value','W tym dniu nie prowadzisz przyjęć');
								$("#tdForHour").append($selectHour);
								if($('#addVisitButton').length>0)								//usuwamy przycisk, jesli jest
									$('#addVisitButton').parent().parent().remove();
								if(json==1)
									console.warn("BŁĄD POŁĄCZENIA");
							}
							else{
								createHourSelect(json.split(","));
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
			}
		});
	}
}
//tworzy select z wyborem godziny, w parametrze przyjmuje podzielone godziny względem ","
function createHourSelect(splittedHours){												
	const startEndHours=splittedHours[0].split("-")						//dzielimy na początkową godzine i końcwoą
	const startHours = startEndHours[0];								//początkowa godzina jako string
	const endHours = startEndHours[1];									//końcowa godzina jjako string
	let availableHours=[];												//tabela do możiwych godzin przyjec
	for(let i=parseInt(startHours);i<parseInt(endHours);i++){			//zrzucamy na inty poczatek i koniec
		if(i<10){
			if(i!=parseInt(startHours) || (i==parseInt(startHours) && startHours[3]=='0'))	//if potrzebny jeśli godziny przyjec zaczynaja sie od XX:30
				availableHours.push("0"+i+":00");											//to, aby nie tworzyło sie wizyt na XX:00
			availableHours.push("0"+i+":30");
		}
		else if(i>=10){
			if(i!=parseInt(startHours) || (i==parseInt(startHours) && startHours[3]=='0'))	//ten sam if co wyzej
				availableHours.push(+i+":00");
			availableHours.push(i+":30");
		}
		if(i==parseInt(endHours)-1 && endHours[3]=="3")										//podobne działanie co ostatnie, ale jesli godziny kończą się
			if((i+1)<10)																	//o YY:30, to aby mozna było umówić na YY:00
				availableHours.push("0"+(i+1)+":00");
			else if((i+1)>=10)
				availableHours.push((i+1)+":00");
	}
	if(splittedHours[1]!=undefined){									//jesli jest inne niz undefined to sa juz wizyty w tym dniu
		for(let i=1;i<splittedHours.length;i++){						//i musimy sie wykluczyc, wiec szukamy po dwóch tabelach
			for(let j=0;j<availableHours.length;j++)
				if(splittedHours[i]==availableHours[j])					//jesli jest takie samo to
					availableHours.splice(j,1);							//usuwamy jeden element począwszy od indeksu j		
		}
	}
	$selectHour = $('<select></select>');
	$selectHour.prop('id','chooseHour');
	for(let i=0;i<availableHours.length;i++){
		$selectHour.append('<option>'+availableHours[i]+'</option>');
	}
	$("#tdForHour").append($selectHour);
	if($('#addVisitButton').length==0){								//jesli nie ma przycisku to dodajemy
		$sendButton=$('<span></span');
		$sendButton.prop('id','addVisitButton');
		$sendButton.addClass('search-button');
		$sendButton.html('Dodaj wizytę');
		$sendButton.on('click',function(){
			sendVisitToAdd();
		})
		$tr=$('<tr></tr>');
		$td=$('<td colspan="2"></td>');
		$td.append($sendButton);
		$tr.append($td);
		$('#addNewVisit').append($tr);
	}
}
//funkcja wysyłająca wizyte do bazy
function sendVisitToAdd(){
	let canSend=true;
	if($('#chooseCustomer').val()==-1)									//jesli w polu klienta są -------------
		canSend=false;
	if($('#chooseCustomerAnimal').val()==-2)							//jesli w polu zwierzecia są -----------
		canSend=false;
	if($('#chooseDate').val()=="")										//jesli ktos wybrał date a potem kliknął iksa i ją usunął to val jest puste
		canSend=false;
	if(canSend){														//jesli nie ma zadnych błędów to wysyłamy
		$.ajax({									
		type:"post",
		url:"visitsService.php",
		dataType:"json",
		data:{
			accType:"doctor",
			returnVal:"addVisit",											//określa co chcemy
			animalV:$('#chooseCustomerAnimal').val(),
			dateV:$('#chooseDate').val(),
			hourV:$('#chooseHour').val()
		},
		beforeSend: function(){
			$('body').css('opacity','0.6');
			$('body').css('cursor','progress');
		},
		success: function(json){
			if(json=="success"){
				$('#doctorSubMenu a').each(function(){															//resetujemy wszystkie przyciski
					$(this).attr('class','btn btnMenu');
				});
				$("#contentTitle").html("");																	//czyścimy środek tytułu
				$("#contentDescription").html("Wizyta został pomyślnie dodana.");										//to samo dla cotnentu
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
}
//wyswietla szczegółowe dane wizyty
function showVisitDetail($vis){
	$.ajax({									
		type:"post",
		url:"visitsService.php",
		dataType:"json",
		data:{
			accType:"doctor",
			returnVal:"visitDetails",											//określa które wizyty chcemy
			cusAniId:$vis['CUS_ANI_ID'],										//id zwierzecia
			visId:$vis['VIS_ID']												//id wizyty
		},
		beforeSend: function(){
			$('body').css('opacity','0.6');
			$('body').css('cursor','progress');
		},
		success: function(json){
			if(json[0]==0 || json[0]==1){													//jesli zero wyników lub błąd połaczenia (1)
				if(json[0]==1)
					console.warn("BŁĄD POŁĄCZENIA");
				else
					console.warn("BŁĄD");
			}
			else{
				console.log(json)
				$('#doctorSubMenu a').each(function(){									//resetujemy wszystkie przyciski
					$(this).attr('class','btn btnMenu');
				});
				$("#contentTitle").html("");											//czyścimy tytuł
				$("#contentDescription").html("");										//czyścimy kontent
				$("#contentTitle").append("<hr>");																//dajemy se kreske 
				$("#contentTitle").append("<h3>Karta wizyty: "+$vis['DATE']+", godz. "+$vis['HOUR']+"</h3>");	//ustawiamy tytuł
				
				$table=$("<table></table>");
				$table.attr('id','visitDetailTable');
				$tr=$("<tr><td>Lekarz prowadzący </td></tr>");
				$tr.append("<td>"+json['DOCTOR']+"</td>");
				$tr.append("<td>Klient</td>");
				$tr.append("<td>"+$vis['OWNER']+"</td>");
				$table.append($tr);
				$tr=$("<tr><td>Imie zwierzęcia </td></tr>");
				$tr.append("<td>"+json['NAME']+"</td>");
				$tr.append("<td>Identyfikator w systemie </td>");
				$tr.append("<td>"+$vis['CUS_ANI_ID']+"</td>");
				$table.append($tr);
				$tr=$("<tr><td>Rasa zwierzęcia </td></tr>");
				$tr.append("<td>"+$vis['RACE']+"</td>");
				$tr.append("<td>Waga zwierzęcia </td>");
				$tr.append("<td>"+json['WEIGHT']+" kg</td>");
				$table.append($tr);
				$tr=$("<tr><td>Data urodzenia zwierzęcia </td></tr>");
				$tr.append("<td>"+json['BIRTH_DATE']+"</td>");
				$tr.append("<td>Płeć zwierzęcia </td>");
				$tr.append("<td>"+json['GENDER']+"</td>");
				$table.append($tr);
				$tr=$("<tr><td>Status </td></tr>");
				$tr.append("<td>"+$vis['STATUS']+"</td>");
				$tr.append("<td>Cena </td>");
				$tr.append("<td>"+$vis['PRICE']+"</td>");
				$table.append($tr);
				$tr=$("<tr><td>Opis wizyty </td></tr>");
				$tr.append("<td colspan=\"3\" style=\"text-align:left;padding-left:50px\">"+$vis['DESCRIPTION']+"</td>");
				$table.append($tr);
				$tr=$("<tr><td>Choroby </td></tr>");
				$tr.append("<td>"+json['DISEASES']+"</td>");
				$tr.append("<td>Zabiegi </td>");
				$tr.append("<td>"+json['SERVICES']+"</td>");
				$table.append($tr);
				for(let i=0;i<json['PRESCRIPTIONS'].length;i++){
					$tr=$("<tr><td>Data recepty </td></tr>");
					$tr.append("<td>"+json['PRESCRIPTIONS'][i]['DATE']+"</td>");
					$tr.append("<td>Leki </td>");
					$tr.append("<td>"+json['PRESCRIPTIONS'][i]['MEDICINES']+"</td>");
					$table.append($tr);
				}
				$buttonPdfVisit = $("<a></a>");
				$buttonPdfVisit.attr('class','btn btnMenu');
				$buttonPdfVisit.html('Rezultat wizyty [PDF]');
				$buttonPdfVisit.attr('target','_blank');
				//$buttonPdfVisit.attr('href','../doctor/visitpdf.php');
				$buttonPdfVisit.on('click', function(){
					window.open('../doctor/visitpdf.php?cusAniId='+$vis['CUS_ANI_ID']+"&visId="+$vis['VIS_ID'], '_blank');
				})

				$("#contentDescription").append($table);
				$("#contentDescription").append($buttonPdfVisit);

				if(json['PRESCRIPTIONS'].length > 0) {
					$buttonPdfPrescription = $("<a></a>");
					$buttonPdfPrescription.attr('class','btn btnMenu');
					$buttonPdfPrescription.html('Recepta [PDF]');
					$buttonPdfPrescription.attr('target','_blank');
					$("#contentDescription").append($buttonPdfPrescription);
					$buttonPdfPrescription.on('click', function(){
						let params = "preId=";
						for(let i=0;i<json['PRESCRIPTIONS'].length;i++){
							params += json['PRESCRIPTIONS'][i]['PRE_ID'];
							if(i!=json['PRESCRIPTIONS'].length-1)
								params += ',';
						}
						window.open('../doctor/prescriptionpdf.php?'+params+'&visId='+$vis['VIS_ID'], '_blank');
					})
				}
				
				$("#contentDescription").append('<div style="clear:both;"></div>');
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
//obliczanie dawek leków
$("#countMedDos").on('click',function(){
	// przezroczysty div na cały ekran
	$container=$('<div></div>');
	$container.prop('id','opacityContainer');
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
	$countCotainer = $('<div></div>');
	$countCotainer.prop('id','countMedDosContainer');
	$countCotainer.css({
		'position':'absolute',
		'top':'50%',
		'left':'50%',
		'width':'500px',
		'padding': '20px 50px',
		'background':'#ff850c',
		'margin-left':'-270px',
		'margin-top':'-270px',
		'border-radius': '5px',
		'box-shadow': '0px 0px 5px 0px rgba(0,0,0,0.75)'
	});	
	$container.append($countCotainer);

	// tytuł modala
	$title = $('<div></div>');
	$title.prop('id','titleCountContainer');
	$title.css({
		'width': '440px',
		'float': 'left',
		'padding': '10px 20px 20px 20px',
		'background':'#ff850c',
		'font-size':'1.3rem'
	});
	$title.html("<i class='fas fa-info-circle' style='margin-right: 10px'></i>Obliczanie dawek leków");
	$countCotainer.append($title);

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
	$countCotainer.append($closeButton);

	// div na dane do wyswietlenia
	$message = $('<div></div>');
	$message.prop('id','messageCountContainer');
	$message.css({
		'width': '100%',
		'height': '100%',
		'font-size': '1.1rem'
	});
	//select z wyborem zwierzecia 
	$selectAnimalForCount=$('<select></select>');
	$selectAnimalForCount.attr('id','selectAnimalForCount');
	$selectAnimalForCount.css('width','100%');
	$selectAnimalForCount.on('change',function(){							//jesli sie zmienia to wpisuje wartosc do odpowiednieog inpuita
		if($selectAnimalForCount.val()!=-1){
			$("#wieghtForCount").val($(this).val());
			if($("#dosageForCount").val()!="")								 //jesli drugi input jest wypełniny to liczymy dawkowanie
				$("#resultForCount").val($("#dosageForCount").val() * $("#wieghtForCount").val());
		}
	});
	//select z wyborem leku
	$selectMedicineForCount=$('<select></select>');
	$selectMedicineForCount.attr('id','selectMedicineForCount');
	$selectMedicineForCount.css('width','100%');
	$selectMedicineForCount.on('change',function(){							//jesli sie zmienia to wpisuje wartosc do odpowiednieog inpuita
		if($selectMedicineForCount.val()!=-1){
			$("#dosageForCount").val($(this).val());
			if($("#wieghtForCount").val()!="")                               //jesli drugi input jest wypełniny to liczymy dawkowanie
				$("#resultForCount").val($("#dosageForCount").val() * $("#wieghtForCount").val());
		}
	});
	
	$.ajax({									
		type:"post",
		url:"visitsService.php",
		dataType:"json",
		data:{
			accType:"doctor",
			returnVal:"countMedDos"											//określa co chcemy										
		},
		success: function(json){
			$selectAnimalForCount.append('<option value="-1">-------------------</option>');	//budujemy dwa selecty
			for(let i=0;i<json[0].length;i++){
				
				$selectAnimalForCount.append('<option value="'+json[0][i]['WEIGHT']+'">'+json[0][i]['NAME']+' - '+json[0][i]['LAST_NAME_OWNER']+' '+json[0][i]['FIRST_NAME_OWNER']+'</option>');
			}
			$selectMedicineForCount.append('<option value="-1">-------------------</option>');
			for(let i=0;i<json[1].length;i++){
				
				$selectMedicineForCount.append('<option value="'+json[1][i]['DOSAGE']+'">'+json[1][i]['NAME']+'</option>');
			}
			//console.log(json);
		},
		error: function(e){
			console.warn(e);
		}
	});
	
	// dane do wyświetlenia
	$div = $('<div style="float:left; width: 100%; padding: 10px 0px">Wybierz zwierzę oraz lek lub wprowadz wagę zwierzęcia oraz dawkę leku samodzielnie:</div>');
	$message.append($div);
	$div = $('<div style="float:left; width: 50%; padding: 10px 0px">Zwierzę:</div>');
	$div2 = $('<div style="float:left; width: 50%; padding: 10px 0px"></div>');
	$div2.append($selectAnimalForCount);
	$message.append($div);
	$message.append($div2);
	$div = $('<div style="float:left; width: 50%; padding: 10px 0px">Lek:</div>');
	$div2 = $('<div style="float:left; width: 50%; padding: 10px 0px"></div>');
	$div2.append($selectMedicineForCount);
	$message.append($div);
	$message.append($div2);
	$div = $('<div style="float:left; width: 50%; padding: 10px 0px">Waga zwierzęcia:</div>');
	$div2 = $('<div style="float:left; width: 50%; padding: 10px 0px"></div>');	
	$weightInput=$('<input>');
	$weightInput.attr('id','wieghtForCount');
	$weightInput.attr('type','text');
	$weightInput.css('width','100%');
	$weightInput.on('blur',function(){
		if($(this).val()!="" && $("#dosageForCount").val()!="")                               //po wyblirowaniu, jesli oba są uzupełnine to mnozymy
				$("#resultForCount").val($("#dosageForCount").val() * $(this).val());
	});
	$div2.append($weightInput);
	$message.append($div);
	$message.append($div2);
	$div = $('<div style="float:left; width: 50%; padding: 10px 0px">Dawkowanie leku:</div>');
	$div2 = $('<div style="float:left; width: 50%; padding: 10px 0px"></div>');
	$dosageInput=$('<input>');
	$dosageInput.attr('id','dosageForCount');
	$dosageInput.attr('type','text');
	$dosageInput.css('width','100%');
	$dosageInput.on('blur',function(){
		if($(this).val()!="" && $("#wieghtForCount").val()!="")                               //po wyblirowaniu, jesli oba są uzupełnine to mnozymy
				$("#resultForCount").val($("#wieghtForCount").val() * $(this).val());
	});
	$div2.append($dosageInput);
	$message.append($div);
	$message.append($div2);
	$div = $('<div style="float:left; width: 50%; padding: 10px 0px">Dawka:</div>');
	$div2 = $('<div style="float:left; width: 50%; padding: 10px 0px"><input id="resultForCount" style="width:100%" type="text" disabled="true"></div>');
	$message.append($div);
	$message.append($div2);
	
	
	$countCotainer.append($message);
	$container.on('click', function(){
		$container.remove();
	}).children().click(function() {
		return false;
	});
	
	$closeButton.on('click', function(){
		$container.remove();
	});
});
//wspomaganie diagnozy
$("#supportDiagnose").on('click',function(){
	// przezroczysty div na cały ekran
	$container=$('<div></div>');
	$container.prop('id','opacityContainer');
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
	$diagnoseCotainer = $('<div></div>');
	$diagnoseCotainer.prop('id','countMedDosContainer');
	$diagnoseCotainer.css({
		'position':'absolute',
		'top':'50%',
		'left':'50%',
		'width':'500px',
		'padding': '20px 50px',
		'background':'#ff850c',
		'margin-left':'-270px',
		'margin-top':'-350px',
		'border-radius': '5px',
		'box-shadow': '0px 0px 5px 0px rgba(0,0,0,0.75)'
	});	
	$container.append($diagnoseCotainer);

	// tytuł modala
	$title = $('<div></div>');
	$title.prop('id','titleDiagnoseContainer');
	$title.css({
		'width': '440px',
		'float': 'left',
		'padding': '10px 20px 20px 20px',
		'background':'#ff850c',
		'font-size':'1.3rem'
	});
	$title.html("<i class='fas fa-info-circle' style='margin-right: 10px'></i>Wspomaganie diagnozy");
	$diagnoseCotainer.append($title);

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
	$diagnoseCotainer.append($closeButton);

	// div na dane do wyswietlenia
	$message = $('<div></div>');
	$message.prop('id','messageDiagnoseContainer');
	$message.css({
		'width': '100%',
		'height': '100%',
		'font-size': '1.1rem'
	});
	//pytania jak często
	const questions = [	"Jak często zwierze kaszle?",
						"Jak często ma katar?",
						"Jak często ma biegunkę?",
						"Jak często wymiotuje",
						"Jak często oddaje mocz?",
						"Jak często pije?",
						"Jak często ma kontakt z innymi zwierzętami?"];
	//pytania kiedy ostatnio					
	const questions2 = [	"Kiedy ostatnio było szczepione?",
						"Kiedy ostatnio było odrobaczane?"];

	for(let i=0;i<questions.length;i++){
		//treść pytania
		$div = $('<div style="float:left; height:40px; width: 50%; padding: 10px 0px">'+(i+1)+'. '+questions[i]+'</div>');
		//select z wyborem
		$div2 = $('<div style="float:left; height:40px; width: 50%; padding: 10px 0px"><select style="width:100%" id="question'+i+'"><option value="0">Nie występuje</option><option value="25">Bardzo rzadko</option><option value="50">Rzadko</option><option value="75">Często</option><option value="100">Bardzo często</option></select></div>');
		$message.append($div);
		$message.append($div2);
	}
	
	for(let i=questions.length;i<questions.length+questions2.length;i++){
		//treść pytania
		$div = $('<div style="float:left; height:40px; width: 50%; padding: 10px 0px">'+(i+1)+'. '+questions2[i-questions.length]+'</div>');
		//select z wyborem
		$div2 = $('<div style="float:left; height:40px; width: 50%; padding: 10px 0px"><select style="width:100%" id="question'+i+'"><option value="0">W ciągu ostatniego miesiąca</option><option value="25">W ciągu ostatnich dwóch miesięcy</option><option value="50">W ciągu ostatniego pół roku</option><option value="75">W ciągu ostatniego roku</option><option value="100">Ponad rok temu</option></select></div>');
		$message.append($div);
		$message.append($div2);
	}
	$div = $('<div style="float:left; width: 100%; padding: 10px 0px"></div>');
	$sendButton=$("<span style=\"display:block;height:20px;width:75%;text-align:center;margin:auto;margin-top:10px;\" class=\"btnEdit\">Sprawdź rezultat</span>");
	$sendButton.on('click',function(){
		$(this).html("Sprawdzam...");
		let distans=0;
		//let minD=10000;
		//let id=-1;
		let ids=[								//tabela przechowuje id i dystans (5 najmiejszych dysansów)
			[-1,10000],				//id, dystans
			[-1,10000],
			[-1,10000],
			[-1,10000],
			[-1,10000]
			];
		$.ajax({									
			type:"post",
			url:"visitsService.php",
			async:false,
			dataType:"json",
			data:{
				accType:"doctor",
				returnVal:"diagnoses"											//określa co chcemy										
			},
			success: function(json){
				console.log(json);
				for(let i=0;i<json.length;i++){
					distans=Math.sqrt(
						Math.pow(json[i]['QUESTION0']-$('#question0').val(),2)+
						Math.pow(json[i]['QUESTION1']-$('#question1').val(),2)+
						Math.pow(json[i]['QUESTION2']-$('#question2').val(),2)+
						Math.pow(json[i]['QUESTION3']-$('#question3').val(),2)+
						Math.pow(json[i]['QUESTION4']-$('#question4').val(),2)+
						Math.pow(json[i]['QUESTION5']-$('#question5').val(),2)+
						Math.pow(json[i]['QUESTION6']-$('#question6').val(),2)+
						Math.pow(json[i]['QUESTION7']-$('#question7').val(),2)+
						Math.pow(json[i]['QUESTION8']-$('#question8').val(),2));
					/*if(distans<minD){
						minD=distans;
						id=i;
					}*/
					if(distans<ids[4][1]){										//ids[4][1]bo tutaj bedzie siedział najwiekszy dystans
						ids[4][0]=i;
						ids[4][1]=distans;
						let change, temp;
						do{											//sortowanie bąbelkowe, tak, aby najwmiejszy dystans był pierwszy, wraz z jego id
							change = false;
							for(let j=0; j<ids.length-1;j++){
								if (ids[j+1][1]<ids[j][1]){
									temp = ids[j];
									ids[j] = ids[j+1];
									ids[j+1] = temp;
									change = true;
								}
							}
						} while (change);
					}
				}
				console.log(ids);
				let diseasesText="Żadna ze sprawdzonych diagnoz nie posiada identycznych parametrów. ";	//text do wyswietlenia
				let isTheSame=false;									//pomaga w okresleniu czy była taka sama diagnoza (dystans=0)
				let detectedDisease=[];
				let detectedDiseaseText="";
				for(let i=0;i<ids.length;i++){							//przechodzimy po tabeli z id
					if(ids[i][1]==0 && !isTheSame){						//sprawdzamy czy jest jakaś której dystans wynosił 0
						diseasesText="Znaleziono diagnozę o identycznych parametrach. Zdiagnozowana choroba: "+json[ids[i][0]]['DISEASE']+".";
						isTheSame=true;
					}
					if(isNaN(detectedDisease[json[ids[i][0]]['DISEASE']])){	//zapisujemy ilosc wykrytych chorób w tabeli
						detectedDisease[json[ids[i][0]]['DISEASE']]=1;		//index to nazwa chorby, a wartos to ich ilosc
					}														//jesli nie jest liczbą to zapisuemy tam 1, a jesli jest to inkrementujemy
					else 													
						detectedDisease[json[ids[i][0]]['DISEASE']]+=1;
					detectedDiseaseText+="<br>"+json[ids[i][0]]['DISEASE'];
					console.log(json[ids[i][0]]);
				}
				console.log(detectedDisease);
				diseasesText+=" <br><br><span style=\"font-size:1.3rem\">Lista chorób z najbardziej pasujących diagnoz: </span>"+detectedDiseaseText;
				$message.remove();
				$span=$('<span>'+diseasesText+'</span>');
				$diagnoseCotainer.append($span);
				$diagnoseCotainer.css({
					'margin-top':'-250px'
				});	
			},
			error: function(e){
				console.warn(e);
			}
		});
		$(this).html("Sprawdź rezultat");
	});
	$div.append($sendButton);
	$message.append($div);
	$diagnoseCotainer.append($message);
	$container.on('click', function(){
		$container.remove();
	}).children().click(function() {
		return false;
	});
	
	$closeButton.on('click', function(){
		$container.remove();
	});
})