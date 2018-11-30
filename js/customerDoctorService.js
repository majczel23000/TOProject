// PLIK ZAWIERA FUNCKJE DO WYŚWIETLANIA LISTY LEKARZY ORAZ DETALI KONKRETNEGO LEKARZA
// DLA ZALOGOWANEGO KLIENTA

// po załadowaniu strony, wykonujemy czynności związane z wyświetleniem listy lekarzy
$(window).on('load', function(){
   showDoctorsList(); 
});

// do przechowywania wszystkich zwróconych z bazy lekarzy
let doctorsList = [];

// otrzymuje od ajaxa wszystkich lekarzy i ich wyświetla
function showDoctorsList(){
    $.ajax({									
		type:"post",
		url:"getDoctorsData.php",
		dataType:"json",
		data:{
			accType:"customer",
			returnVal:"fullData" // parametr określa że chcemy liste lekarzy
		},
		beforeSend: function(){
			$('#doctorsList').css('opacity','0.6');
			$('#doctorsList').css('cursor','progress');
		},
		success: function(json){
            // w przypadku braku wyników
			if(json[0]==0){
				$tr=$("<tr><td colspan='4' style='padding: 20px 0px !important'>Brak lekarzy</td></tr>");
				$("#doctorsListTbody").append($tr);			
			}
			else if(json[0]==1){
				$tr=$("<tr><td colspan='4' style='padding: 20px 0px !important'>Brak lekarzy</td></tr>");
				$("#doctorsListTbody").append($tr);		
				console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				// wstawiamy otrzymaną tablicę lekarzy na stronę do <tbody></tbody>
				doctorsList = json;
				$tbody=$("#doctorsListTbody");
				for(let i=0;i<json.length;i++){
					$tr=$("<tr></tr>");
					$tr.html("<td style='width: 35%'>"+json[i]['FIRST_NAME']+"</td><td style='width: 35%'>"+
					json[i]['LAST_NAME']+"</td>"+
					"<td style='width: 30%'><button class='btnShowDoctorDetails'><i class='fas fa-info-circle' style='margin-right: 10px'></i>Szczegóły</button></td>");
					$tbody.append($tr);
				};
				createShowDoctorDetailsEvent();	
			}
			$('#doctorsList').css('opacity','1');
			$('#doctorsList').css('cursor','default');
		},
		error: function(e){
			console.warn(e);
			$('body').css('opacity','1');
			$('body').css('cursor','default');
		}
	});
}

// tworze Click Event dla każdego przycisku detali lekarza
function createShowDoctorDetailsEvent(){
	$('.btnShowDoctorDetails').each(function(index){
		$(this).on('click', function(){
			showSelectedDoctorDetails(doctorsList[index], $(this));
		});
	});
}

