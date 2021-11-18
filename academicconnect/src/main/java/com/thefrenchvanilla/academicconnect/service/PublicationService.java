package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Publication;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.repository.PublicationRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class PublicationService {

    @Autowired
    private PublicationRepository publicationRepository;

    @Autowired
    private UserRepository userRepository;

    public Publication createOrUpdatePublication(Publication publication, String username) {
        try {
            User user = userRepository.findByUsername(username);
            publication.setUser(user);
            return publicationRepository.save(publication);
        } catch (Exception e) {
        	throw new EducationIdException("Publication ID '" + publication.getId() + "' already exists");
        }
    }
    
    public Publication getPublication(Long id) {
    	Publication publication;
    	try {
    		publication = publicationRepository.findById(id).get();
    		if (publication == null) {
                throw new EducationIdException("Publication ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("Publication ID '" + id + "' does not exist");
    	}
        return publication;
    }

    public Iterable<Publication> getAllPublications() {
        return publicationRepository.findAll();
    }
    
    public int getNumberPublications(String username) {
    	try {
            User user = userRepository.findByUsername(username);
            int numPublications = publicationRepository.findAllByUser(user).size();
            return numPublications;
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
    	
    	return 0;
    }

    public void deletePublication(Long id) {
    	Publication publication = publicationRepository.findById(id).get();
        if (publication == null) {
            throw new EducationIdException("Cannot delete Publication with ID '" + id + "'. This publication does not exist");
        }
        publicationRepository.delete(publication);
    }

}
