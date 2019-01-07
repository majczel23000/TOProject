// wysyłanie opini
let isClicked = false;
$("#btnSendOpinion").on('click', function(){
    isClicked = true;
    const textarea = $("#opinionText");
    if(!$("#btnSendOpinion").hasClass("btnAddVisitDisabled")){
        if(textarea.val() != "" && textarea.val().length >= 20) {
            errorService(false, "" , $('#opinionText').id + "Error");
            $("#btnSendOpinion").removeClass("btnAddVisitDisabled");
            console.log('send');
            textarea.val("");
            showMessage('Dziękujemy za wysłanie opini!', true);
        } else {
            errorService(true, "Minimalnie 20 znaków", $('#opinionText').id + "Error");
            $("#btnSendOpinion").addClass("btnAddVisitDisabled");
        }
    }
});

$('#opinionText').on('keyup', function(){
    if(isClicked){
        const textarea = $("#opinionText");
        if(textarea.val() != "" && textarea.val().length >= 20) {
            errorService(false, "" , $('#opinionText').id + "Error");
            $("#btnSendOpinion").removeClass("btnAddVisitDisabled");
        } else{
            errorService(true, "Minimalnie 20 znaków", $('#opinionText').id + "Error");
            $("#btnSendOpinion").addClass("btnAddVisitDisabled");
        }
    }
});

function errorService(action, msg, id){
    if(action) {
        $('#'+id).remove();
        $error = $('<span></span>');
        $error.prop('class','edit-data-error');
        $error.html(msg);
        $error.prop('id', id);
        $('#content').append($error);
        $('#trWithHours').remove();
    } else{
        $('#'+id).remove();
    }
}


function showMessage(msg, type){
	$message = $('#messagesInfo');
	$messageBox = $('#messages');
	$messageBox.css('display','block');
	if(type)
		$messageBox.prop('class','messageSuccess');
	else
	    $messageBox.prop('class','messageError');
	$message.html(msg);
}

$('#messagesCloseIcon').on("click", function(){
    $("#messages").css('display',"none");
});