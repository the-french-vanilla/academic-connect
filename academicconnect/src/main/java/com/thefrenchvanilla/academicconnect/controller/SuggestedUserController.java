package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.SuggestedUser;
import com.thefrenchvanilla.academicconnect.service.ConnectionService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.SuggestedUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/suggesteduser")
@CrossOrigin(origins = "http://localhost:3000")
public class SuggestedUserController {

    @Autowired
    private SuggestedUserService suggestedUserService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createSuggestedUser(@Valid @RequestBody SuggestedUser suggestedUser, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        SuggestedUser suggestedUser1 = suggestedUserService.createOrUpdateSuggestedUser(suggestedUser, principal.getName());
        return new ResponseEntity<SuggestedUser>(suggestedUser1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getSuggestedUser(@PathVariable Long id) {
    	SuggestedUser suggestedUser = suggestedUserService.getSuggestedUser(id);
        return new ResponseEntity<SuggestedUser>(suggestedUser, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<SuggestedUser> getAllSuggestedUsers(Principal principal) {
    	return suggestedUserService.getAllSuggestedUsers(principal.getName());
    }
    
    @GetMapping("/number")
    public int getNumberSuggestedUsers(Principal principal) {
    	return suggestedUserService.getNumberSuggestedUsers(principal.getName());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSuggestedUser(@PathVariable Long id) {
    	suggestedUserService.deleteSuggestedUser(id);
        return new ResponseEntity<String>("SuggestedUser with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
