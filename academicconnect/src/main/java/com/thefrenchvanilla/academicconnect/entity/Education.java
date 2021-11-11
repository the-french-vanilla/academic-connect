package com.thefrenchvanilla.academicconnect.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import java.util.Date;

@Entity
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
//    @NotBlank(message ="Education Id is required")
//    @Size(min=4, max=5, message = "Please use 4 to 5 characters")
//    @Column(updatable = false, unique = true)
//    private String educationId;
    
    @NotBlank(message = "Institution is required")
    private String institution;
    
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date startDate;
    
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date endDate;
    
    @NotBlank(message = "Accreditation is required")
    private String accreditation;
    
    @NotBlank(message = "Description is required")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    public Education() {
    	
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
//    public String getEducationId() {
//        return educationId;
//    }
//
//    public void setEducationId(String educationId) {
//        this.educationId = educationId;
//    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
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
    
    public String getAccreditation() {
        return accreditation;
    }

    public void setAccreditation(String accreditation) {
        this.accreditation = accreditation;
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

}
