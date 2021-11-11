package com.thefrenchvanilla.academicconnect.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Connection {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@OneToOne
	@JsonIgnore
    private User user1;
	
	@OneToOne
	@JsonIgnore
    private User user2;
	
	@JsonFormat(pattern = "yyyy-mm-dd")
    private Date dateConnected;
	
	private Boolean active;

	public Connection() {
		active = true;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Date getDateConnected() {
		return dateConnected;
	}

	public void setDateConnected(Date dateConnected) {
		this.dateConnected = dateConnected;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}
	
}
