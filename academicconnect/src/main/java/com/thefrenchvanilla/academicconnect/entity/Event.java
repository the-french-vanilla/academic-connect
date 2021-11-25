package com.thefrenchvanilla.academicconnect.entity;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Event {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@NotBlank(message = "Name is required")
	private String name;
	
	@NotBlank(message = "Description is required")
	private String description;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date createAt;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date startDate;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date endDate;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private UserGroup userGroup;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Page page;
	
	private Boolean active;

	public Event() {
		active = true;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

//	public Set<User> getUsers() {
//		return users;
//	}
//
//	public void setUsers(Set<User> users) {
//		this.users = users;
//	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public UserGroup getUserGroup() {
		return userGroup;
	}

	public void setUserGroup(UserGroup userGroup) {
		this.userGroup = userGroup;
	}

	public Page getPage() {
		return page;
	}

	public void setPage(Page page) {
		this.page = page;
	}

}
