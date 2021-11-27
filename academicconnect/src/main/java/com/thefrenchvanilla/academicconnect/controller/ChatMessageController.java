package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.ChatMessage;
import com.thefrenchvanilla.academicconnect.entity.Contact;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.payload.CreateChatMessageRequest;
import com.thefrenchvanilla.academicconnect.service.ChatMessageService;
import com.thefrenchvanilla.academicconnect.service.ContactService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/message")
@CrossOrigin
public class ChatMessageController {

    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createChatMessage(@Valid @RequestBody CreateChatMessageRequest createChatMessageRequest, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }
        
//        Contact contact = contactService.getContact(createChatMessageRequest.getUsername(), principal.getName());
//        User user1 = contact.getUser1();
//        User user2 = contact.getUser2();
//        
//        ChatMessage chatMessage1 = new ChatMessage(user1, user2, contact, chatMessage.getText());
        
        ChatMessage chatMessage2 = chatMessageService.createOrUpdateChatMessage(createChatMessageRequest.getUsername(), 
        		principal.getName(), createChatMessageRequest.getText(), createChatMessageRequest.getContactId());
        return new ResponseEntity<ChatMessage>(chatMessage2, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getChatMessage(@PathVariable Long id) {
    	ChatMessage chatMessage = chatMessageService.getChatMessage(id);
        return new ResponseEntity<ChatMessage>(chatMessage, HttpStatus.OK);
    }
    
    @GetMapping("/user1/{contactId}/user2/{otherContactId}")
    public Iterable<ChatMessage> getAllChatMessages(@PathVariable Long contactId, @PathVariable Long otherContactId) {
    	List<ChatMessage> chatMessages = chatMessageService.getChatMessagesByContactIds(contactId, otherContactId);
        //return new ResponseEntity<ChatMessage>(chatMessages, HttpStatus.OK);
    	return chatMessages;
    }

//    @GetMapping("/all")
//    public Iterable<ChatMessage> getAllChatMessages() {
//    	return chatMessageService.getAllChatMessages();
//    }
    
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateChatMessage(@Valid @RequestBody ChatMessage chatMessage, BindingResult result, 
//    												  @PathVariable Long id, Principal principal) {
//        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
//        if (errorMap != null) {
//        	return errorMap;
//        }
//
//        ChatMessage chatMessage1 = chatMessageService.updateChatMessage(chatMessage, id, principal.getName());
//        return new ResponseEntity<ChatMessage>(chatMessage1, HttpStatus.OK);
//    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChatMessage(@PathVariable Long id) {
    	chatMessageService.deleteChatMessage(id);
        return new ResponseEntity<String>("ChatMessage with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
