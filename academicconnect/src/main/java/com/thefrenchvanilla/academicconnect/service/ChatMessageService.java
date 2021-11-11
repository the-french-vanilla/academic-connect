package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.ChatMessage;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.repository.ChatMessageRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class ChatMessageService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

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
    
    public ChatMessage getChatMessage(Long id) {
    	ChatMessage chatMessage;
    	try {
    		chatMessage = chatMessageRepository.findById(id).get();
    		if (chatMessage == null) {
                throw new EducationIdException("ChatMessage ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("ChatMessage ID '" + id + "' does not exist");
    	}
        return chatMessage;
    }

    public Iterable<ChatMessage> getAllChatMessages() {
        return chatMessageRepository.findAll();
    }

    public void deleteChatMessage(Long id) {
    	ChatMessage chatMessage = chatMessageRepository.findById(id).get();
        if (chatMessage == null) {
            throw new EducationIdException("Cannot delete ChatMessage with ID '" + id + "'. This education does not exist");
        }
        chatMessageRepository.delete(chatMessage);
    }

}
