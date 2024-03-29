package com.thefrenchvanilla.academicconnect.service;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.Education;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.UserProfile;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.UserIdException;
import com.thefrenchvanilla.academicconnect.exception.UserProfileException;
import com.thefrenchvanilla.academicconnect.exception.UsernameAlreadyExistsException;
import com.thefrenchvanilla.academicconnect.repository.ConnectionRepository;
import com.thefrenchvanilla.academicconnect.repository.ConnectionRequestRepository;
import com.thefrenchvanilla.academicconnect.repository.EducationRepository;
import com.thefrenchvanilla.academicconnect.repository.UserProfileRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class UserProfileService {
	
	@Autowired
	private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;
    
    @Autowired
    private ConnectionRepository connectionRepository;
    
    @Autowired
    private ConnectionRequestRepository connectionRequestRepository;
    
    @Autowired
    private EducationRepository educationRepository;
    
    public UserProfile findUserProfile(String username){
        //Only want to return the education if the user looking for it is the owner
        User user = userRepository.findByUsername(username);
        UserProfile userProfile = userProfileRepository.findByUserId(user.getId());
        if(userProfile == null){
            throw new UserProfileException("User Profile id '"+userProfile.getId()+"' does not exist");
        }
        return userProfile;
    }
    
    public Iterable<UserProfile> getUserProfilesById(String ids, String username) {
    	String[] stringIds = ids.split(",");
    	List<Long> intIds = new ArrayList<Long>();
    	for (String stringId : stringIds) {
    		intIds.add(Long.parseLong(stringId));
    	}
    	
    	User user = userRepository.findByUsername(username);
    	List<Connection> connections = connectionRepository.findAllByUser1(user);
    	List<String> usernames = new ArrayList<String>();
    	for (Connection connection : connections) {
    		usernames.add(connection.getUser2().getUsername());
    	}
    	
    	List<User> users = userRepository.findAllByIdIn(intIds);
        List<UserProfile> userProfiles = userProfileRepository.findByUserIn(users);
        
        //List<UserProfile> mutual = new ArrayList<UserProfile>();
        
        for (UserProfile userProfile : userProfiles) {
        	User user2 = userProfile.getUser();
        	List<Connection> connections2 = connectionRepository.findAllByUser1(user2);
        	List<String> usernames2 = new ArrayList<String>();
        	for (Connection connection2 : connections2) {
        		usernames2.add(connection2.getUser2().getUsername());
        	}
        	
        	List<String> mutualUsernames = new ArrayList<String>();
            for (String usr : usernames) {
                if (usernames2.contains(usr)) {
                	mutualUsernames.add(usr);
                }
            }
            
            boolean connected = false;
            if (connectionRepository.countByUser1AndUser2(user, user2) > 0) {
            	connected = true;
    		}
            
            boolean connectionRequestSent = connectionRequestRepository.existsByUser1AndUser2(user, user2);
            boolean connectionRequestReceived = connectionRequestRepository.existsByUser1AndUser2(user2, user);
            
            userProfile.setNumMutualConnections(mutualUsernames.size());
            userProfile.setConnectionRequestSent(connectionRequestSent);
            userProfile.setConnectionRequestReceived(connectionRequestReceived);
            userProfile.setConnected(connected);
        }
        
//        if(userProfile == null){
//            throw new UserProfileException("User Profile id '"+userProfile.getId()+"' does not exist");
//        }
        return userProfiles;
	}
    
    public Iterable<UserProfile> searchUserProfiles(String username2, String username) {
    	User user = userRepository.findByUsername(username);
    	List<Connection> connections = connectionRepository.findAllByUser1(user);
    	List<String> usernames = new ArrayList<String>();
    	for (Connection connection : connections) {
    		usernames.add(connection.getUser2().getUsername());
    	}
    	
    	List<User> users = userRepository.findAllByUsernameContaining(username2);
        List<UserProfile> userProfiles = userProfileRepository.findByUserIn(users);
        
        //List<UserProfile> mutual = new ArrayList<UserProfile>();
        
        for (UserProfile userProfile : userProfiles) {
        	User user2 = userProfile.getUser();
        	List<Connection> connections2 = connectionRepository.findAllByUser1(user2);
        	List<String> usernames2 = new ArrayList<String>();
        	for (Connection connection2 : connections2) {
        		usernames2.add(connection2.getUser2().getUsername());
        	}
        	
        	List<String> mutualUsernames = new ArrayList<String>();
            for (String usr : usernames) {
                if (usernames2.contains(usr)) {
                	mutualUsernames.add(usr);
                }
            }
            
            boolean connected = false;
            if (connectionRepository.countByUser1AndUser2(user, user2) > 0) {
            	connected = true;
    		}
            
            boolean connectionRequestSent = connectionRequestRepository.existsByUser1AndUser2(user, user2);
            boolean connectionRequestReceived = connectionRequestRepository.existsByUser1AndUser2(user2, user);
            
            userProfile.setNumMutualConnections(mutualUsernames.size());
            userProfile.setConnectionRequestSent(connectionRequestSent);
            userProfile.setConnectionRequestReceived(connectionRequestReceived);
            userProfile.setConnected(connected);
        }
        
//        if(userProfile == null){
//            throw new UserProfileException("User Profile id '"+userProfile.getId()+"' does not exist");
//        }
        return userProfiles;
	}
    
    public Iterable<UserProfile> getOtherUserProfilesNotConnected(String username) {
    	User user = userRepository.findByUsername(username);
    	List<Connection> connections = connectionRepository.findAllByUser1(user);
    	List<String> usernames = new ArrayList<String>();
    	for (Connection connection : connections) {
    		usernames.add(connection.getUser2().getUsername());
    	}
//    	List<String> usernames = new ArrayList<String>();
//    	usernames.add(username);
    	
    	List<User> users = userRepository.findByUsernameNotIn(Collections.singletonList(username));
    	
    	List<User> unconnectedUsers = new ArrayList<User>();
    	for (User u : users) {
    		if (connectionRepository.countByUser1AndUser2(u, user) == 0) {
    			unconnectedUsers.add(u);
    		}
    	}
    	
        List<UserProfile> userProfiles = userProfileRepository.findByUserIn(unconnectedUsers);
        
        //List<UserProfile> mutual = new ArrayList<UserProfile>();
        
        for (UserProfile userProfile : userProfiles) {
        	User user2 = userProfile.getUser();
        	List<Connection> connections2 = connectionRepository.findAllByUser1(user2);
        	List<String> usernames2 = new ArrayList<String>();
        	for (Connection connection2 : connections2) {
        		usernames2.add(connection2.getUser2().getUsername());
        	}
        	
        	List<String> mutualUsernames = new ArrayList<String>();
            for (String usr : usernames) {
                if (usernames2.contains(usr)) {
                	mutualUsernames.add(usr);
                }
            }
            
            List<Education> educations = educationRepository.findAllByUser(user2);
            List<String> institutions = new ArrayList<String>();
            for (Education education : educations) {
            	institutions.add(education.getInstitution());
            }
            
//            userProfile.setUsername(user2.getUsername());
            userProfile.setNumMutualConnections(mutualUsernames.size());
            userProfile.setInstitutions(institutions);
        }
        
//        if(userProfile == null){
//            throw new UserProfileException("User Profile id '"+userProfile.getId()+"' does not exist");
//        }
        return userProfiles;
	}

//    public UserProfile updateUserProfile(Long userId, String headline, String about){
//    	//Only want to return the education if the user looking for it is the owner
//        User user = userRepository.getById(userId);
//        UserProfile userProfile = userProfileRepository.findByUserId(user.getId());
//        if(userProfile == null){
//            throw new UserProfileException("User Profile id '"+userProfile.getId()+"' does not exist");
//        }
//        userProfile.setHeadline(headline);
//        userProfile.setAbout(about);
//        userProfileRepository.save(userProfile);
//        
//        return userProfile;
//    }
    
    public UserProfile updateUserProfile(String headline, String about, String username){
    	//Only want to return the education if the user looking for it is the owner
        User user = userRepository.findByUsername(username);
        UserProfile userProfile = userProfileRepository.findByUserId(user.getId());
        if(userProfile == null){
            throw new UserProfileException("User Profile id '"+userProfile.getId()+"' does not exist");
        }
        userProfile.setHeadline(headline);
        userProfile.setAbout(about);
        userProfileRepository.save(userProfile);
        
        return userProfile;
    }

}
