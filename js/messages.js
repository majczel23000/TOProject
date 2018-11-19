$(window).on('load',function(){
	if(localStorage.getItem('messageSuccess')){
		$message = $('#messagesInfo');
        $messageBox = $('#messages');
        $messageBox.css('display','block');
		$messageBox.prop('class','messageSuccess');
        $message.html(localStorage.getItem('messageSuccess'));
        localStorage.removeItem('messageSuccess');
    } else if(localStorage.getItem('messageError')){
        $message = $('#messagesInfo');
        $messageBox = $('#messages');
        $messageBox.css('display','block');
		$messageBox.prop('class','messageError');
        $message.html(localStorage.getItem('messageError'));
        localStorage.removeItem('messageError');
    }
});

$('#messagesCloseIcon').on("click", function(){
    $("#messages").css('display',"none");
});