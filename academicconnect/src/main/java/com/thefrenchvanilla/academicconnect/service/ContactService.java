package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.ChatMessage;
import com.thefrenchvanilla.academicconnect.entity.Contact;
import com.thefrenchvanilla.academicconnect.entity.Post;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.PostIdException;
import com.thefrenchvanilla.academicconnect.repository.ChatMessageRepository;
import com.thefrenchvanilla.academicconnect.repository.ContactRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private UserRepository userRepository;

    public Contact createOrUpdateContact(Contact contact, String username) {
        try {
            User user = userRepository.findByUsername(username);
            contact.setUser1(user);
            return contactRepository.save(contact);
        } catch (Exception e) {
        	throw new EducationIdException("Contact ID '" + contact.getId() + "' already exists");
        }
    }
    
    public Contact getContact(Long id) {
    	Contact contact;
    	try {
    		contact = contactRepository.findById(id).get();
    		if (contact == null) {
                throw new EducationIdException("ChatMessage ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("ChatMessage ID '" + id + "' does not exist");
    	}
        return contact;
    }

    public Iterable<Contact> getAllContacts(String username) {
    	
    	Contact contact = null;
    	try {
            User user = userRepository.findByUsername(username);
            return contactRepository.findAllByUser1(user);
        } catch (Exception e) {
        	throw new EducationIdException("Contact ID '" + contact.getId() + "' already exists");
        }
    	
        //return contactRepository.findAll();
    }
    
    public Long getFirstContactId(String username) {
    	Contact contact = null;
    	try {
            User user = userRepository.findByUsername(username);
            contact = contactRepository.findAllByUser1(user).get(0);
            return contact.getId();
        } catch (Exception e) {
        	throw new EducationIdException("Contact ID '" + contact.getId() + "' already exists");
        }
    }
    
    public Long getFirstOtherContactId(String username) {
    	Contact contact = null;
    	try {
            User user = userRepository.findByUsername(username);
            contact = contactRepository.findAllByUser2(user).get(0);
            return contact.getId();
        } catch (Exception e) {
        	throw new EducationIdException("Contact ID '" + contact.getId() + "' already exists");
        }
    }
    
    public Contact updateContact(Contact chatMessage, Long id, String username){
    	Contact contact1 = contactRepository.findById(id).get();
        if(contact1 == null) {
            throw new PostIdException("Cannot Contact with ID '" + id + "'. This contact does not exist");
        }
        return contactRepository.save(contact1);
    }

    public void deleteContact(Long id) {
    	Contact contact1 = contactRepository.findById(id).get();
        if (contact1 == null) {
            throw new EducationIdException("Cannot delete Contact with ID '" + id + "'. This contact does not exist");
        }
        contactRepository.delete(contact1);
    }

}
