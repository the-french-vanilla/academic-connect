package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.Post;
import com.thefrenchvanilla.academicconnect.entity.SuggestedUser;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.PostIdException;
import com.thefrenchvanilla.academicconnect.repository.ConnectionRepository;
import com.thefrenchvanilla.academicconnect.repository.SuggestedUserRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class SuggestedUserService {

    @Autowired
    private SuggestedUserRepository suggestedUserRepository;

    @Autowired
    private UserRepository userRepository;

    public SuggestedUser createOrUpdateSuggestedUser(SuggestedUser suggestedUser, String username) {
        try {
            User user = userRepository.findByUsername(username);
            suggestedUser.setUser1(user);
            return suggestedUserRepository.save(suggestedUser);
        } catch (Exception e) {
        	throw new EducationIdException("SuggestedUser ID '" + suggestedUser.getId() + "' already exists");
        }
    }
    
    public SuggestedUser getSuggestedUser(Long id) {
    	SuggestedUser suggestedUser;
    	try {
    		suggestedUser = suggestedUserRepository.findById(id).get();
    		if (suggestedUser == null) {
                throw new EducationIdException("SuggestedUser ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("SuggestedUser ID '" + id + "' does not exist");
    	}
        return suggestedUser;
    }

    public Iterable<SuggestedUser> getAllSuggestedUsers(String username) {
    	Iterable<SuggestedUser> suggestedUser = null;
        try {
            User user = userRepository.findByUsername(username);
            suggestedUser = suggestedUserRepository.findAllByUser1(user);
            
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
        return suggestedUser;
    }
    
    public int getNumberSuggestedUsers(String username) {
    	try {
            User user = userRepository.findByUsername(username);
            int numConnections = suggestedUserRepository.findAllByUser1(user).size();
            return numConnections;
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
    	
    	return 0;
    }

    public void deleteSuggestedUser(Long id) {
    	SuggestedUser suggestedUser = suggestedUserRepository.findById(id).get();
        if (suggestedUser == null) {
            throw new EducationIdException("Cannot delete SuggestedUser with ID '" + id + "'. This suggestedUser does not exist");
        }
        suggestedUserRepository.delete(suggestedUser);
    }

}
