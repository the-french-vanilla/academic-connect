package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Comment;
import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.Page;
import com.thefrenchvanilla.academicconnect.entity.Post;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.UserGroup;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.PostIdException;
import com.thefrenchvanilla.academicconnect.repository.ConnectionRepository;
import com.thefrenchvanilla.academicconnect.repository.PageRepository;
import com.thefrenchvanilla.academicconnect.repository.UserGroupRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class PageService {

    @Autowired
    private PageRepository pageRepository;

    @Autowired
    private UserRepository userRepository;

    public Page createOrUpdatePage(Page page, String username) {
    	try {
            return pageRepository.save(page);
        } catch (Exception e) {
        	throw new EducationIdException("Page ID '" + page.getId() + "' already exists");
        }
    }
    
    public Page getPage(Long id) {
    	Page page;
    	try {
    		page = pageRepository.findById(id).get();
    		if (page == null) {
                throw new EducationIdException("Page ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("Page ID '" + id + "' does not exist");
    	}
        return page;
    }

    public Iterable<Page> getAllPages(String username) {
    	return pageRepository.findAll();
    }
    
    public int getNumberPages(String username) {
    	try {
            User user = userRepository.findByUsername(username);
            int numConnections = pageRepository.findAllByUser(user).size();
            return numConnections;
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
    	
    	return 0;
    }
    
    public Page updatePage(Long id, String username){
    	Page page = pageRepository.findById(id).get();
        if(page == null) {
            throw new PostIdException("Cannot Page with ID '" + id + "'. This page does not exist");
        }
        return pageRepository.save(page);
    }

    public void deletePage(Long id) {
    	Page page = pageRepository.findById(id).get();
        if (page == null) {
            throw new EducationIdException("Cannot delete Page with ID '" + id + "'. This page does not exist");
        }
        pageRepository.delete(page);
    }

}
