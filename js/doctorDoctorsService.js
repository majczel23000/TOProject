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
				$table.append("<thead><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone Number</th><th>Details</th></tr></thead>");	//wstawiamy do niej thead
				$tbody=$("<tbody></tbody>");
				for(let i=0;i<json.length;i++){
					$tr=$("<tr></tr>");
					$tr.attr("value",i);			//wpisujemy do value id lekarza, które siedzi w JSON
					$tr.on('click',function(){showDoctorDetail(json[$(this).attr('value')])});	//i na zdarzenie klikniecia ustawiamy funkcje z przekazaniem tego wiersza z JSON, aby nie pobierać znowu z bazy
					$tr.html("<td>"+json[i]['FIRST_NAME']+"</td><td>"+json[i]['LAST_NAME']+"</td><td>"+json[i]['EMAIL']+"</td><td>"+json[i]['PHONE_NUMBER']+"</td><td><i class=\"fas fa-info-circle\"></i></td>");
					$tbody.append($tr);
				}
				$table.append($tbody);
				$("#contentDescription").append($table);														//wstawiamy na strone tabele juz pelną
				
				console.log(json);
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
	
function getDoctorData(doctor){											//jesli przekazujemy dane z tabeli z lekarzami, to wprowadzamy ten paramtert
	if(doctor!=null){
		let $table=$("<table></table>");																//tworzymy tabele
		$table.attr("id","doctorDetail");																//dajemy jej id
		$table.append("<thead><tr><th colspan=\"2\">Dane lekarza: "+doctor['EMAIL']+"</tr></thead>");		//wstawiamy do niej thead
		$tbody=$("<tbody></tbody>");
		$tbody.append("<tr><td>First Name: </td><td class=\"tdDuringEdit\"><input type=\"text\" value=\""+doctor['FIRST_NAME']+"\"></td></tr>");	//i poszczególne dane
		$tbody.append("<tr><td>Last Name: </td><td class=\"tdDuringEdit\"><input type=\"text\" value=\""+doctor['LAST_NAME']+"\"></td></tr>");
		$tbody.append("<tr><td>Address: </td><td class=\"tdDuringEdit\"><input type=\"text\" value=\""+doctor['ADDRESS']+"\"></td></tr>");
		$tbody.append("<tr><td>Phone Number: </td><td class=\"tdDuringEdit\"><input type=\"text\" value=\""+doctor['PHONE_NUMBER']+"\"></td></tr>");
		$tbody.append("<tr><td>Academic title: </td><td class=\"tdDuringEdit\"><input type=\"text\" value=\""+doctor['ACADEMIC_TITLE']+"\"></td></tr>");
		$tbody.append("<tr><td>Admin Type: </td><td class=\"tdDuringEdit\"><input type=\"text\" value=\""+doctor['ADM_TYPE']+"\"></td></tr>");
		$tbody.append("<tr><td>Monday: </td><td>"+doctor['MONDAY']+"</td></tr>");
		$tbody.append("<tr><td>Tuesday: </td><td>"+doctor['TUESDAY']+"</td></tr>");
		$tbody.append("<tr><td>Wednesday: </td><td>"+doctor['WEDNESDAY']+"</td></tr>");
		$tbody.append("<tr><td>Thursday: </td><td>"+doctor['THURSDAY']+"</td></tr>");
		$tbody.append("<tr><td>Friday: </td><td>"+doctor['FRIDAY']+"</td></tr>");
		$tbody.append("<tr><td>Satruday: </td><td>"+doctor['SATURDAY']+"</td></tr>");
		$tbody.append("<tr><td>Sunday: </td><td>"+doctor['SUNDAY']+"</td></tr>");
		
		$table.append($tbody);
		$("#contentDescription").append($table);														//wstawiamy na strone tabele juz pelną
		
		$('html, body').animate({
			scrollTop: $("#doctorDetail").offset().top
		}, 1000);
	}
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
					else{
						let $table=$("<table></table>");																//tworzymy tabele
						$table.attr("id","doctorDetail");																//dajemy jej id
						$table.append("<thead><tr><th colspan=\"2\">Dane lekarza: "+json['EMAIL']+"</tr></thead>");		//wstawiamy do niej thead
						$tbody=$("<tbody></tbody>");
						$tbody.append("<tr><td>First Name: </td><td>"+json['FIRST_NAME']+"</td></tr>");					//i poszczególne dane
						$tbody.append("<tr><td>Last Name: </td><td>"+json['LAST_NAME']+"</td></tr>");
						$tbody.append("<tr><td>Address: </td><td>"+json['ADDRESS']+"</td></tr>");
						$tbody.append("<tr><td>Phone Number: </td><td>"+json['PHONE_NUMBER']+"</td></tr>");
						$tbody.append("<tr><td>Academic Title </td><td>"+json['ACADEMIC_TITLE']+"</td></tr>");
						$tbody.append("<tr><td>Admin Type</td><td>"+json['ADM_TYPE']+"</td></tr>");
						$tbody.append("<tr><td>Monday: </td><td>"+json['MONDAY']+"</td></tr>");
						$tbody.append("<tr><td>Tuesday: </td><td>"+json['TUESDAY']+"</td></tr>");
						$tbody.append("<tr><td>Wednesday: </td><td>"+json['WEDNESDAY']+"</td></tr>");
						$tbody.append("<tr><td>Thursday: </td><td>"+json['THURSDAY']+"</td></tr>");
						$tbody.append("<tr><td>Friday: </td><td>"+json['FRIDAY']+"</td></tr>");
						$tbody.append("<tr><td>Satruday: </td><td>"+json['SATURDAY']+"</td></tr>");
						$tbody.append("<tr><td>Sunday: </td><td>"+json['SUNDAY']+"</td></tr>");
						
						$table.append($tbody);
						$("#contentDescription").append($table);														//wstawiamy na strone tabele juz pelną
						
						$('html, body').animate({
							scrollTop: $("#doctorDetail").offset().top
						}, 1000);
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
}


function addDoctor(){
	$("#contentTitle").append("<hr>");																//dajemy se kreske 
	$("#contentTitle").append("<h1><i class=\"fas fa-list-ul\"></i> Dodanie lekarza</h1>");	//ustawiamy tytuł
	$h3=$("<h3>Brak Lekarzy</h3>");
	$h3.css({
		'display':'block',
		'width':'20%',
		'margin':'auto'
	});
	$("#contentDescription").append($h3);	
	isSomeoneActive=true;
}