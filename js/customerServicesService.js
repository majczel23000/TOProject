servicesList = [];

// po załadowaniu strony
$(window).on('load', function(){
    showServicesList(); 
});

function showServicesList(){
    $.ajax({									
		type:"post",
		url:"getServicesData.php",
		dataType:"json",
		data:{
            accType:"customer",
            returnVal:"fullData"    // określa że chcemy wszystkie usługi
		},
		success: function(json){
			// w przypadku braku wyników
			if(json[0]==0){
				$tr=$("<tr><td colspan='3'>Brak usług</td></tr>");
				$("#servicesListTbody").append($tr);			
			}
			else if(json[0]==1){
				$tr=$("<tr><td colspan='3'>Brak usług</td></tr>");
				$("#servicesListTbody").append($tr);		
				console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				// wstawiamy otrzymaną tablicę usług na stronę do <tbody></tbody>
				servicesList = json;
				$tbody=$("#servicesListTbody");
				for(let i=0;i<json.length;i++){
					$tr=$("<tr></tr>");
					$tr.html("<td style=\"width: 25%\">"+json[i]['NAME']+"</td><td style=\"width: 20%\">"+
					json[i]['PRICE']+" zł</td><td style=\"width: 55%\">"+json[i]['DESCRIPTION']+"</td>");
					//$tr.addClass('singleAnimalRow');
					$tbody.append($tr);
				};
			}
		},
		error: function(e){
			console.warn(e);
		}
	});
}

let searchState = 'all';

// w trakcie wyszukiwania doktora w searchbox'ie
$("#searchServiceInput").on('keyup', function(event){
	const val = $(this).val();
	if(val.length >= 3){
		showServicesWithPhrase(val);
		searchState = 'searched';
	} else {
		if(searchState === 'searched'){
			clearServicesList();
			showServicesList();
			searchState = 'all';
		}
	}
})

// czyszczenie listy lekarzy
function clearServicesList(){
	$("#servicesListTbody").empty();	
}

function showServicesWithPhrase(phrase){
	// console.log(phrase);
	$.ajax({									
		type:"post",
		url:"getServicesData.php",
		dataType:"json",
		data:{
			accType:"customer",
			returnVal:"limitedData", // parametr określa że chcemy usługi o podanej nazwie
			phrase: phrase
		},
		success: function(json){
            clearServicesList();
			if(json[0]==0){
				$tr=$("<tr><td colspan='3'>Brak usług</td></tr>");
				$("#servicesListTbody").append($tr);			
			}
			else if(json[0]==1){
				$tr=$("<tr><td colspan='3'>Brak usług</td></tr>");
				$("#servicesListTbody").append($tr);		
				console.warn("BŁĄD POŁĄCZENIA");
			}
			else{
				// wstawiamy otrzymaną tablicę usług na stronę do <tbody></tbody>
				servicesList = json;
				$tbody=$("#servicesListTbody");
				for(let i=0;i<json.length;i++){
					$tr=$("<tr></tr>");
					$tr.html("<td style=\"width: 25%\">"+json[i]['NAME']+"</td><td style=\"width: 20%\">"+
					json[i]['PRICE']+" zł</td><td style=\"width: 55%\">"+json[i]['DESCRIPTION']+"</td>");
					//$tr.addClass('singleAnimalRow');
					$tbody.append($tr);
				};
			}
		},
		error: function(e){
			console.warn(e);
		}
	});
}