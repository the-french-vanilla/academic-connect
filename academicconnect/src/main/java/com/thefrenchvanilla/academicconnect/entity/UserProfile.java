package com.thefrenchvanilla.academicconnect.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class UserProfile {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	//private byte[] profilePicture;
	
	private Boolean active;
	
	private String headline;
	
	private String about;
	
	@Transient
	private int numMutualConnections;
	
	@Transient
	private boolean connected;
	
	@Transient
	private boolean connectionRequestSent;
	
	@Transient
	private boolean connectionRequestReceived;
	
	@OneToOne
	//@JsonIgnore
    private User user;
	
	public UserProfile() {
		active = true;
		headline = "";
		about = "";
	}
	
	public UserProfile(User user) {
		this.user = user;
		active = true;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getHeadline() {
		return headline;
	}

	public void setHeadline(String headline) {
		this.headline = headline;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public int getNumMutualConnections() {
		return numMutualConnections;
	}

	public void setNumMutualConnections(int numMutualConnections) {
		this.numMutualConnections = numMutualConnections;
	}

	public boolean isConnected() {
		return connected;
	}

	public void setConnected(boolean connected) {
		this.connected = connected;
	}

	public boolean isConnectionRequestSent() {
		return connectionRequestSent;
	}

	public void setConnectionRequestSent(boolean connectionRequestSent) {
		this.connectionRequestSent = connectionRequestSent;
	}

	public boolean isConnectionRequestReceived() {
		return connectionRequestReceived;
	}

	public void setConnectionRequestReceived(boolean connectionRequestReceived) {
		this.connectionRequestReceived = connectionRequestReceived;
	}

}
