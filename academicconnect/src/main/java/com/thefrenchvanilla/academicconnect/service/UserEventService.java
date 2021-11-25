package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.UserEvent;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.repository.UserEventRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class UserEventService {

    @Autowired
    private UserEventRepository userEventRepository;

    @Autowired
    private UserRepository userRepository;

    public UserEvent createOrUpdateUserEvent(UserEvent userEvent, String username) {
        try {
            User user = userRepository.findByUsername(username);
            userEvent.setUser(user);
            return userEventRepository.save(userEvent);
        } catch (Exception e) {
        	throw new EducationIdException("UserEvent ID '" + userEvent.getId() + "' already exists");
        }
    }
    
    public UserEvent getUserEvent(Long id) {
    	UserEvent userEvent;
    	try {
    		userEvent = userEventRepository.findById(id).get();
    		if (userEvent == null) {
                throw new EducationIdException("UserEvent ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("UserEvent ID '" + id + "' does not exist");
    	}
        return userEvent;
    }

    public Iterable<UserEvent> getAllUserEvents(String username) {
    	Iterable<UserEvent> userEvent = null;
        try {
            User user = userRepository.findByUsername(username);
            userEvent = userEventRepository.findAllByUser(user);
            
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
        return userEvent;
    }
    
    public int getNumberUserEvents(String username) {
    	try {
            User user = userRepository.findByUsername(username);
            int numConnections = userEventRepository.findAllByUser(user).size();
            return numConnections;
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
    	
    	return 0;
    }

    public void deleteUserEvent(Long id) {
    	UserEvent userEvent = userEventRepository.findById(id).get();
        if (userEvent == null) {
            throw new EducationIdException("Cannot delete UserEvent with ID '" + id + "'. This userEvent does not exist");
        }
        userEventRepository.delete(userEvent);
    }

}
