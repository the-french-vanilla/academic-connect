package com.thefrenchvanilla.academicconnect.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class UserInterestArea {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@OneToOne
	//@JsonIgnore
    private User user;
	
	@OneToOne
	//@JsonIgnore
    private InterestArea interestArea;

	public UserInterestArea() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public InterestArea getInterestArea() {
		return interestArea;
	}

	public void setInterestArea(InterestArea interestArea) {
		this.interestArea = interestArea;
	}
	
}
