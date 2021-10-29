$('#display-text').html('<h1>hello world</h1>');

$('#login').click(function(){ 
	data = {
		'username': $('#username').val(),
		'password': $('#password').val()
	}
	
	$.ajax({
		type: "POST",
		url: '/api/users/login',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			
			// extract token from data
		    const { token } = data;
		    // store the token in the localStorage
		    localStorage.setItem("jwtToken", token);

			window.location.href = "/feed";
		},
		error: function (jqXhr, textStatus, errorMessage) {
			alert(jqXhr.responseText);
		}
	});
});
