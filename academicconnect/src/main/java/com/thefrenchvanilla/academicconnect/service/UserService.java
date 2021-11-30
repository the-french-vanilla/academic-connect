package com.thefrenchvanilla.academicconnect.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Education;
import com.thefrenchvanilla.academicconnect.entity.Event;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.UserProfile;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.UserIdException;
import com.thefrenchvanilla.academicconnect.exception.UsernameAlreadyExistsException;
import com.thefrenchvanilla.academicconnect.repository.UserProfileRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserProfileRepository userProfileRepository;


    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser (User newUser){

        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            //Username has to be unique (exception)
            newUser.setUsername(newUser.getUsername());
            // Make sure that password and confirmPassword match
            // We don't persist or show the confirmPassword
            newUser.setConfirmPassword("");
            
            User newUser2 = userRepository.save(newUser);
            userProfileRepository.save(new UserProfile(newUser));
            return newUser2;

        }catch (Exception e){
            throw new UsernameAlreadyExistsException("Username '"+newUser.getUsername()+"' already exists");
        }

    }
    
    public User getCurrentUser(String username) {
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new UserIdException("User ID '"+user.getId()+"' does not exist");
        }
        return user;
	}
    
    public User findUserById(Long userId){

        //Only want to return the education if the user looking for it is the owner

        //User user = userRepository.getById(userId);
        User user = userRepository.findById(userId).get();

        if(user == null){
            throw new UserIdException("User ID '"+userId+"' does not exist");

        }


        return user;
    }

    public Iterable<User> getAllUsers() {
    	return userRepository.findAll();
    }

	public User updateCurrentUser(String usernameNew, String firstName, String middleName, String lastName, String email,
			String phoneNumber, String gender, String username) {
		User user = null;
		try {
	        user = userRepository.findByUsername(username);
	        user.setUsername(usernameNew);
	        user.setFirstName(firstName);
	        user.setMiddleName(middleName);
	        user.setLastName(lastName);
	        user.setEmail(email);
	        user.setPhoneNumber(phoneNumber);
	        user.setGender(gender);
	        return userRepository.save(user);
	    } catch (Exception e) {
	    	throw new EducationIdException("User ID '" + user.getId() + "' already exists");
	    }
	}

	public User changePassword(String currentPassword, String newPassword, String confirmPassword, String username) {
		User user = null;
		try {
	        user = userRepository.findByUsername(username);
	        
	        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	        String existingPassword = currentPassword;
	        String dbPassword = user.getPassword();

	        if (!newPassword.equals(confirmPassword)) {
	        	throw new EducationIdException("New password and confirm password does not match");
	        } else if (!passwordEncoder.matches(existingPassword, dbPassword)) {
	        	// Report error 
	        	throw new EducationIdException("Current password and new password does not match");
	        } else {
	        	// Encode new password and store it
	        	user.setPassword(passwordEncoder.encode(newPassword));
	        	return userRepository.save(user);
	        }
	        
	    } catch (Exception e) {
	    	throw new EducationIdException(e.getMessage());
	    }
	}
    
}


//import java.util.List;
//
//import com.thefrenchvanilla.academicconnect.entity.User;
//
//public interface UserService {
//
//	public List<User> findAll();
//	
//	public User findById(int theId);
//	
//	public void save(User theEmployee);
//	
//	public void deleteById(int theId);
//	
//}
