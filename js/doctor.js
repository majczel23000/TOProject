$('#logoutButton').on('click', function(){
    localStorage.setItem('messageSuccess', 'Pomyslnie wylogowano.')
	location.href="../logout.php";
});