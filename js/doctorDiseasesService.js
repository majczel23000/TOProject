let isSomeoneActive = false;												//czy jest obsługwana jakaś funkcja 
$("#showDiseasesList").on('click',function(){									//po kliknieciu pokaż liste wszystkich lekarzy
	if(isSomeoneActive)														//jesli juz jest cos aktywnego
		deleteContent("showDiseasesList");
	else
		showDiseasesList();													//jesli nie ma nic aktywnego]
	$(this).attr('class','btn btnMenu active-btn');							//ustawiamy ten przycisk aktywny
});

$("#addDisease").on('click',function(){										//dodanie nowego lekarza
	if(isSomeoneActive)														
		deleteContent("addDisease");
	else
		addDisease();												
	$(this).attr('class','btn btnMenu active-btn');
});

function deleteContent(name,val){											//funkcja usuwa aktualny kontant, a paramtert mówi, który przycisk został aktywowany
	$('#doctorSubMenu a').each(function(){									//resetujemy wszystkie przyciski
		$(this).attr('class','btn btnMenu');
	});
	$("#contentTitle").html("");											//czyścimy środek tytułu
	$("#contentDescription").html("");										//to samo dla cotnentu
	switch (name){															//teraz od name zależy co pokażemy
		case "showDiseasesList":
			showDiseasesList();
			break;
		case "addDisease":
			addDisease();
			break;
		default:
			console.warn("err");
			break;
	}
}

