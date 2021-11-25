package com.thefrenchvanilla.academicconnect.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Education;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.UserProfile;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.UserIdException;
import com.thefrenchvanilla.academicconnect.exception.UserProfileException;
import com.thefrenchvanilla.academicconnect.exception.UsernameAlreadyExistsException;
import com.thefrenchvanilla.academicconnect.repository.UserProfileRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class UserProfileService {
	
	@Autowired
	private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;
    
    public UserProfile findUserProfile(Long userId){
        //Only want to return the education if the user looking for it is the owner
        User user = userRepository.getById(userId);
        UserProfile userProfile = userProfileRepository.findByUserId(user.getId());
        if(userProfile == null){
            throw new UserProfileException("User Profile id '"+userProfile.getId()+"' does not exist");

        }
        return userProfile;
    }

    public UserProfile updateUserProfile(Long userId, String headline, String about){
    	//Only want to return the education if the user looking for it is the owner
        User user = userRepository.getById(userId);
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
