package com.thefrenchvanilla.academicconnect.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
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
public class ChatMessageService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;
    
    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private UserRepository userRepository;

    public ChatMessage createOrUpdateChatMessage(ChatMessage chatMessage, String username) {
        try {
            User user = userRepository.findByUsername(username);
            chatMessage.setUser1(user);
            return chatMessageRepository.save(chatMessage);
        } catch (Exception e) {
        	throw new EducationIdException("ChatMessage ID '" + chatMessage.getId() + "' already exists");
        }
    }
    
    public List<ChatMessage> getChatMessagesByContactId(Long contactId, Long otherContactId) {
    	List<ChatMessage> chatMessages = null;
    	List<ChatMessage> otherChatMessages;
    	try {
    		Contact contact = contactRepository.findById(contactId).get();
    		Contact otherContact = contactRepository.findById(otherContactId).get();
    		chatMessages = chatMessageRepository.findAllByContact(contact);
    		otherChatMessages = chatMessageRepository.findAllByContact(otherContact);
    		chatMessages.addAll(otherChatMessages);
    		
    		Collections.sort(chatMessages, Collections.reverseOrder());
    		
    		return chatMessages;
    		
//    		if (chatMessages == null) {
//    			throw new EducationIdException("ChatMessage ID '" + id + "' does not exist");
//    		}
    	} catch (NoSuchElementException e) {
    		//throw new EducationIdException("ChatMessage ID '" + id + "' does not exist");
    	}
    	return chatMessages;
    }
    
//    public ChatMessage getChatMessage(Long id) {
//    	ChatMessage chatMessage;
//    	try {
//    		chatMessage = chatMessageRepository.findById(id).get();
//    		if (chatMessage == null) {
//                throw new EducationIdException("ChatMessage ID '" + id + "' does not exist");
//            }
//    	} catch (NoSuchElementException e) {
//    		throw new EducationIdException("ChatMessage ID '" + id + "' does not exist");
//    	}
//        return chatMessage;
//    }

//    public Iterable<ChatMessage> getAllChatMessages() {
//        return chatMessageRepository.findAll();
//    }
    
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