function showDiseasesList(){
	$.ajax({									
		type:"post",
		url:"diseasesService.php",
		dataType:"json",
		data:{
			accType:"doctor",
			returnVal:"fullData"											//określa czy chcemy całe czy tylko jeden lek
		},
		beforeSend: function(){
			$('body').css('opacity','0.6');
			$('body').css('cursor','progress');
		},
		success: function(json){
			if(json[0]==0 || json==1){													//jesli zero wyników lub błąd połaczenia (1)
				$("#contentTitle").append("<hr>");																//dajemy se kreske 
				$("#contentTitle").append("<h1><i class=\"fas fa-list-ul\"></i> Lista chorób</h1>");	//ustawiamy tytuł
				$h3=$("<h3>Brak chorób</h3>");
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
				$("#contentTitle").append("<h1><i class=\"fas fa-list-ul\"></i> Lista chorób</h1>");			//ustawiamy tytuł
				let $table=$("<table></table>");																//tworzymy tabele
				$table.attr("id","diseasesList");																//dajemy jej id
				$table.append("<thead><tr><th>Nazwa</th><th>Symptomy</th><th>Leczenie</th><th>Status</th><th>Edytuj</th></tr></thead>");	//wstawiamy do niej thead
				$tbody=$("<tbody></tbody>");
				for(let i=0;i<json.length;i++){
					let tmpStatus="Aktywna";																	//zeby było po polsku
					if(json[i]['STATUS']=="INACTIVE")
						tmpStatus="Nieaktywna"
					$tr=$("<tr></tr>");
					$tr.html("<td>"+json[i]['NAME']+"</td><td>"+json[i]['SYMPTOMS']+"</td><td>"+json[i]['TREATMENT']+"</td><td>"+tmpStatus+"</td>");
					$tdEdit = $("<td><i class=\"fas fa-edit\"></i></td>")			//komórka do klikniecia w celu edycji
					$tdEdit.attr('value',i);						//zapisujemy id, zeby nie pobierać znowu z bazy
					$tdEdit.on('click',function(){showDiseaseDetail(json[$(this).attr('value')])});  
					$tr.append($tdEdit);
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
//pokazuje okienko do edycji leku
function showDiseaseDetail(disease){
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
	$editingDisease = $('<div></div>');
	$editingDisease.prop('id','editingDisease');
	$editingDisease.css({
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
	$container.append($editingDisease);

	// tytuł modala
	$title = $('<div></div>');
	$title.prop('id','titleDiseaseDetail');
	$title.css({
		'width': '440px',
		'float': 'left',
		'padding': '10px 20px 20px 20px',
		'background':'#ff850c',
		'font-size':'1.3rem'
	});
	$title.html("<i class='fas fa-info-circle' style='margin-right: 10px'></i>" + disease['NAME']);
	$editingDisease.append($title);

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
	$editingDisease.append($closeButton);

	// div na dane do wyswietlenia
	$message = $('<div></div>');
	$message.prop('id','messageDiseaseDetail');
	$message.css({
		'width': '100%',
		'height': '100%',
		'font-size': '1.1rem'
	});
	
	// dane do wyświetlenia
	$div = ('<div style="float:left; font-weight:600;text-align:center; width: 100%; padding: 10px 0px">Nazwa:</div>');
	$div2 = ('<div style="float:left; width: 100%;"><input id="diseaseName" class="disease-edit" style="padding: 10px 0px" type="text" value="'+disease['NAME']+'"></div>');
	$message.append($div);
	$message.append($div2);
	$div = ('<div style="float:left; font-weight:600;text-align:center; width: 100%; padding: 10px 0px">Objawy:</div>');
	$div2 = ('<div style="float:left; width: 100%;"><textarea id="diseaseSymptoms" class="disease-edit" rows="4" style="padding: 10px 0px">'+disease['SYMPTOMS']+'</textarea></div>');
	$message.append($div);
	$message.append($div2);
	$div = ('<div style="float:left; font-weight:600;text-align:center; width: 100%; padding: 10px 0px">Leczenie:</div>');
	$div2 = ('<div style="float:left; width: 100%;"><textarea id="diseaseTreatment" class="disease-edit" rows="6" style="padding: 10px 0px">'+disease['TREATMENT']+'</textarea></div>');
	$message.append($div);
	$message.append($div2);
	let select="";
	if(disease['STATUS']=="ACTIVE")
		select="<select class=\"select-disease-edit\" id=\"diseaseStatus\"><option value=\"ACTIVE\">Aktywny</option><option value=\"INACTIVE\">Nieaktywny</option></select>";
	else
		select="<select class=\"select-disease-edit\" id=\"diseaseStatus\"><option value=\"INACTIVE\">Nieaktywny</option><option value=\"ACTIVE\">Aktywny</option></select>";
	$div = ('<div style="float:left; font-weight:600;text-align:center; width: 100%; padding: 10px 0px">Status:</div>');
	$div2 = ('<div style="float:left; width: 100%;">'+select+'</div>');
	$message.append($div);
	$message.append($div2);
	
	// godziny przyjęć do wyświetlenia
	$clear = ('<div class="clear" style="margin-bottom:10px"></div>');
	$message.append($clear);
	
	$editingDisease.append($message);
	$editButton=$("<span style=\"display:block;text-align:center;margin:auto\" class=\"btnEdit\">Zapisz zmiany</span>");
	$editButton.on('click',function(){											//przycisk zapisania zmiany		
		const diseaseName=$('#diseaseName').val();							//pobieramy wartosci
		const diseaseSymptoms=$('#diseaseSymptoms').val();
		const diseaseTreatment=$('#diseaseTreatment').val();
		const diseaseStatus=$('#diseaseStatus').val();
		const diseaseID=disease['DIS_ID'];

		$.ajax({									
			type:"post",
			url:"diseasesService.php",
			dataType:"json",
			data:{
				accType:"doctor",
				returnVal:"editingDisease",											//określa czy chcemy całe czy tylko jeden lek
				diseaseName:diseaseName,
				diseaseSymptoms:diseaseSymptoms,
				diseaseTreatment:diseaseTreatment,
				diseaseStatus:diseaseStatus,
				diseaseID:diseaseID													//potrzebne, aby wiedzieć, który lek edytujemy
			},
			beforeSend: function(){
				$('body').css('opacity','0.6');
				$('body').css('cursor','progress');
			},
			success: function(json){
				console.log(json);
				if(json=="success"){
					$('#opacityContainer').remove();
					$('#doctorSubMenu a').each(function(){															//resetujemy wszystkie przyciski
						$(this).attr('class','btn btnMenu');
					});
					$("#contentTitle").html("");																	//czyścimy środek tytułu
					$("#contentDescription").html("Zmiany zostały zapisane.");										//to samo dla cotnentu
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
	})
	$editingDisease.append($editButton);
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
//dodaje chorobe
function addDisease(){
	$("#contentTitle").append("<hr>");																//dajemy se kreske 
	$("#contentTitle").append("<h1><i class=\"fas fa-plus\"></i> Dodanie choroby</h1>");	//ustawiamy tytuł
	let $table=$("<table></table>");																//tworzymy tabele
	$table.attr("id","addDiseaseTable");																//dajemy jej id
	$table.append("<thead><tr><th colspan=\"2\" \"><i class=\"fas fa-plus\"></i> Dodanie choroby</tr></thead>");		//tworzymy głowe
	$tbody=$("<tbody></tbody>");
	$tbody.append("<tr><td>Nazwa: </td><td class=\"tdDuringEdit\"><input id=\"diseaseName\" type=\"text\"></td></tr>");	//i poszczególne inputy
	$tbody.append("<tr><td>Objawy: </td><td class=\"tdDuringEdit\"><textarea id=\"diseaseSymptoms\" class=\"medicine-edit\" rows=\"3\" style=\"width:92%;text-align:left;padding: 10px 4%\"></textarea></td></tr>");
	$tbody.append("<tr><td>Leczenie: </td><td class=\"tdDuringEdit\"><textarea id=\"diseaseTreatment\" class=\"medicine-edit\" rows=\"6\" style=\"width:92%;text-align:left;padding: 10px 4%\"></textarea></td></tr>");
	$table.append($tbody);
	$("#contentDescription").append($table);														//wstawiamy na strone tabele juz pelną	
	$addButton=$("<span style=\"display:block;width:75%;text-align:center;margin:auto;margin-top:10px;\" class=\"btnEdit\">Dodaj chorobe</span>");
	$addButton.on('click',function(){											//przycisk zapisania zmiany		
		const diseaseName=$('#diseaseName').val();							//pobieramy wartosci
		const diseaseSymptoms=$('#diseaseSymptoms').val();
		const diseaseTreatment=$('#diseaseTreatment').val();
		
		if(diseaseName!="" && diseaseSymptoms!="" && diseaseTreatment!=""){
			$.ajax({									
				type:"post",
				url:"diseasesService.php",
				dataType:"json",
				data:{
					accType:"doctor",
					returnVal:"addingDisease",											//określa co robimy
					diseaseName:diseaseName,
					diseaseSymptoms:diseaseSymptoms,
					diseaseTreatment:diseaseTreatment								
				},
				beforeSend: function(){
					$('body').css('opacity','0.6');
					$('body').css('cursor','progress');
				},
				success: function(json){
					if(json=="success"){
						$('#opacityContainer').remove();
						$('#doctorSubMenu a').each(function(){															//resetujemy wszystkie przyciski
							$(this).attr('class','btn btnMenu');
						});
						$("#contentTitle").html("");																	//czyścimy środek tytułu
						$("#contentDescription").html("Choroba została pomyślnie dodana.");										//to samo dla cotnentu
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
			if($('#disease-err').length>0)
				$('#disease-err').remove();
			$("#contentDescription").append('<span id="disease-err" style="color:#b26060">Proszę wypełnić wszystkie pola.</span>');
		}
	})
	$("#contentDescription").append($addButton);
	isSomeoneActive=true;
}