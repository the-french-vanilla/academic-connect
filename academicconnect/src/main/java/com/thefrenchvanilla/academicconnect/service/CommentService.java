package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.ChatMessage;
import com.thefrenchvanilla.academicconnect.entity.Comment;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.PostIdException;
import com.thefrenchvanilla.academicconnect.repository.CommentRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    public Comment createOrUpdateComment(Comment comment, String username) {
        try {
            User user = userRepository.findByUsername(username);
            comment.setUser(user);
            return commentRepository.save(comment);
        } catch (Exception e) {
        	throw new EducationIdException("Comment ID '" + comment.getId() + "' already exists");
        }
    }
    
    public Comment getComment(Long id) {
    	Comment comment;
    	try {
    		comment = commentRepository.findById(id).get();
    		if (comment == null) {
                throw new EducationIdException("Comment ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("Comment ID '" + id + "' does not exist");
    	}
        return comment;
    }

    public Iterable<Comment> getAllComments() {
        return commentRepository.findAll();
    }
    
    public Comment updateComment(Comment comment, Long id, String username){
    	Comment comment1 = commentRepository.findById(id).get();
        if(comment1 == null) {
            throw new PostIdException("Cannot Comment with ID '" + id + "'. This comment does not exist");
        }
        return commentRepository.save(comment);
    }

    public void deleteComment(Long id) {
    	Comment comment = commentRepository.findById(id).get();
        if (comment == null) {
            throw new EducationIdException("Cannot delete Comment with ID '" + id + "'. This comment does not exist");
        }
        commentRepository.delete(comment);
    }

}
