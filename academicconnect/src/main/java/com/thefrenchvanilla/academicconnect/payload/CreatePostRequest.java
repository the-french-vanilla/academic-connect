package com.thefrenchvanilla.academicconnect.payload;

import javax.validation.constraints.NotBlank;

public class CreatePostRequest {

    @NotBlank(message = "Text cannot be blank")
    private String text;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
    
}
