package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.UserInterestArea;
import com.thefrenchvanilla.academicconnect.service.ConnectionService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.UserInterestAreaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/userinterestarea")
@CrossOrigin(origins = "http://localhost:3000")
public class UserInterestAreaController {

    @Autowired
    private UserInterestAreaService userInterestAreaService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createUserInterestArea(@Valid @RequestBody UserInterestArea userInterestArea, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        UserInterestArea userInterestArea1 = userInterestAreaService.createOrUpdateUserInterestArea(userInterestArea, principal.getName());
        return new ResponseEntity<UserInterestArea>(userInterestArea1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserInterestArea(@PathVariable Long id) {
    	UserInterestArea userInterestArea = userInterestAreaService.getUserInterestArea(id);
        return new ResponseEntity<UserInterestArea>(userInterestArea, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<UserInterestArea> getAllUserInterestAreas() {
    	return userInterestAreaService.getAllUserInterestAreas();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserInterestArea(@PathVariable Long id) {
    	userInterestAreaService.deleteUserInterestArea(id);
        return new ResponseEntity<String>("UserInterestArea with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
