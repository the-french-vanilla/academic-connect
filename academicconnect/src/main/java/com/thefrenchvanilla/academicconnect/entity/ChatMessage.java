package com.thefrenchvanilla.academicconnect.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class ChatMessage implements Comparable<ChatMessage> {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@OneToOne
	//@JsonIgnore
    private User user1;
	
	@OneToOne
	//@JsonIgnore
    private User user2;
	
	@ManyToOne(fetch = FetchType.LAZY)
	//@JsonIgnore
    private Contact contact;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createAt;
	
	@NotBlank(message = "Text is required")
	private String text;
	
	private Boolean deleted;

	public ChatMessage() {
		deleted = false;
	}

	public ChatMessage(User user1, User user2, Contact contact, String text) {
		this.user1 = user1;
		this.user2 = user2;
		this.contact = contact;
		this.text = text;
		deleted = false;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }
    
    @PrePersist
    protected void onCreate(){
        this.createAt = new Date();
    }

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Contact getContact() {
		return contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public User getUser1() {
		return user1;
	}

	public void setUser1(User user1) {
		this.user1 = user1;
	}

	public User getUser2() {
		return user2;
	}

	public void setUser2(User user2) {
		this.user2 = user2;
	}

	@Override
	public int compareTo(ChatMessage o) {
		return createAt.compareTo(o.createAt);
	}

}
