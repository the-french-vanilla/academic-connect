package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.UserEvent;
import com.thefrenchvanilla.academicconnect.entity.PageLike;
import com.thefrenchvanilla.academicconnect.entity.GroupMember;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.UserEventService;
import com.thefrenchvanilla.academicconnect.service.PageLikeService;
import com.thefrenchvanilla.academicconnect.service.GroupMemberService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/userevent")
@CrossOrigin
public class UserEventController {

    @Autowired
    private UserEventService userEventService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createUserEvent(@Valid @RequestBody UserEvent userEvent, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        UserEvent userEvent1 = userEventService.createOrUpdateUserEvent(userEvent, principal.getName());
        return new ResponseEntity<UserEvent>(userEvent1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserEvent(@PathVariable Long id) {
    	UserEvent userEvent = userEventService.getUserEvent(id);
        return new ResponseEntity<UserEvent>(userEvent, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<UserEvent> getAllUserEvents(Principal principal) {
    	return userEventService.getAllUserEvents(principal.getName());
    }
    
    @GetMapping("/number")
    public int getNumberUserEvents(Principal principal) {
    	return userEventService.getNumberUserEvents(principal.getName());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserEvent(@Valid @RequestBody UserEvent userEvent, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        UserEvent userEvent1 = userEventService.createOrUpdateUserEvent(userEvent, principal.getName());
        return new ResponseEntity<UserEvent>(userEvent1, HttpStatus.OK);
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserPage(@PathVariable Long id) {
    	userEventService.deleteUserEvent(id);
        return new ResponseEntity<String>("UserEvent with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
