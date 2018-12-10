let isSomeoneActive = false;												//czy jest obsługwana jakaś funkcja 
$("#showDoctorList").on('click',function(){									//po kliknieciu pokaż liste wszystkich lekarzy
	if(isSomeoneActive)														//jesli juz jest cos aktywnego
		deleteContent("showDoctorList");
	else
		showDoctorList();													//jesli nie ma nic aktywnego]
	$(this).attr('class','btn btnMenu active-btn');							//ustawiamy ten przycisk aktywny
});

$("#editDoctorData").on('click',function(){									//funkcja do edycji danych lekarza
	if(isSomeoneActive)														
		deleteContent("editDoctorData");
	else
		editDoctorData();												
	$(this).attr('class','btn btnMenu active-btn');
});

$("#addDoctor").on('click',function(){										//dodanie nowego lekarza
	if(isSomeoneActive)														
		deleteContent("addDoctor");
	else
		addDoctor();												
	$(this).attr('class','btn btnMenu active-btn');
});

function deleteContent(name,val){											//funkcja usuwa aktualny kontant, a paramtert mówi, który przycisk został aktywowany
	$('#doctorSubMenu a').each(function(){									//resetujemy wszystkie przyciski
		$(this).attr('class','btn btnMenu');
	});
	$("#contentTitle").html("");											//czyścimy środek tytułu
	$("#contentDescription").html("");										//to samo dla cotnentu
	switch (name){															//teraz od name zależy co pokażemy
		case "showDoctorList":
			showDoctorList();
			break;
		case "editDoctorData":
			editDoctorData(val);
			break;
		case "addDoctor":
			addDoctor();
			break;
		default:
			console.warn("err");
			break;
	}
}