// pokazuje lub ukrywa szczegóły lekarza w zalezności od klasy
function showSelectedDoctorDetails(doctor, $obj){
	if($obj.hasClass('btnShowDoctorDetails')){
		$.ajax({									
			type:"post",
			url:"getDoctorsData.php",
			dataType:"json",
			data:{
				accType:"customer",
				returnVal:"detailsData", // parametr określa że chcemy detale lekarza
				email: doctor['EMAIL']
			},
			success: function(json){
				if(json==0){
					console.warn("WIĘCEJ LUB BRAK WYNIKÓW");
				}
				else if(json==1){		
					console.warn("BŁĄD POŁĄCZENIA");
				}
				else{
					showModalComponent('Szczegóły lekarza '+ doctor['FIRST_NAME'] + ' ' + doctor['LAST_NAME'], json);
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

let searchState = 'all';

// w trakcie wyszukiwania doktora w searchbox'ie
$("#searchDoctorInput").on('keyup', function(event){
	const val = $(this).val();
	if(val.length >= 3){
		showDoctorsWithPhrase(val);
		searchState = 'searched';
	} else {
		if(searchState === 'searched'){
			clearDoctorsList();
			showDoctorsList();
			searchState = 'all';
		}
	}
})

// czyszczenie listy lekarzy
function clearDoctorsList(){
	$("#doctorsListTbody").empty();	
}

// pokaz tylko lekarzy którzy zawierają podaną frazę w imieniu lub nazwisku
function showDoctorsWithPhrase(phrase){
	console.log(phrase);
	$.ajax({									
		type:"post",
		url:"getDoctorsData.php",
		dataType:"json",
		data:{
			accType:"customer",
			returnVal:"limitedData", // parametr określa że chcemy detale lekarzy o podanej nazwie
			phrase: phrase
		},
		success: function(json){
			if(json==0){
				clearDoctorsList();
				$tr=$("<tr><td colspan='4' style='padding: 20px 0px !important'>Brak lekarzy</td></tr>");
				$("#doctorsListTbody").append($tr);	
			}
			else if(json==1){
				clearDoctorsList();		
				$tr=$("<tr><td colspan='4' style='padding: 20px 0px !important'>Brak lekarzy</td></tr>");
				$("#doctorsListTbody").append($tr);	
				console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				// wstawiamy otrzymaną tablicę lekarzy na stronę do <tbody></tbody>
				doctorsList = json;
				clearDoctorsList();
				$tbody=$("#doctorsListTbody");
				for(let i=0;i<json.length;i++){
					$tr=$("<tr></tr>");
					$tr.html("<td style='width: 35%'>"+json[i]['FIRST_NAME']+"</td><td style='width: 35%'>"+
					json[i]['LAST_NAME']+"</td>"+
					"<td style='width: 30%'><button class='btnShowDoctorDetails'><i class='fas fa-info-circle' style='margin-right: 10px'></i>Szczegóły</button></td>");
					$tbody.append($tr);
				};
				createShowDoctorDetailsEvent();
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

// funkcja do tworzenia komponentu modala
function showModalComponent($titleText, $detailedDoctorData){
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
	$title.html("<i class='fas fa-info-circle' style='margin-right: 10px'></i>" + $titleText);
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

	// div na dane do wyswietlenia
	$message = $('<div></div>');
	$message.prop('id','messageModal');
	$message.css({
		'width': '100%',
		'height': '100%',
		'font-size': '1.1rem'
	});
	
	// dane do wyświetlenia
	$div = ('<div style="text-align: center; float:left; width: 50%; padding: 10px 0px">Numer telefonu:</div>');
	$div2 = ('<div style="text-align: center; float:left; width: 50%; padding: 10px 0px">' + $detailedDoctorData['PHONE_NUMBER'] + '</div>');
	$message.append($div);
	$message.append($div2);
	$div = ('<div style="text-align: center; float:left; width: 50%; padding: 10px 0px">Tytuł akademicki:</div>');
	$div2 = ('<div style="text-align: center; float:left; width: 50%; padding: 10px 0px">' + $detailedDoctorData['ACADEMIC_TITLE'] + '</div>');
	$message.append($div);
	$message.append($div2);

	// godziny przyjęć do wyświetlenia
	$clear = ('<div class="clear"></div>');
	$message.append($clear);
	$divAdmHTitle = ('<div style="text-align: center; width: 100%; padding: 20px 0px; background: #e6e6e6; color: #333">Godziny przyjęć</div>');
	$monday = ('<div class="admissionHours">Poniedziałek:</div>');
	$tuesday = ('<div class="admissionHours">Wtorek:</div>');
	$wednesday = ('<div class="admissionHours">Środa:</div>');
	$thursday = ('<div class="admissionHours">Czwartek:</div>');
	$friday = ('<div class="admissionHours">Piątek:</div>');
	$saturday = ('<div class="admissionHours">Sobota:</div>');
	$sunday = ('<div class="admissionHours">Niedziela:</div>');
	// jeśli jest puste (czyli nie ma godzin), to trzeba wyświetlić Brak przyjęć
	if($detailedDoctorData['MONDAY'] === '' || $detailedDoctorData['MONDAY'] === undefined)
		$detailedDoctorData['MONDAY'] = 'Brak przyjęć';
	if($detailedDoctorData['TUESDAY'] === '' || $detailedDoctorData['TUESDAY'] === undefined)
		$detailedDoctorData['TUESDAY'] = 'Brak przyjęć';
	if($detailedDoctorData['WEDNESDAY'] === '' || $detailedDoctorData['WEDNESDAY'] === undefined)
		$detailedDoctorData['WEDNESDAY'] = 'Brak przyjęć';
	if($detailedDoctorData['THURSDAY'] === '' || $detailedDoctorData['THURSDAY'] === undefined)
		$detailedDoctorData['THURSDAY'] = 'Brak przyjęć';
	if($detailedDoctorData['FRIDAY'] === '' || $detailedDoctorData['FRIDAY'] === undefined)
		$detailedDoctorData['FRIDAY'] = 'Brak przyjęć';
	if($detailedDoctorData['SATURDAY'] === '' || $detailedDoctorData['SATURDAY'] === undefined)
		$detailedDoctorData['SATURDAY'] = 'Brak przyjęć';
	if($detailedDoctorData['SUNDAY'] === '' || $detailedDoctorData['SUNDAY'] === undefined)
		$detailedDoctorData['SUNDAY'] = 'Brak przyjęć';
	$div1 = ('<div class="admissionHours">' + $detailedDoctorData['MONDAY'] + '</div>');
	$div2 = ('<div class="admissionHours">' + $detailedDoctorData['TUESDAY'] + '</div>');
	$div3 = ('<div class="admissionHours">' + $detailedDoctorData['WEDNESDAY'] + '</div>');
	$div4 = ('<div class="admissionHours">' + $detailedDoctorData['THURSDAY'] + '</div>');
	$div5 = ('<div class="admissionHours">' + $detailedDoctorData['FRIDAY'] + '</div>');
	$div6 = ('<div class="admissionHours">' + $detailedDoctorData['SATURDAY'] + '</div>');
	$div7 = ('<div class="admissionHours">' + $detailedDoctorData['SUNDAY'] + '</div>');
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
	
	// wrzucam dane i godziny przyjęć do wyświetlenia
	$content.append($message);

	// po kliknięciu gdziekolwiek poza content znika modal
	$container.on('click', function(){
		$container.fadeOut(150,function(){$container.remove();});
	}).children().click(function() {
		return false;
	});
	// po kliknięciu 'X' także znika
	$closeButton.on('click', function(){
		$container.fadeOut(150,function(){$container.remove();});
	})
}