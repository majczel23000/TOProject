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
				$tr=$("<tr><td>Lekarz prowadzący </td></tr>");
				$tr.append("<td>"+json['DOCTOR']+"</td>");
				$tr.append("<td>Klient</td>");
				$tr.append("<td>"+$vis['OWNER']+"</td>");
				$table.append($tr);
				$tr=$("<tr><td>Imie zwierzęcia </td></tr>");
				$tr.append("<td>"+json['NAME']+"</td>");
				$tr.append("<tr><td>Identyfikator w systemie </td></tr>");
				$tr.append("<td>"+$vis['CUS_ANI_ID']+"</td>");
				$table.append($tr);
				$tr=$("<tr><td>Rasa zwierzęcia </td></tr>");
				$tr.append("<td>"+$vis['RACE']+"</td>");
				$tr.append("<tr><td>Waga zwierzęcia </td></tr>");
				$tr.append("<td>"+json['WEIGHT']+"</td>");
				$table.append($tr);
				$tr=$("<tr><td>Data urodzenia zwierzęcia </td></tr>");
				$tr.append("<td>"+json['BIRTH_DATE']+"</td>");
				$tr.append("<tr><td>Płeć zwierzęcia </td></tr>");
				$tr.append("<td>"+json['GENDER']+"</td>");
				$table.append($tr);
				$tr=$("<tr><td>Choroby </td></tr>");
				$tr.append("<td>"+json['DISEASES']+"</td>");
				$tr.append("<tr><td>Zabiegi </td></tr>");
				$tr.append("<td>"+json['SERVICES']+"</td>");
				$table.append($tr);
				for(let i=0;i<json['PRESCRIPTIONS'].length;i++){
					$tr=$("<tr><td>Data recepty </td></tr>");
					$tr.append("<td>"+json['PRESCRIPTIONS'][i]['DATE']+"</td>");
					$tr.append("<tr><td>Leki </td></tr>");
					$tr.append("<td>"+json['PRESCRIPTIONS'][i]['MEDICINES']+"</td>");
					$table.append($tr);
				}
				$("#contentDescription").append($table);
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