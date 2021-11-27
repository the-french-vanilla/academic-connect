package com.thefrenchvanilla.academicconnect.payload;

import javax.validation.constraints.NotBlank;

public class CreateConnectionRequestRequest {

    @NotBlank(message = "Username cannot be blank")
    private String username;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
    
}
