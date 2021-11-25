package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Comment;
import com.thefrenchvanilla.academicconnect.entity.Reaction;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.PostIdException;
import com.thefrenchvanilla.academicconnect.repository.CommentRepository;
import com.thefrenchvanilla.academicconnect.repository.ReactionRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class ReactionService {

    @Autowired
    private ReactionRepository reactionRepository;

    @Autowired
    private UserRepository userRepository;

    public Reaction createOrUpdateReaction(Reaction reaction, String username) {
        try {
            User user = userRepository.findByUsername(username);
            reaction.setUser(user);
            return reactionRepository.save(reaction);
        } catch (Exception e) {
        	throw new EducationIdException("Reaction ID '" + reaction.getId() + "' already exists");
        }
    }
    
    public Reaction getReaction(Long id) {
    	Reaction reaction;
    	try {
    		reaction = reactionRepository.findById(id).get();
    		if (reaction == null) {
                throw new EducationIdException("Reaction ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("Reaction ID '" + id + "' does not exist");
    	}
        return reaction;
    }

    public Iterable<Reaction> getAllReactions() {
        return reactionRepository.findAll();
    }
    
    public Reaction updateReaction(Reaction reaction, Long id, String username){
    	Reaction reaction1 = reactionRepository.findById(id).get();
        if(reaction1 == null) {
            throw new PostIdException("Cannot Reaction with ID '" + id + "'. This reaction does not exist");
        }
        return reactionRepository.save(reaction);
    }

    public void deleteReaction(Long id) {
    	Reaction reaction = reactionRepository.findById(id).get();
        if (reaction == null) {
            throw new EducationIdException("Cannot delete Reaction with ID '" + id + "'. This reaction does not exist");
        }
        reactionRepository.delete(reaction);
    }

}
