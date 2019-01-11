$('#logoutButton').on('click', function(){
    localStorage.setItem('messageSuccess', 'Pomyślnie wylogowano.')
	location.href="../logout.php";
});