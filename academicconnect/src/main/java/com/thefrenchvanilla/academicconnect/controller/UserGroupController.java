package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.UserGroup;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.UserGroupService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/group")
@CrossOrigin(origins = "http://localhost:3000")
public class UserGroupController {

    @Autowired
    private UserGroupService userGroupService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createUserGroup(@Valid @RequestBody UserGroup userGroup, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        UserGroup userGroup1 = userGroupService.createOrUpdateUserGroup(userGroup, principal.getName());
        return new ResponseEntity<UserGroup>(userGroup1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserGroup(@PathVariable Long id) {
    	UserGroup userGroup = userGroupService.getUserGroup(id);
        return new ResponseEntity<UserGroup>(userGroup, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<UserGroup> getAllUserGroups(Principal principal) {
    	return userGroupService.getAllUserGroups(principal.getName());
    }
    
    @GetMapping("/number")
    public int getNumberUserGroups(Principal principal) {
    	return userGroupService.getNumberUserGroups(principal.getName());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserGroup(@Valid @RequestBody UserGroup userGroup, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        UserGroup userGroup1 = userGroupService.createOrUpdateUserGroup(userGroup, principal.getName());
        return new ResponseEntity<UserGroup>(userGroup1, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserGroup(@PathVariable Long id) {
    	userGroupService.deleteUserGroup(id);
        return new ResponseEntity<String>("UserGroup with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
