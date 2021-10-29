$(document).ready(function(){
	const jwtToken = localStorage.jwtToken;

	if (jwtToken === undefined) {
		window.location.href = "/";
	} else {
		const decoded_jwtToken = JSON.stringify(parseJwt(jwtToken));
	  	const currentTime = Date.now() / 1000;
	  	if (decoded_jwtToken.exp < currentTime) {
	    	logout();
	    	window.location.href = "/";
	  	}
	}	
});

function parseJwt (token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
	
	return JSON.parse(jsonPayload);
};
	
$('#logout').click(function(){ 
	logout();
	window.location.href = "/";
});

function logout() {
	localStorage.removeItem("jwtToken");
}
