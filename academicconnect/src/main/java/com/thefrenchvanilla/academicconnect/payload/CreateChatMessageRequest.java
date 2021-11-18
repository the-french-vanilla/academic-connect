package com.thefrenchvanilla.academicconnect.payload;

import javax.validation.constraints.NotBlank;

public class CreateChatMessageRequest {
	
	//@NotBlank(message = "Contact ID cannot be blank")
    private Long contactId;

    @NotBlank(message = "Text cannot be blank")
    private String text;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Long getContactId() {
		return contactId;
	}

	public void setContactId(Long contactId) {
		this.contactId = contactId;
	}
	
}
