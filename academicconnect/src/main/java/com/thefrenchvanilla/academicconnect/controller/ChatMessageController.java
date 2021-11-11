package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.ChatMessage;
import com.thefrenchvanilla.academicconnect.service.ChatMessageService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/message")
@CrossOrigin
public class ChatMessageController {

    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createChatMessage(@Valid @RequestBody ChatMessage chatMessage, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        ChatMessage chatMessage1 = chatMessageService.createOrUpdateChatMessage(chatMessage, principal.getName());
        return new ResponseEntity<ChatMessage>(chatMessage1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getChatMessage(@PathVariable Long id) {
    	ChatMessage chatMessage = chatMessageService.getChatMessage(id);
        return new ResponseEntity<ChatMessage>(chatMessage, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<ChatMessage> getAllChatMessages() {
    	return chatMessageService.getAllChatMessages();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateChatMessage(@Valid @RequestBody ChatMessage chatMessage, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        ChatMessage chatMessage1 = chatMessageService.createOrUpdateChatMessage(chatMessage, principal.getName());
        return new ResponseEntity<ChatMessage>(chatMessage1, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChatMessage(@PathVariable Long id) {
    	chatMessageService.deleteChatMessage(id);
        return new ResponseEntity<String>("ChatMessage with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
