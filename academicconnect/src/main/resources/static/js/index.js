$('#sign-up').click(function(){ 
	data = {
		'username': $('#username').val(),
		'firstName': $('#first-name').val(),
		'lastName': $('#last-name').val(),
		'password': $('#password').val(),
		'confirmPassword': $('#confirm-password').val()
	}
	
	$.ajax({
		type: "POST",
		url: '/api/users/register',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			alert('Registration success!')
			window.location.href = "/login";
		},
		error: function (jqXhr, textStatus, errorMessage) {
			alert(jqXhr.responseText);
		}
	});
});
