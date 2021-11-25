package com.thefrenchvanilla.academicconnect.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import java.util.Date;

@Entity
public class ResearchExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Institution is required")
    private String position;

    @NotBlank(message = "Company is required")
    private String company;
    
    @NotBlank(message = "Location is required")
    private String location;    
    
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date startDate;
    
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date endDate;

    @NotBlank(message = "Description is required")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    public ResearchExperience() {
    	
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
    
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

}
