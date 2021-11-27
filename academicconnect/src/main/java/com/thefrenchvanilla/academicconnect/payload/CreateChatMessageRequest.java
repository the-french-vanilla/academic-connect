package com.thefrenchvanilla.academicconnect.payload;

import javax.validation.constraints.NotBlank;

public class CreateChatMessageRequest {

    @NotBlank(message = "Text cannot be blank")
    private String text;
    
    @NotBlank(message = "Username cannot be blank")
    private String username;
    
    //@NotBlank(message = "Contact ID cannot be blank")
    private Long contactId;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Long getContactId() {
		return contactId;
	}

	public void setContactId(Long contactId) {
		this.contactId = contactId;
	}
	
}
