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
    
//    public ChatMessage updateChatMessage(ChatMessage chatMessage, Long id, String username){
//    	ChatMessage chatMessage1 = chatMessageRepository.findById(id).get();
//        if(chatMessage1 == null) {
//            throw new PostIdException("Cannot ChatMessage with ID '" + id + "'. This chat message does not exist");
//        }
//        return chatMessageRepository.save(chatMessage1);
//    }
//
//    public void deleteChatMessage(Long id) {
//    	ChatMessage chatMessage = chatMessageRepository.findById(id).get();
//        if (chatMessage == null) {
//            throw new EducationIdException("Cannot delete ChatMessage with ID '" + id + "'. This education does not exist");
//        }
//        chatMessageRepository.delete(chatMessage);
//    }

}
