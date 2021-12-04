package com.thefrenchvanilla.academicconnect.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Connection implements Comparable<Connection> {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@OneToOne
	//@JsonIgnore
    private User user1;
	
	@OneToOne
	//@JsonIgnore
    private User user2;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createAt;
	
	private Boolean active;
	
	@Transient
	private String headline;
	
	@Transient
	private int numMutualConnections;
	
	@Transient
	private boolean connected;
	
	@Transient
	private boolean connectionRequestSent;
	
	@Transient
	private boolean connectionRequestReceived;

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

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getHeadline() {
		return headline;
	}

	public void setHeadline(String headline) {
		this.headline = headline;
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

	@Override
	public int compareTo(Connection o) {
		return user2.getFirstName().compareTo(o.getUser2().getFirstName());
	}
	
}
