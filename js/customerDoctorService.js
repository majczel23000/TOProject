// po załadowaniu strony, wykonujemy czynności związane z wyświetleniem listy lekarzy
$(window).on('load', function(){
   showDoctorsList(); 
});

let doctorsList = [];

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
			$('body').css('opacity','0.6');
			$('body').css('cursor','progress');
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
				console.log(doctorsList);
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
				returnVal:"detailsData", // parametr określa że chcemy liste lekarzy
				email: doctor['EMAIL']
			},
			beforeSend: function(){
				$('body').css('opacity','0.6');
				$('body').css('cursor','progress');
			},
			success: function(json){
				// w przypadku braku wyników
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