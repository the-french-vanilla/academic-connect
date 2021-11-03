package com.thefrenchvanilla.academicconnect.entity;

import java.util.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class UserGroup {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToMany
	private Set<User> users;
	
	private String name;
	
	private String description;
	
	private Date dateCreated;
	
	private Boolean active;

}
