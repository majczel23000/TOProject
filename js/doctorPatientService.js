let isSomeoneActive = false;												//czy jest obsługwana jakaś funkcja 
$("#showCustomerList").on('click',function(){								//po kliknieciu "pokaż liste wszystkich klientów
	if(isSomeoneActive)														//jesli juz jest cos aktywnego
		deleteContent("showCustomerList");
	else
		showCustomerList();													//jesli nie ma nic aktywnego]
	$(this).attr('class','btn btnMenu active-btn');							//ustawiamy ten przycisk aktywny
});

$("#showCustomerDetail").on('click',function(){								//po kliknieciu "pokaż liste wszystkich klientów
	if(isSomeoneActive)														//jesli juz jest cos aktywnego
		deleteContent("showCustomerDetail");
	else
		showCustomerDetail();												//jesli nie ma nic aktywnego
	$(this).attr('class','btn btnMenu active-btn');
});

function deleteContent(name){												//funkcja usuwa aktualny kontant, a paramtert mówi, który przycisk został aktywowany i na tej pdostawie wywołuje
	$('#doctorSubMenu a').each(function(){									//resetujemy wszystkie przyciski
		$(this).attr('class','btn btnMenu');
	});
	$("#contentDescription").children().fadeOut( "slow", function() {		//odpowiednią funkcje; fadeOut, powoduje efekt zanikania, drugi paramter fateOut okresla co ma sie stać po zakończeniu animacji
		$("#contentTitle").html("");										//czyścimy środek tytułu
		//$("#contentTitle").children().remove();							//tutaj usuwanie tytułu, ale tak, aby nie usunać div'a, wiec daltego "children"
		$("#contentDescription").html("");									//to samo dla cotnentu
		//$("#contentDescription").children().remove();						
		switch (name){														//teraz od name zależy co pokażemy
			case "showCustomerList":
				showCustomerList();
				break;
			case "showCustomerDetail":
				showCustomerDetail();
				break;
			default:
				console.warn("err");
				break;
		}
	 });	
	 $("#contentTitle").children().fadeOut( "slow");						//efekt zanikania, najpierw zrobi się to, a dopiero potem usunie
}

function showCustomerList(){												//tutaj funkcja pobierająca dane o klientach
	$.ajax({									
		type:"post",
		url:"getPatientsData.php",
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
			if(json[0]==0){													//jesli zero wyników
				$("#contentTitle").append("<hr>");																//dajemy se kreske 
				$("#contentTitle").append("<h1><i class=\"fas fa-list-ul\"></i> Lista Klientów kliniki</h1>");	//ustawiamy tytuł
				$("#contentTitle").fadeOut(1);
				$h3=$("<h3>Brak klientów</h3>");
				$h3.css({
					'display':'block',
					'width':'20%',
					'margin':'auto'
				});
				$("#contentDescription").append($h3);															//wstawiamy na strone tabele juz pelną
				$h3.fadeOut(1);																					//szybko ją ukrywamy
				$h3.fadeIn("slow");																				//i teraz powoli rozwijamy tytuł i content
				$("#contentTitle").fadeIn("slow");				
			}
			else if(json[0]==1){																				//jeśli złe połączenie
				$("#contentTitle").append("<hr>");																//dajemy se kreske 
				$("#contentTitle").append("<h1><i class=\"fas fa-list-ul\"></i> Lista Klientów kliniki</h1>");	//ustawiamy tytuł
				$("#contentTitle").fadeOut(1);
				$h3=$("<h3>Brak klientów</h3>");
				$h3.css({
					'display':'block',
					'width':'20%',
					'margin':'auto'
				});
				$("#contentDescription").append($h3);															//wstawiamy na strone tabele juz pelną
				$h3.fadeOut(1);																					//szybko ją ukrywamy
				$h3.fadeIn("slow");																				//i teraz powoli rozwijamy tytuł i content
				$("#contentTitle").fadeIn("slow");	
				console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				$("#contentTitle").append("<hr>");																//dajemy se kreske 
				$("#contentTitle").append("<h1><i class=\"fas fa-list-ul\"></i> Lista Klientów kliniki</h1>");	//ustawiamy tytuł
				$("#contentTitle").fadeOut(1);																	//i szybko go ukrywamy, aby potem ładnie rozwinac
				let $table=$("<table></table>");																									//tworzymy tabele
				$table.attr("id","customerList");																									//dajemy jej id
				$table.append("<thead><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Address</th><th>Phone Number</th></tr></thead>");	//wstawiamy do niej thead
				$tbody=$("<tbody></tbody>");
				for(let i=0;i<json.length;i++){
					$tr=$("<tr></tr>");
					$tr.html("<td>"+json[i]['FIRST_NAME']+"</td><td>"+json[i]['LAST_NAME']+"</td><td>"+json[i]['EMAIL']+"</td><td>"+json[i]['ADDRESS']+"</td><td>"+json[i]['PHONE_NUMBER']+"</td>");
					$tbody.append($tr);
				}
				$table.append($tbody);
				$("#contentDescription").append($table);														//wstawiamy na strone tabele juz pelną
				$table.fadeOut(1);																				//szybko ją ukrywamy
				$table.fadeIn("slow");																			//i teraz powoli rozwijamy tytuł i content
				$("#contentTitle").fadeIn("slow",function(){
					$('tr').each(function(){
						$span=$("<span></span>");
						$span.html("+");
						$span.attr('class','show-detail');
						$span.css({
							'top': $(this).offset().top,
							'left': $(this).offset().left + $(this).outerWidth()
						});
						$('body').append($span);
					});
				});	
			}
			$('body').css('opacity','1');
			$('body').css('cursor','default');
			isSomeoneActive=true;																	// !!!!!!!!!! zmieniać gdy jest wyswietlone, bo potem sie psuje!
		},
		error: function(e){
			console.warn(e);
			$('body').css('opacity','1');
			$('body').css('cursor','default');
		}
	});
}

function showCustomerDetail(){
	$("#contentTitle").append("<hr>");																			//dajemy se kreske 
	$("#contentTitle").append("<h1><i class=\"fas fa-info-circle\"></i> Szczegółowe dane klienta</h1>");		//ustawiamy tytuł
	$("#contentTitle").fadeOut(1);
	$h3=$("<h3>Brak klientów</h3>");
	$h3.css({
		'display':'block',
		'width':'20%',
		'margin':'auto'
	});
	$("#contentDescription").append($h3);							//wstawiamy na strone tabele juz pelną
	$h3.fadeOut(1);																	//szybko ją ukrywamy
	$h3.fadeIn("slow");																//i teraz powoli rozwijamy tytuł i content
	$("#contentTitle").fadeIn("slow");
	
	isSomeoneActive=true;
}