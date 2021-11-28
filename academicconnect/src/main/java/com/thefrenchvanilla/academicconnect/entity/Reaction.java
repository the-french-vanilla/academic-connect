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
public class Reaction {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
    //@JsonIgnore
    private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
    //@JsonIgnore
    private Page page;
	
	@ManyToOne(fetch = FetchType.LAZY)
    //@JsonIgnore
    private Post post;
	
	@ManyToOne(fetch = FetchType.LAZY)
    //@JsonIgnore
    private Comment comment;
	
	@NotBlank(message = "Type is required")
	private String type;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createAt;

	public Reaction() {
		
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

	public Post getPost() {
		return post;
	}

	public Page getPage() {
		return page;
	}

	public void setPage(Page page) {
		this.page = page;
	}

	public void setPost(Post post) {
		this.post = post;
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

	public Comment getComment() {
		return comment;
	}

	public void setComment(Comment comment) {
		this.comment = comment;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
}
