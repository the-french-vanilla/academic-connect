package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.Page;
import com.thefrenchvanilla.academicconnect.entity.Post;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.UserGroup;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.PostIdException;
import com.thefrenchvanilla.academicconnect.repository.ConnectionRepository;
import com.thefrenchvanilla.academicconnect.repository.UserGroupRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class UserGroupService {

    @Autowired
    private UserGroupRepository userGroupRepository;

    @Autowired
    private UserRepository userRepository;

    public UserGroup createOrUpdateUserGroup(UserGroup userGroup, String username) {
    	try {
            return userGroupRepository.save(userGroup);
        } catch (Exception e) {
        	throw new EducationIdException("UserGroup ID '" + userGroup.getId() + "' already exists");
        }
    }
    
    public UserGroup getUserGroup(Long id) {
    	UserGroup userGroup;
    	try {
    		userGroup = userGroupRepository.findById(id).get();
    		if (userGroup == null) {
                throw new EducationIdException("UserGroup ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("UserGroup ID '" + id + "' does not exist");
    	}
        return userGroup;
    }

    public Iterable<UserGroup> getAllUserGroups(String username) {
    	return userGroupRepository.findAll();
    }
    
    public int getNumberUserGroups(String username) {
    	try {
            User user = userRepository.findByUsername(username);
            int numConnections = userGroupRepository.findAllByUser(user).size();
            return numConnections;
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
    	
    	return 0;
    }
    
    public UserGroup updateUserGroup(Long id, String username){
    	UserGroup userGroup = userGroupRepository.findById(id).get();
        if(userGroup == null) {
            throw new PostIdException("Cannot UserGroup with ID '" + id + "'. This userGroup does not exist");
        }
        return userGroupRepository.save(userGroup);
    }

    public void deleteUserGroup(Long id) {
    	UserGroup userGroup = userGroupRepository.findById(id).get();
        if (userGroup == null) {
            throw new EducationIdException("Cannot delete UserGroup with ID '" + id + "'. This userGroup does not exist");
        }
        userGroupRepository.delete(userGroup);
    }

}
