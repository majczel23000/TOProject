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

function deleteContent(name){											//funkcja usuwa aktualny kontant, a paramtert mówi, który przycisk został aktywowany
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
			editDoctorData();
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
	$("#contentTitle").append("<hr>");																//dajemy se kreske 
	$("#contentTitle").append("<h1><i class=\"fas fa-list-ul\"></i> Lista Lekarzy kliniki</h1>");	//ustawiamy tytuł
	$h3=$("<h3>Brak Lekarzy</h3>");
	$h3.css({
		'display':'block',
		'width':'20%',
		'margin':'auto'
	});
	$("#contentDescription").append($h3);	
	isSomeoneActive=true;
}

function editDoctorData(){
	$("#contentTitle").append("<hr>");																//dajemy se kreske 
	$("#contentTitle").append("<h1><i class=\"fas fa-list-ul\"></i> Edycja danych lekarza</h1>");	//ustawiamy tytuł
	$h3=$("<h3>Brak Lekarzy</h3>");
	$h3.css({
		'display':'block',
		'width':'20%',
		'margin':'auto'
	});
	$("#contentDescription").append($h3);	
	isSomeoneActive=true;
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