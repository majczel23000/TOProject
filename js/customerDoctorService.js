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
				$tr=$("<tr><td colspan='4'>Brak lekarzy</td></tr>");
				$("#doctorsListTbody").append($tr);			
			}
			else if(json[0]==1){
				$tr=$("<tr><td colspan='4'>Brak lekarzy</td></tr>");
				$("#doctorsListTbody").append($tr);		
				console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				// wstawiamy otrzymaną tablicę lekarzy na stronę do <tbody></tbody>
				doctorsList = json;
				$tbody=$("#doctorsListTbody");
				for(let i=0;i<json.length;i++){
					$tr=$("<tr></tr>");
					$tr.html("<td>"+json[i]['FIRST_NAME']+"</td><td>"+
					json[i]['LAST_NAME']+"</td>"+
					"<td><button class='btnShowDoctorDetails'><i class='fas fa-caret-square-down' style='margin-right: 10px'></i>Pokaż szczegóły</button></td>");
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
			showHideSelectedDoctorDetails(doctorsList[index], $(this));
		});
	});
}

// pokazuje lub ukrywa szczegóły lekarza w zalezności od klasy
function showHideSelectedDoctorDetails(doctor, $obj){
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
					$tr=$("<tr></tr>");
					$td=$("<td colspan='3'></td>");
					for (var k in json){
						if (json.hasOwnProperty(k)) {
							let string = '';
							if(k == 'PHONE_NUMBER')
								string = 'Phone Number';
							else if(k == 'ACADEMIC_TITLE')
								string = 'Academic Title';
							else if(k == 'ADDRESS')
								string = 'Address';
							$div = ('<div style="float:left; width: 50%">' + string + '</div>');
							$div2 = ('<div style="float:left; width: 50%">' + json[k] + '</div>');
							$td.append($div);
							$td.append($div2);
						}
					}
					$tr.append($td);
					$tr.insertAfter($obj.parent().parent());																
					$obj.removeClass('btnShowDoctorDetails');
					$obj.addClass('btnHideDoctorDetails');
					$obj.html("<i class='fas fa-caret-square-up' style='margin-right: 10px'></i>Ukryj szczegóły");
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
	} else if($obj.hasClass('btnHideDoctorDetails')) {
		$obj.parent().parent().next().remove();
		$obj.addClass('btnShowDoctorDetails');
		$obj.removeClass('btnHideDoctorDetails');
		$obj.html("<i class='fas fa-caret-square-down' style='margin-right: 10px'></i>Pokaż szczegóły");
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
				$tr=$("<tr><td colspan='4'>Brak lekarzy</td></tr>");
				$("#doctorsListTbody").append($tr);	
			}
			else if(json==1){
				clearDoctorsList();		
				$tr=$("<tr><td colspan='4'>Brak lekarzy</td></tr>");
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
					$tr.html("<td>"+json[i]['FIRST_NAME']+"</td><td>"+
					json[i]['LAST_NAME']+"</td>"+
					"<td><button class='btnShowDoctorDetails'><i class='fas fa-caret-square-down' style='margin-right: 10px'></i>Pokaż szczegóły</button></td>");
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