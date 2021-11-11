package com.thefrenchvanilla.academicconnect.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@Email(message = "Username needs to be an email")
    @NotBlank(message = "username is required")
    @Column(unique = true)
    private String username;
    
    @NotBlank(message = "Please enter your first name")
    private String firstName;
    
    @NotBlank(message = "Please enter your last name")
    private String lastName;
    
    @NotBlank(message = "Password field is required")
    private String password;
    
    @Transient
    private String confirmPassword;
    
    private Date create_At;
    
    private Date update_At;
    
   
    
//    @ManyToMany(cascade={CascadeType.ALL})
//	@JoinTable(name="connection",
//		joinColumns={@JoinColumn(name="id")},
//		inverseJoinColumns={@JoinColumn(name="user_id")})
//	private Set<User> connections = new HashSet<User>();

//    //OneToMany with Project
//    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "user", orphanRemoval = true)
//    private List<Project> projects = new ArrayList<>();


    public User() {
    	
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public Date getCreate_At() {
        return create_At;
    }

    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public Date getUpdate_At() {
        return update_At;
    }

    public void setUpdate_At(Date update_At) {
        this.update_At = update_At;
    }

//    public List<Project> getProjects() {
//        return projects;
//    }
//
//    public void setProjects(List<Project> projects) {
//        this.projects = projects;
//    }

    @PrePersist
    protected void onCreate(){
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }

    /*
    UserDetails interface methods
     */

    @Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", password=" + password + ", confirmPassword=" + confirmPassword + ", create_At=" + create_At
				+ ", update_At=" + update_At + "]";
	}

	@Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}

//@Entity
//@Table(name="user")
//public class User {
//
//	// define fields
//	
//	@Id
//	@GeneratedValue(strategy=GenerationType.IDENTITY)
//	@Column(name="id")
//	private int id;
//	
//	@Column(name="first_name")
//	private String firstName;
//	
//	@Column(name="last_name")
//	private String lastName;
//	
//	@Column(name="email")
//	private String email;
//	
//		
//	// define constructors
//	
//	public User() {
//		
//	}
//
//	public User(String firstName, String lastName, String email) {
//		this.firstName = firstName;
//		this.lastName = lastName;
//		this.email = email;
//	}
//
//	// define getter/setter
//	
//	public int getId() {
//		return id;
//	}
//
//	public void setId(int id) {
//		this.id = id;
//	}
//
//	public String getFirstName() {
//		return firstName;
//	}
//
//	public void setFirstName(String firstName) {
//		this.firstName = firstName;
//	}
//
//	public String getLastName() {
//		return lastName;
//	}
//
//	public void setLastName(String lastName) {
//		this.lastName = lastName;
//	}
//
//	public String getEmail() {
//		return email;
//	}
//
//	public void setEmail(String email) {
//		this.email = email;
//	}
//
//	// define tostring
//
//	@Override
//	public String toString() {
//		return "User [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + "]";
//	}
//		
//}











