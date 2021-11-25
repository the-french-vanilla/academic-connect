package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.UserInterestArea;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.PostIdException;
import com.thefrenchvanilla.academicconnect.repository.ConnectionRepository;
import com.thefrenchvanilla.academicconnect.repository.UserInterestAreaRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class UserInterestAreaService {

    @Autowired
    private UserInterestAreaRepository userInterestAreaRepository;

    @Autowired
    private UserRepository userRepository;

    public UserInterestArea createOrUpdateUserInterestArea(UserInterestArea userInterestArea, String username) {
        try {
            User user = userRepository.findByUsername(username);
            userInterestArea.setUser(user);
            return userInterestAreaRepository.save(userInterestArea);
        } catch (Exception e) {
        	throw new EducationIdException("Connection ID '" + userInterestArea.getId() + "' already exists");
        }
    }
    
    public UserInterestArea getUserInterestArea(Long id) {
    	UserInterestArea userInterestArea;
    	try {
    		userInterestArea = userInterestAreaRepository.findById(id).get();
    		if (userInterestArea == null) {
                throw new EducationIdException("UserInterestArea ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("UserInterestArea ID '" + id + "' does not exist");
    	}
        return userInterestArea;
    }

    public Iterable<UserInterestArea> getAllUserInterestAreas() {
        return userInterestAreaRepository.findAll();
    }

    public void deleteUserInterestArea(Long id) {
    	UserInterestArea userInterestArea = userInterestAreaRepository.findById(id).get();
        if (userInterestArea == null) {
            throw new EducationIdException("Cannot delete UserInterestArea with ID '" + id + "'. This userInterestArea does not exist");
        }
        userInterestAreaRepository.delete(userInterestArea);
    }

}