function showDoctorList(){
	$.ajax({									
		type:"post",
		url:"getDoctorsData.php",
		dataType:"json",
		data:{
			accType:"doctor",
			returnVal:"fullData"											//określa czy chcemy całe czy tylko jednego pacienta
		},
		beforeSend: function(){
			$('body').css('opacity','0.6');
			$('body').css('cursor','progress');
		},
		success: function(json){
			if(json[0]==0 || json==1){													//jesli zero wyników lub błąd połaczenia (1)
				$("#contentTitle").append("<hr>");																//dajemy se kreske 
				$("#contentTitle").append("<h1><i class=\"fas fa-list-ul\"></i> Lista Lekarzy kliniki</h1>");	//ustawiamy tytuł
				$h3=$("<h3>Brak lekarzy</h3>");
				$h3.css({
					'display':'block',
					'width':'20%',
					'margin':'auto'
				});
				$("#contentDescription").append($h3);															//wstawiamy na strone tabele juz pelną
				if(json==1)
					console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				$("#contentTitle").append("<hr>");																//dajemy se kreske 
				$("#contentTitle").append("<h1><i class=\"fas fa-list-ul\"></i> Lista Lekarzy kliniki</h1>");	//ustawiamy tytuł
				let $table=$("<table></table>");																//tworzymy tabele
				$table.attr("id","doctorList");																//dajemy jej id
				$table.append("<thead><tr><th>Nazwisko</th><th>Imię</th><th>Email</th><th>Numer telefonu</th><th>Szczegóły</th></tr></thead>");	//wstawiamy do niej thead
				$tbody=$("<tbody></tbody>");
				for(let i=0;i<json.length;i++){
					$tr=$("<tr></tr>");
					$tr.attr("value",i);			//wpisujemy do value id lekarza, które siedzi w JSON
					$tr.on('click',function(){showDoctorDetail(json[$(this).attr('value')])});	//i na zdarzenie klikniecia ustawiamy funkcje z przekazaniem tego wiersza z JSON, aby nie pobierać znowu z bazy
					$tr.html("<td>"+json[i]['LAST_NAME']+"</td><td>"+json[i]['FIRST_NAME']+"</td><td>"+json[i]['EMAIL']+"</td><td>"+json[i]['PHONE_NUMBER']+"</td><td><i class=\"fas fa-info-circle\"></i></td>");
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
//pokazuje szczegółowe dane lekarza po kliknięciu na niego
function showDoctorDetail(doctor){
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
	$doctorDetail = $('<div></div>');
	$doctorDetail.prop('id','doctorDetailInList');
	$doctorDetail.css({
		'position':'absolute',
		'top':'50%',
		'left':'50%',
		'width':'500px',
		'padding': '20px 50px',
		'background':'#ff850c',
		'margin-left':'-270px',
		'margin-top':'-330px',
		'border-radius': '5px',
		'box-shadow': '0px 0px 5px 0px rgba(0,0,0,0.75)'
	});	
	$container.append($doctorDetail);

	// tytuł modala
	$title = $('<div></div>');
	$title.prop('id','titleDoctorDetail');
	$title.css({
		'width': '440px',
		'float': 'left',
		'padding': '10px 20px 20px 20px',
		'background':'#ff850c',
		'font-size':'1.3rem'
	});
	$title.html("<i class='fas fa-info-circle' style='margin-right: 10px'></i>" + doctor['FIRST_NAME'] + " " + doctor['LAST_NAME'] + " [" + doctor['EMAIL'] + "]");
	$doctorDetail.append($title);

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
	$doctorDetail.append($closeButton);

	// div na dane do wyswietlenia
	$message = $('<div></div>');
	$message.prop('id','messageDoctorDetail');
	$message.css({
		'width': '100%',
		'height': '100%',
		'font-size': '1.1rem'
	});
	
	// dane do wyświetlenia
	$div = ('<div style="float:left; width: 50%; padding: 10px 0px">Adres:</div>');
	$div2 = ('<div style="float:left; width: 50%; padding: 10px 0px">' + doctor['ADDRESS'] + '</div>');
	$message.append($div);
	$message.append($div2);
	$div = ('<div style="float:left; width: 50%; padding: 10px 0px">Tytuł akademicki:</div>');
	$div2 = ('<div style="float:left; width: 50%; padding: 10px 0px">' + doctor['ACADEMIC_TITLE'] + '</div>');
	$message.append($div);
	$message.append($div2);
	$div = ('<div style="float:left; width: 50%; padding: 10px 0px">Typ administratora:</div>');
	$div2 = ('<div style="float:left; width: 50%; padding: 10px 0px">' + doctor['ADM_TYPE'] + '</div>');
	$message.append($div);
	$message.append($div2);
		
	// godziny przyjęć do wyświetlenia
	$clear = ('<div class="clear"></div>');
	$message.append($clear);
	$divAdmHTitle = ('<div style="text-align: center; width: 100%; padding: 20px 0px; background: #e6e6e6; color: #333">Godziny przyjęć</div>');
	$monday = ('<div class="admission-hours">Poniedziałek:</div>');
	$tuesday = ('<div class="admission-hours">Wtorek:</div>');
	$wednesday = ('<div class="admission-hours">Środa:</div>');
	$thursday = ('<div class="admission-hours">Czwartek:</div>');
	$friday = ('<div class="admission-hours">Piątek:</div>');
	$saturday = ('<div class="admission-hours">Sobota:</div>');
	$sunday = ('<div class="admission-hours">Niedziela:</div>');
	$div1 = ('<div class="admission-hours">' + doctor['MONDAY'] + '</div>');
	$div2 = ('<div class="admission-hours">' + doctor['TUESDAY'] + '</div>');
	$div3 = ('<div class="admission-hours">' + doctor['WEDNESDAY'] + '</div>');
	$div4 = ('<div class="admission-hours">' + doctor['THURSDAY'] + '</div>');
	$div5 = ('<div class="admission-hours">' + doctor['FRIDAY'] + '</div>');
	$div6 = ('<div class="admission-hours">' + doctor['SATURDAY'] + '</div>');
	$div7 = ('<div class="admission-hours">' + doctor['SUNDAY'] + '</div>');
	$message.append($divAdmHTitle);
	$message.append($monday);
	$message.append($div1);
	$message.append($tuesday);
	$message.append($div2);
	$message.append($wednesday);
	$message.append($div3);
	$message.append($thursday);
	$message.append($div4);
	$message.append($friday);
	$message.append($div5);
	$message.append($saturday);
	$message.append($div6);
	$message.append($sunday);
	$message.append($div7);
	$message.append($clear);
	
	$doctorDetail.append($message);
	$editButton=$("<span style=\"display:block;text-align:center;margin:auto\" class=\"btnEdit\">Edytuj</span>");
	$editButton.on('click',function(){											//przycisk edycji 			
		$('#opacityContainer').remove();										//usuway ten kontener
		deleteContent("editDoctorData", doctor['EMAIL']);						//zienamy zakadke i przesyłamy email lekarza, któego kliknęlismu
		$("#editDoctorData").attr('class','btn btnMenu active-btn');			//ustawiamy aktywny przycisk
		getDoctorData(doctor);													//i przekazujemy tego lekarza, bo juz mamy go pobranego
	})
	if($('#showDoctorList').attr('value')==="HEAD")								//jesli to head admin to dajemu mu mozliwosc edycji
		$doctorDetail.append($editButton);
	// po kliknięciu gdziekolwiek poza content znika modal
	$container.on('click', function(){
		$container.remove();
	}).children().click(function() {
		return false;
	});
	
	$closeButton.on('click', function(){
		$container.remove();
	});
}
//funkcja, któa wsiwietla pola do edycji danych
function editDoctorData(val){																//parametr przyjmowany, gdy kliknieto w lekarza w liscie
	$("#contentTitle").append("<hr>");																			//dajemy se kreske 
	$("#contentTitle").append("<h1><i class=\"fas fa-cogs\"></i> Edycja danych lekarza</h1>");		//ustawiamy tytuł
	//$("#contentTitle").fadeOut(1);
	$inputDetail=$("<input class=\"detail-input\" type=\"text\" placeholder=\"Wprowadź adres mailowy lekarza, którego dane chcesz edytować\" >");
	if(val!=null)														//jesli ten val ustnieje, to wypełniamy nim inputa
		$inputDetail.val(val);
	$("#contentDescription").append($inputDetail);							//wstawiamy na strone input
	
	$searchButton=$("<span></span>");
	$searchButton.attr('class','search-button');
	$searchButton.html('<i class="fas fa-cogs"></i> Rozpocznij edycje');	
	$searchButton.on('click',function(){
		getDoctorData();
	});	
	$("#contentDescription").append($searchButton);
	isSomeoneActive=true;
}
//pobranie danych i wyswietlenie je w formularzu
function getDoctorData(doctor){											//jesli przekazujemy dane z tabeli z lekarzami, to wprowadzamy ten paramtert
	if(doctor!=null)
		drawTable(doctor,"edit");
	else {
		const mailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/					//regularne dla maila
		if($("#doctorDetail").length>0)
			$("#doctorDetail").remove();
		if($('.detail-input').val()==''){
			$('.detail-input').css({
				'box-shadow':'3px 3px 5px 6px #ffb3b3'
			});
			$('.detail-input').attr('placeholder','To pole nie może pozostać puste');
		}
		else if(!mailReg.test($('.detail-input').val())){
			$('.detail-input').css({
				'box-shadow':'3px 3px 5px 6px #ffb3b3'
			});
			$('.detail-input').attr('placeholder',' wartość "'+$('.detail-input').val()+'" nie jest adresem mailowym');
			$('.detail-input').val('');
		}
		else{
			$('.detail-input').css({
				'box-shadow':'3px 3px 5px 6px #ccc'
			});
			$('.detail-input').attr('placeholder','Wprowadź adres mailowy lekarza, którego dane chcesz edytować');
			const mail = $('.detail-input').val();
			$.ajax({									
				type:"post",
				url:"getDoctorsData.php",
				dataType:"json",
				data:{
					accType:"doctor",
					returnVal:"detail",											//określa czy chcemy całe czy tylko jednego pacienta
					mail:mail
				},
				beforeSend: function(){
					$('body').css('opacity','0.6');
					$('body').css('cursor','progress');
				},
				success: function(json){
					if(json==0 || json==1){												//jesli 0 lub 1(połączenie złe) to znaczy, ze nie ma takiego
						let $table=$("<table></table>");														//tworzymy tabele
						$table.attr("id","doctorDetail");														//dajemy jej id
						$table.append("<thead><tr><th colspan=\"2\">Dane lekarza: "+mail+"</tr></thead>");		//wstawiamy do niej thead
						$tbody=$("<tbody></tbody>");
						$tbody.append("<tr><td colspan=\"2\">Nie istnieje lekarz o podanym adresie mailowym.</td></tr>");
						$table.append($tbody);
						$("#contentDescription").append($table);
					}
					else
						drawTable(json,"edit");
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
}
//funcja tworząca tabele do edycji danych, przyjmuje lekarza oraz typ operacji: edit - edycja, add-dodanie, od tego zalezy przycisk na końcu
function drawTable(doctorData,operationType){
	let $table=$("<table></table>");																//tworzymy tabele
	$table.attr("id","doctorDetail");																//dajemy jej id
	if(operationType=="edit")
		$table.append("<thead><tr><th colspan=\"2\" id=\"addressMail\" mail=\""+doctorData['EMAIL']+"\">Dane lekarza: "+doctorData['EMAIL']+"</tr></thead>");	//wstawiamy do niej thead
	else if(operationType=="add")
		$table.append("<thead><tr><th colspan=\"2\" \">Dodanie nowego lekarza</tr></thead>");
	$tbody=$("<tbody></tbody>");
	if(operationType=="add"){
		$tbody.append("<tr><td>Adres mailowy: </td><td class=\"tdDuringEdit\"><input id=\"emailAddress\" type=\"text\"></td></tr>");
		$tbody.append("<tr><td>Hasło: </td><td class=\"tdDuringEdit\"><input id=\"password\" type=\"text\"></td></tr>");
	}
	$tbody.append("<tr><td>Imie: </td><td class=\"tdDuringEdit\"><input id=\"firstN\" type=\"text\" value=\""+doctorData['FIRST_NAME']+"\"></td></tr>");	//i poszczególne dane
	$tbody.append("<tr><td>Nazwsiko: </td><td class=\"tdDuringEdit\"><input id=\"lastN\" type=\"text\" value=\""+doctorData['LAST_NAME']+"\"></td></tr>");
	$tbody.append("<tr><td>Adres: </td><td class=\"tdDuringEdit\"><input id=\"address\" type=\"text\" value=\""+doctorData['ADDRESS']+"\"></td></tr>");
	$tbody.append("<tr><td>Numer telefonu: </td><td class=\"tdDuringEdit\"><input id=\"phoneN\" type=\"text\" value=\""+doctorData['PHONE_NUMBER']+"\"></td></tr>");
	$tbody.append("<tr><td>Tytuł naukowy </td><td class=\"tdDuringEdit\"><input id=\"academicT\" type=\"text\" value=\""+doctorData['ACADEMIC_TITLE']+"\"></td></tr>");
	let select="";
	if(doctorData['ADM_TYPE']=="NORMAL")
		select="<select id=\"adminT\"><option>NORMAL</option><option>HEAD</option></select>";
	else
		select="<select id=\"adminT\"><option>HEAD</option><option>NORMAL</option></select>";
	$tbody.append("<tr><td>Typ administatora</td><td class=\"tdDuringEdit\">"+select+"</td></tr>");
	$tbody.append("<tr><td>Poniedziałek: </td><td id=\"mondayAH\"></td></tr>");
	$tbody.append("<tr><td>Wtorek: </td><td id=\"tuesdayAH\"></td></tr>");
	$tbody.append("<tr><td>Środa: </td><td id=\"wednesdayAH\"></td></tr>");
	$tbody.append("<tr><td>Czwartek: </td><td id=\"thursdayAH\"></td></tr>");
	$tbody.append("<tr><td>Piątek: </td><td id=\"fridayAH\"></td></tr>");
	$tbody.append("<tr><td>Sobota: </td><td id=\"saturdayAH\"></td></tr>");
	$tbody.append("<tr><td>Niedziela: </td><td id=\"sundayAH\"></td></tr>");
	
	$table.append($tbody);
	$("#contentDescription").append($table);														//wstawiamy na strone tabele juz pelną
	drawAdmissionHours(doctorData['MONDAY'],"monday");
	drawAdmissionHours(doctorData['TUESDAY'],"tuesday");
	drawAdmissionHours(doctorData['WEDNESDAY'],"wednesday");
	drawAdmissionHours(doctorData['THURSDAY'],"thursday");
	drawAdmissionHours(doctorData['FRIDAY'],"friday");
	drawAdmissionHours(doctorData['SATURDAY'],"saturday");
	drawAdmissionHours(doctorData['SUNDAY'],"sunday");
	$butt=$("<span></span>");
	$cancel=$("<span></span>");
	$butt.addClass('search-button');
	$cancel.addClass('search-button');
	$butt.css({
		'width':'25%',
		'display':'inline-block',
		'margin-right':'1%'
	});
	$cancel.css({
		'width':'25%',
		'display':'inline-block'
	});
	if(operationType=="edit"){
		$butt.attr('id','saveDoctorEdit');									//przycisk do zapisu danych
		$cancel.attr('id','calcelEdit');									//przycisk do cofniecia zmian
		$butt.html('<i class="far fa-save"></i> Zapisz zmiany');
		$cancel.html('<i class="fas fa-reply"></i> Cofnij zmiany');
		$butt.on('click',function(){										//jesli nacisnie przycisk wyslij to odpalamy funkcje do wysyłania
			sendEditedData();
		});
		$cancel.on('click',function(){												//jesli nacisnie przycisk do cofnieca to znowy rysujemy tę samą tabele
			deleteContent("editDoctorData", doctorData['EMAIL']);					//przesłamy email tego lekarza
			$("#editDoctorData").attr('class','btn btnMenu active-btn');			//ustawiamy aktywny przycisk
			getDoctorData(doctorData);
		});
		if($("#saveDoctorEdit").length>0)											//jesli są juz przyciski to usuwamy, bo czasami zostawały
			$("#saveDoctorEdit").remove();
		if($("#calcelEdit").length>0)
			$("#calcelEdit").remove();
	}
	else if(operationType=="add"){
		$butt.attr('id','addDoctorButton');									//przycisk do zapisu danych
		$cancel.attr('id','calcelAdd');									//przycisk do cofniecia zmian
		$butt.html('<i class="fas fa-plus"></i> Dodaj lekarza');
		$cancel.html('<i class="fas fa-times"></i> Anuluj dodawanie');
		$butt.on('click',function(){										//jesli nacisnie przycisk wyslij to odpalamy funkcje do wysyłania
			sendNewDoctor();
		});
		$cancel.on('click',function(){												//jesli nacisnie przycisk do cofnieca to rysujemy tabele od nowa
			deleteContent("addDoctor");												
			$("#addDoctor").attr('class','btn btnMenu active-btn');					//ustawiamy aktywny przycisk
			$('html, body').animate({
				scrollTop: $("body").offset().top
			}, 1000);
		});
		if($("#addDoctorButton").length>0)											//jesli są juz przyciski to usuwamy, bo czasami zostawały
			$("#addDoctorButton").remove();
		if($("#calcelAdd").length>0)
			$("#calcelAdd").remove();
	}
	$("#contentDescription").append($butt);
	$("#contentDescription").append($cancel);
	if(operationType=="edit"){
		$('html, body').animate({
			scrollTop: $("#doctorDetail").offset().top
		}, 1000);
	}
}
//funkcja tworząca pola do edycji danych o godzinach
function drawAdmissionHours(hours,day){
	$tableAH= $('<table></table>');								//tworzymy tabele;
	$tableAH.attr('id',day+'Table');
	$tableAH.addClass("editAH");								
	$trAH=$("<tr></tr>");
	$inputCheckbox=$('<input>');								//input z checkboxem
	$inputCheckbox.attr('id',day+'Checkbox');					//dajemy mu id 
	if(hours=="Brak Przyjęć"){									//jesli nie było godzin przyjeć to uznajemy, ze w tym dniu nie ma przyjęć
		$tdAH=$('<td></td>');									//tworzymy td
		$tdAH.attr('colspan','4');							
		$tdAH.css('width','80%');
		$tdAH.addClass('can-remove');							//potrzebny przy klikaniu w checkbox
		$tdAH.html('Dzień bez przyjęć');
		$trAH.append($tdAH);									//wstawiamy go do tr
		$inputCheckbox.attr('checked','true');					//zaznaczymy inputa
	}
	else{
		var splited = hours.split("-");							//w przeciwnym razie rozdzielamy godziny na startową i końcową
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
		$inputSh.attr('id',day+'S');
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
		$inputFh.attr('id',day+'F');
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
			$input2.attr('id',day+'F');
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
			$input1.attr('id',day+'S');
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
	$tdAH5.append($inputCheckbox);
	$trAH.append($tdAH5);
	
	$tbodyAH=$('<tbody></tbody>');
	$tbodyAH.append($trAH);									//wstawiamy tr do tbody
	$tableAH.append($tbodyAH);								//wstawiamy tbody do tabeli
	$("#"+day+"AH").css('padding','10px');
	$("#"+day+"AH").append($tableAH);						//wstawiamy do komórki
}
//funkcja wysyłajaća zedytowane dane lekarza
function sendEditedData(){
	//pobieramy dane o godzinach
	let mondayHours="";let tuesdayHours="";let wednesdayHours="";let thursdayHours="";let fridayHours="";let saturdayHours="";let sundayHours="";
	if(!$("#mondayCheckbox").is(':checked')){
		mondayHours=$("#mondayS").val()+"-"+$("#mondayF").val();
	}
	if(!$("#tuesdayCheckbox").is(':checked')){
		tuesdayHours=$("#tuesdayS").val()+"-"+$("#tuesdayF").val();
	}
	if(!$("#wednesdayCheckbox").is(':checked')){
		wednesdayHours=$("#wednesdayS").val()+"-"+$("#wednesdayF").val();
	}
	if(!$("#thursdayCheckbox").is(':checked')){
		thursdayHours=$("#thursdayS").val()+"-"+$("#thursdayF").val();
	}
	if(!$("#fridayCheckbox").is(':checked')){
		fridayHours=$("#fridayS").val()+"-"+$("#fridayF").val();
	}
	if(!$("#saturdayCheckbox").is(':checked')){
		saturdayHours=$("#saturdayS").val()+"-"+$("#saturdayF").val();
	}
	if(!$("#sundayCheckbox").is(':checked')){
		sundayHours=$("#sundayS").val()+"-"+$("#sundayF").val();
	}
	//obiekty do walidacji
	//podtabele: [id elementu z którego sie pobiera wartosc, nazwa któa wyswietla sie przy błędzie, typ walidacj (same litery, mail, hasło etc)]
	//default znaczy, ze litery i kopka, i myslnik
	let objectsForVal=[		
		['firstN','Imię','default'],
		['lastN','Nazwisko','default'],
		['address','Adres','noSpecialChars'],
		['phoneN','Numer telefonu','phoneNumber'],
		['academicT','Tytuł naukowy','default'],
		['adminT','Typ administratora','adminType'],
		['mondayS','Poniedziałek','hour'],['mondayF','Poniedziałek','hour'],
		['tuesdayS','Wtorek','hour'],['tuesdayF','Wtorek','hour'],
		['wednesdayS','Środa','hour'],['wednesdayF','Środa','hour'],
		['thursdayS','Czwartek','hour'],['thursdayF','Czwartek','hour'],
		['fridayS','Piątek','hour'],['fridayF','Piątek','hour'],
		['saturdayS','Sobota','hour'],['saturdayF','Sobota','hour'],
		['sundayS','Niedziela','hour'],['sundayF','Niedziela','hour']
	];
	if(validation(objectsForVal)){				//jesli walidacja ok, to wysyłamy						
		$.ajax({
			type:"post",
			url:"getDoctorsData.php",
			dataType:"json",
			data:{
				accType:"doctor",
				returnVal:"editDoctors",
				mail: $('#addressMail').attr('mail'),
				firstName: $('#firstN').val(),
				lastName: $('#lastN').val(),
				address: $('#address').val(),
				phoneNumber: $('#phoneN').val(),
				academicTitle: $('#academicT').val(),
				adminType: $('#adminT').val(),
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
						$("#contentTitle").html("");											//czyścimy środek tytułu
						$("#contentDescription").html("Dane zostały pomyślnie zedytowane.");										//piszemy, ze ok
						$('html, body').animate({
							scrollTop: $("body").offset().top
						}, 1000);
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
	else{
		$('html, body').animate({
			scrollTop: $("#contentDescription").offset().top							//i podnosimy strone jesli są błędy
		}, 1000);
	}
	/*
	*/
}
function addDoctor(){
	$("#contentTitle").append("<hr>");																//dajemy se kreske 
	$("#contentTitle").append("<h1><i class=\"fas fa-plus\"></i> Dodanie lekarza</h1>");	//ustawiamy tytuł
	//tworzymy pustego lekarza, aby przekazać go do funckji
	const emptyDoctor= {
		"EMAIL":"",
		"FIRST_NAME":"",
		"LAST_NAME":"",
		"ADDRESS":"",
		"ACADEMIC_TITLE":"",
		"PHONE_NUMBER":"",
		"ADM_TYPE":"NORMAL",
		"MONDAY":"Brak Przyjęć",
		"TUESDAY":"Brak Przyjęć",
		"WEDNESDAY":"Brak Przyjęć",
		"THURSDAY":"Brak Przyjęć",
		"FRIDAY":"Brak Przyjęć",
		"SATURDAY":"Brak Przyjęć",
		"SUNDAY":"Brak Przyjęć"
	};
	drawTable(emptyDoctor,"add");
	isSomeoneActive=true;
}
//funckja wysyłajaca dane nowego lekarza do dodania do bazy
function sendNewDoctor(){
	let mondayHours="";let tuesdayHours="";let wednesdayHours="";let thursdayHours="";let fridayHours="";let saturdayHours="";let sundayHours="";
	if(!$("#mondayCheckbox").is(':checked')){
		mondayHours=$("#mondayS").val()+"-"+$("#mondayF").val();
	}
	if(!$("#tuesdayCheckbox").is(':checked')){
		tuesdayHours=$("#tuesdayS").val()+"-"+$("#tuesdayF").val();
	}
	if(!$("#wednesdayCheckbox").is(':checked')){
		wednesdayHours=$("#wednesdayS").val()+"-"+$("#wednesdayF").val();
	}
	if(!$("#thursdayCheckbox").is(':checked')){
		thursdayHours=$("#thursdayS").val()+"-"+$("#thursdayF").val();
	}
	if(!$("#fridayCheckbox").is(':checked')){
		fridayHours=$("#fridayS").val()+"-"+$("#fridayF").val();
	}
	if(!$("#saturdayCheckbox").is(':checked')){
		saturdayHours=$("#saturdayS").val()+"-"+$("#saturdayF").val();
	}
	if(!$("#sundayCheckbox").is(':checked')){
		sundayHours=$("#sundayS").val()+"-"+$("#sundayF").val();
	}
	//obiekty do walidacji
	//podtabele: [id elementu z którego sie pobiera wartosc, nazwa któa wyswietla sie przy błędzie, typ walidacj (same litery, mail, hasło etc)]
	//default znaczy, ze litery i kopka, i myslnik
	let objectsForVal=[		
		['emailAddress','Adres mailowy','mail'],
		['password','Hasło','password'],
		['firstN','Imię','default'],
		['lastN','Nazwisko','default'],
		['address','Adres','noSpecialChars'],
		['phoneN','Numer telefonu','phoneNumber'],
		['academicT','Tytuł naukowy','default'],
		['adminT','Typ administratora','adminType'],
		['mondayS','Poniedziałek','hour'],['mondayF','Poniedziałek','hour'],
		['tuesdayS','Wtorek','hour'],['tuesdayF','Wtorek','hour'],
		['wednesdayS','Środa','hour'],['wednesdayF','Środa','hour'],
		['thursdayS','Czwartek','hour'],['thursdayF','Czwartek','hour'],
		['fridayS','Piątek','hour'],['fridayF','Piątek','hour'],
		['saturdayS','Sobota','hour'],['saturdayF','Sobota','hour'],
		['sundayS','Niedziela','hour'],['sundayF','Niedziela','hour']
	]
	if(validation(objectsForVal)){				//jesli walidacja ok, to wysyłamy						
		$.ajax({
			type:"post",
			url:"getDoctorsData.php",
			dataType:"json",
			data:{
				accType:"doctor",
				returnVal:"addDoctor",
				mail: $("#emailAddress").val(),
				password: $("#password").val(),
				firstName: $('#firstN').val(),
				lastName: $('#lastN').val(),
				address: $('#address').val(),
				phoneNumber: $('#phoneN').val(),
				academicTitle: $('#academicT').val(),
				adminType: $('#adminT').val(),
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
				switch(json){
					case 0:
						$("#contentTitle").html("");																				//czyścimy środek tytułu
						$("#contentDescription").html("Lekarz został dodany.");														//piszemy, ze ok
						$('html, body').animate({
							scrollTop: $("body").offset().top
						}, 1000);
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
	else{
		$('html, body').animate({
			scrollTop: $("#contentDescription").offset().top							//i podnosimy strone jesli są błędy
		}, 1000);
	}
}
//funkcja waliduje kolejne pola obiektu, który zostanie przekazany, generuje błędy i zwraca false jeśli cos poszło nie tak
function validation(objectsForVal){
	successful=true;
	for(let i=0;i<objectsForVal.length;i++){
		let text="";
		const val=$('#'+objectsForVal[i][0]).val();
		if(val=="")															//jesli jest pole puste
			text="Pole "+objectsForVal[i][1]+" nie może być puste!";
		switch (objectsForVal[i][2]){
			case 'default':
				const defaultReg = /^([a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ.-\s]){2,25}$/	
				if(text=="" && !defaultReg.test(val))
					text="Pole "+objectsForVal[i][1]+" może zawierać tylko litery i myślnik oraz musi składać się z conajmniej dwóch znaków!-";
				break;
			case 'mail':
				const mailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/	
				if(text=="" && !mailReg.test(val))
					text="Pole "+objectsForVal[i][1]+" musi zawierać mail!";
				else if(text=="" && !isMailAvaliable(val))
					text="Adres mailowy jest już zajęty!";
				break;
			case 'password':
				if(val.length<5)
					text = "Pole "+objectsForVal[i][1]+" musi zawierać conajmniej 5 znaków!";
				break;
			case 'noSpecialChars':
				const noSpecialCharsReg = /^([a-zA-Z0-9ąćęłńóśźżĄĘŁŃÓŚŹŻ_.+-\/\s])+$/	
				if(text=="" && !noSpecialCharsReg.test(val))
					text = "Pole "+objectsForVal[i][1]+" posiada niepoprawny format!";
				break;
			case 'phoneNumber':
				if(isNaN(val) || val.length!=9)
					text = "Pole "+objectsForVal[i][1]+" musi zawierać 9 cyfr!";
				break;
			case 'hour':
				const hourReg = /^([0-9]){2}:([0-9]){2}$/	
				if(text=="" && val!=undefined && !hourReg.test(val))
					text="Pole "+objectsForVal[i][1]+" nie jest godziną!";
				break;
			default:
				break;
		}
		
		if(text!=""){															//jeśli tekst jest inny niż "" to znaczy, ze jest jakis bład
			erroreService(objectsForVal[i],text);								//wiec pokazujemy ten błąd
			let id='#'+objectsForVal[i][0];										//zapisujemy id elementu
			if($._data( $(id)[0], "events" )===undefined)						//jesli nie ma na elemencie jeszcze keyup
				$(id).on('keyup',function(){validation([objectsForVal[i]])});	//to dodajemy walidacje tego elmentu na zdarzenie keyup
			successful=false;													//i zmieniamy succesfull na false :(
		}
		else{																
			$('#'+objectsForVal[i][0]).css('background-color','white');			//jsli nie ma to usuwamy błędy
			if($("#"+objectsForVal[i][0]+'Info').length>0)
				$("#"+objectsForVal[i][0]+'Info').remove();
			if($("#"+objectsForVal[i][0]+'Err').length>0)
				$("#"+objectsForVal[i][0]+'Err').remove();	
		}
	}
	return successful;
}
function erroreService(obj,text){
	if($("#"+obj[0]+'Info').length>0)
		$("#"+obj[0]+'Info').remove();
	$('#'+obj[0]).css('background-color','#ffcccc');
	$errorInfo=$('<span></span>');													//tworzymy wykrzyknik i nadajemy odpowiednie paramatery i właściwości
	$errorInfo.prop('class','doctor-service-error-info');
	$errorInfo.prop('id',obj[0]+'Info');
	$errorInfo.html('!');
	$errorInfo.css({
		'top':$("#"+obj[0]).offset().top,
		'left':$("#"+obj[0]).offset().left + $("#"+obj[0]).outerWidth() + 10,
		'width':$("#"+obj[0]).outerHeight() - 10,
		'height':$("#"+obj[0]).outerHeight() - 25,
		'font-size':$("#"+obj[0]).outerHeight() - 30,
	});	
	$errorInfo.on('mouseover',function(){											//po najechaniu pokazuje nam się treśc błędu
		$error = $('<span></span>');
		$error.prop('class','doctor-service-error');
		$error.prop('id',obj[0]+'Err');
		$error.css({
			'top':$('#'+obj[0]+'Info').offset().top - 30,
			'left':$('#'+obj[0]+'Info').offset().left + $('#'+obj[0]+'Info').outerWidth() + 30
		});	
		$error.html(text);
		$('#contentDescription').append($error);
	})
	$errorInfo.on('mouseout',function(){											//a po zjechaniu usuwa
		if($('#'+obj[0]+'Err'))
			$('#'+obj[0]+'Err').remove();
	})
	if(obj[2]!="hour")																//jesli to nie godzina to dodajemy błąd do storny
		$('#contentDescription').append($errorInfo);
}
function isMailAvaliable(val){
	result = false;
	$.ajax({
		type:"post",
		async: false,																//potrzebne zeby czekało na wynik i wykonywało sie szeregowo
		url:"../ismailavailable.php",
		dataType:"json",
		data:{
			email:val
		},
		success: function(json){
			result=json;
		},
		error: function(e){
			console.warn(e);
			result= false;
		}
	});
	return result;
}