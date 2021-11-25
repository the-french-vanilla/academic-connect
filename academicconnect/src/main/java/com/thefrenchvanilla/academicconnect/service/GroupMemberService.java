package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.Post;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.GroupMember;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.PostIdException;
import com.thefrenchvanilla.academicconnect.repository.ConnectionRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;
import com.thefrenchvanilla.academicconnect.repository.GroupMemberRepository;

@Service
public class GroupMemberService {

    @Autowired
    private GroupMemberRepository userUserGroupRepository;

    @Autowired
    private UserRepository userRepository;

    public GroupMember createOrUpdateUserUserGroup(GroupMember userUserGroup, String username) {
        try {
            User user = userRepository.findByUsername(username);
            userUserGroup.setUser(user);
            return userUserGroupRepository.save(userUserGroup);
        } catch (Exception e) {
        	throw new EducationIdException("UserUserGroup ID '" + userUserGroup.getId() + "' already exists");
        }
    }
    
    public GroupMember getUserUserGroup(Long id) {
    	GroupMember userUserGroup;
    	try {
    		userUserGroup = userUserGroupRepository.findById(id).get();
    		if (userUserGroup == null) {
                throw new EducationIdException("UserUserGroup ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("UserUserGroup ID '" + id + "' does not exist");
    	}
        return userUserGroup;
    }

    public Iterable<GroupMember> getAllUserUserGroups(String username) {
    	Iterable<GroupMember> userUserGroups = null;
        try {
            User user = userRepository.findByUsername(username);
            userUserGroups = userUserGroupRepository.findAllByUser(user);
            
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
        return userUserGroups;
    }
    
    public int getNumberUserUserGroups(String username) {
    	try {
            User user = userRepository.findByUsername(username);
            int numConnections = userUserGroupRepository.findAllByUser(user).size();
            return numConnections;
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
    	
    	return 0;
    }

    public void deleteUserUserGroup(Long id) {
    	GroupMember userUserGroup = userUserGroupRepository.findById(id).get();
        if (userUserGroup == null) {
            throw new EducationIdException("Cannot delete UserUserGroup with ID '" + id + "'. This userUserGroup does not exist");
        }
        userUserGroupRepository.delete(userUserGroup);
    }

}
