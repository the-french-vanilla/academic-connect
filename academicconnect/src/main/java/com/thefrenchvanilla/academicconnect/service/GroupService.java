package com.thefrenchvanilla.academicconnect.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.repository.GroupRepository;
import com.thefrenchvanilla.academicconnect.repository.PublicationRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

public class GroupService {
	
	@Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;
    
//	public int getNumberGroups(String username) {
//    	try {
//            User user = userRepository.findByUsername(username);
//            int numGroups = groupRepository.findAllByUser(user).size();
//            return numGroups;
//        } catch (Exception e) {
//        	e.printStackTrace();
//            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
//        }
//    	
//    	return 0;
//    }
}
