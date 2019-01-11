$("#showPetsList").on('click',function(){									//po kliknieciu pokaż liste wszystkich zwierząt
	$.ajax({									
		type:"post",
		url:"petsService.php",
		dataType:"json",
		data:{
			accType:"doctor",
			returnVal:"fullData"											//określa, ze chcemy wszystkie zwierzeta
		},
		beforeSend: function(){
			$('body').css('opacity','0.6');
			$('body').css('cursor','progress');
		},
		success: function(json){
			if(json[0]==0 || json==1){													//jesli zero wyników lub błąd połaczenia (1)
				$("#contentTitle").append("<hr>");																//dajemy se kreske 
				$("#contentTitle").append("<h1><i class=\"fas fa-list-ul\"></i> Lista leków</h1>");	//ustawiamy tytuł
				$h3=$("<h3>Brak zwierząt</h3>");
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
				$("#contentTitle").append("<h1><i class=\"fas fa-list-ul\"></i> Lista zwierząt</h1>");			//ustawiamy tytuł
				let $table=$("<table></table>");																//tworzymy tabele
				$table.attr("id","petsList");																//dajemy jej id
				$table.append("<thead><tr><th>Imię</th><th>Właściciel</th><th>Gatunek</th><th>Rasa</th><th>Szczegóły</th></tr></thead>");	//wstawiamy do niej thead
				$tbody=$("<tbody></tbody>");
				for(let i=0;i<json.length;i++){
					$tr=$("<tr></tr>");
					$tr.html("<td>"+json[i]['NAME']+"</td><td>"+json[i]['FIRST_NAME_OWNER']+" "+json[i]['LAST_NAME_OWNER']+"</td><td>"+json[i]['SPECIES']+"</td><td>"+json[i]['RACE']+"</td>");
					$tdEdit = $("<td><i class=\"fas fa-info\"></i></td>")			//komórka do klikniecia w celu wyswietlenia sczegółów
					$tdEdit.attr('value',i);						//zapisujemy id, zeby nie pobierać znowu z bazy
					$tdEdit.on('click',function(){showPetDetail(json[$(this).attr('value')])});  
					$tr.append($tdEdit);
					$tbody.append($tr);
				}
				$table.append($tbody);
				$("#contentDescription").append($table);														//wstawiamy na strone tabele juz pelną
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
	$(this).attr('class','btn btnMenu active-btn');							//ustawiamy ten przycisk aktywny
});

function showPetDetail(pet){
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
	$petDetail = $('<div></div>');
	$petDetail.prop('id','petDetailInList');
	$petDetail.css({
		'position':'absolute',
		'top':'50%',
		'left':'50%',
		'width':'500px',
		'padding': '20px 50px',
		'background':'#ff850c',
		'margin-left':'-270px',
		'margin-top':'-200px',
		'border-radius': '5px',
		'box-shadow': '0px 0px 5px 0px rgba(0,0,0,0.75)'
	});	
	$container.append($petDetail);

	// tytuł modala
	$title = $('<div></div>');
	$title.prop('id','titlepetDetail');
	$title.css({
		'width': '440px',
		'float': 'left',
		'padding': '10px 20px 20px 20px',
		'background':'#ff850c',
		'font-size':'1.3rem'
	});
	$title.html("<i class='fas fa-info-circle' style='margin-right: 10px'></i>" + pet['NAME']);
	$petDetail.append($title);

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
	$petDetail.append($closeButton);

	// div na dane do wyswietlenia
	$message = $('<div></div>');
	$message.prop('id','messagePetDetail');
	$message.css({
		'width': '100%',
		'height': '100%',
		'font-size': '1.1rem'
	});
	
	// dane do wyświetlenia
	$div = ('<div style="float:left; width: 50%; padding: 10px 0px">Właściciel:</div>');
	$div2 = ('<div style="float:left; width: 50%; padding: 10px 0px">' +pet['FIRST_NAME_OWNER']+" "+pet['LAST_NAME_OWNER']+ '</div>');
	$message.append($div);
	$message.append($div2);
	$div = ('<div style="float:left; width: 50%; padding: 10px 0px">Gatunek:</div>');
	$div2 = ('<div style="float:left; width: 50%; padding: 10px 0px">' + pet['SPECIES'] + '</div>');
	$message.append($div);
	$message.append($div2);
	$div = ('<div style="float:left; width: 50%; padding: 10px 0px">Rasa:</div>');
	$div2 = ('<div style="float:left; width: 50%; padding: 10px 0px">' + pet['RACE'] + '</div>');
	$message.append($div);
	$message.append($div2);
	$div = ('<div style="float:left; width: 50%; padding: 10px 0px">Płeć:</div>');
	let gender = '';
	if(pet['GENDER'] === 'MALE')
		gender = 'Samiec';
	else
		gender = 'Samica';
	$div2 = ('<div style="float:left; width: 50%; padding: 10px 0px">' + gender + '</div>');
	$message.append($div);
	$message.append($div2);
	$div = ('<div style="float:left; width: 50%; padding: 10px 0px">Data urodzenia:</div>');
	$div2 = ('<div style="float:left; width: 50%; padding: 10px 0px">' + pet['BIRTH_DATE'] + '</div>');
	$message.append($div);
	$message.append($div2);
	$div = ('<div style="float:left; width: 50%; padding: 10px 0px">Wzrost:</div>');
	$div2 = ('<div style="float:left; width: 50%; padding: 10px 0px">' + pet['HEIGHT'] + '</div>');
	$message.append($div);
	$message.append($div2);
	$div = ('<div style="float:left; width: 50%; padding: 10px 0px">Waga:</div>');
	$div2 = ('<div style="float:left; width: 50%; padding: 10px 0px">' + pet['WEIGHT'] + '</div>');
	$message.append($div);
	$message.append($div2);
	
	$petDetail.append($message);

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