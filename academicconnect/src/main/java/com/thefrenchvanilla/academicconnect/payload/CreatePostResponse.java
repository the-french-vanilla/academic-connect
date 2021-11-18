package com.thefrenchvanilla.academicconnect.payload;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class CreatePostResponse {

    private Long id;
    private String username;
    private String text;
    private boolean deleted;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date createAt;
    
	public CreatePostResponse(Long id, String username, String text, boolean deleted, Date createAt) {
		this.id = id;
		this.username = username;
		this.text = text;
		this.deleted = deleted;
		this.createAt = createAt;
	}

	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getText() {
		return text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	public boolean isDeleted() {
		return deleted;
	}
	
	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public Date getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}
    
}
