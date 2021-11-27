package com.thefrenchvanilla.academicconnect.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Contact;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.PostIdException;
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
    
    public Contact createContactIfNotExist(String username2, String username) {
    	Contact contact = new Contact();
    	Contact contact2 = new Contact();
    	Contact contact3 = new Contact();
        try {
            User user = userRepository.findByUsername(username);
            User user2 = userRepository.findByUsername(username2);
            
            if (contactRepository.existsByUser1AndUser2(user, user2)) {
            	contact3 = contactRepository.findByUser1AndUser2(user, user2);
            } else {
            	contact.setUser1(user);
            	contact.setUser2(user2);
            	contact2.setUser1(user2);
            	contact2.setUser2(user);
            	contact3 = contactRepository.save(contact);
            	contactRepository.save(contact2);
            }
        } catch (Exception e) {
        	//throw new EducationIdException("ConnectionRequest ID '" + connectionRequest.getId() + "' already exists");
        }
        return contact3;
	}
    
    public Contact getContact(Long id) {
    	Contact contact = null;
    	try {
    		contact = contactRepository.findById(id).get();
        } catch (Exception e) {
        	//throw new EducationIdException("ConnectionRequest ID '" + connectionRequest.getId() + "' already exists");
        }
        return contact;
    }
    
    public Long getOtherContactId(Long id) {
    	Contact contact = null;
    	Contact contact2 = null;
    	try {
    		contact = contactRepository.findById(id).get();
    		User user = contact.getUser1();
    		User user2 = contact.getUser2();
    		contact2 = contactRepository.findByUser1AndUser2(user2, user);
        } catch (Exception e) {
        	//throw new EducationIdException("ConnectionRequest ID '" + connectionRequest.getId() + "' already exists");
        }
    	
		return contact2.getId();
	}
    
    public Contact getContactById(Long id) {
    	Contact contact = null;
    	try {
            contact = contactRepository.findById(id).get();
        } catch (Exception e) {
        	//throw new EducationIdException("ConnectionRequest ID '" + connectionRequest.getId() + "' already exists");
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
