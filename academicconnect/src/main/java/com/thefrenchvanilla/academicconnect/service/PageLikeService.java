package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.PageLike;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.repository.UserPageRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class PageLikeService {

    @Autowired
    private UserPageRepository userPageRepository;

    @Autowired
    private UserRepository userRepository;

    public PageLike createOrUpdateUserPage(PageLike userPage, String username) {
        try {
            User user = userRepository.findByUsername(username);
            userPage.setUser(user);
            return userPageRepository.save(userPage);
        } catch (Exception e) {
        	throw new EducationIdException("UserPage ID '" + userPage.getId() + "' already exists");
        }
    }
    
    public PageLike getUserPage(Long id) {
    	PageLike userPage;
    	try {
    		userPage = userPageRepository.findById(id).get();
    		if (userPage == null) {
                throw new EducationIdException("UserPage ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("UserPage ID '" + id + "' does not exist");
    	}
        return userPage;
    }

    public Iterable<PageLike> getAllUserPages(String username) {
    	Iterable<PageLike> userPage = null;
        try {
            User user = userRepository.findByUsername(username);
            userPage = userPageRepository.findAllByUser(user);
            
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
        return userPage;
    }
    
    public int getNumberUserPages(String username) {
    	try {
            User user = userRepository.findByUsername(username);
            int numConnections = userPageRepository.findAllByUser(user).size();
            return numConnections;
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
    	
    	return 0;
    }

    public void deleteUserPage(Long id) {
    	PageLike userPage = userPageRepository.findById(id).get();
        if (userPage == null) {
            throw new EducationIdException("Cannot delete UserPage with ID '" + id + "'. This userPage does not exist");
        }
        userPageRepository.delete(userPage);
    }

}
