package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.UserGroup;
import com.thefrenchvanilla.academicconnect.entity.GroupMember;
import com.thefrenchvanilla.academicconnect.service.ConnectionService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.UserGroupService;
import com.thefrenchvanilla.academicconnect.service.GroupMemberService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/usergroup")
@CrossOrigin(origins = "http://localhost:3000")
public class GroupMemberController {

    @Autowired
    private GroupMemberService userUserGroupService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createUserUserGroup(@Valid @RequestBody GroupMember userUserGroup, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        GroupMember userUserGroup1 = userUserGroupService.createOrUpdateUserUserGroup(userUserGroup, principal.getName());
        return new ResponseEntity<GroupMember>(userUserGroup1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserUserGroup(@PathVariable Long id) {
    	GroupMember userUserGroup = userUserGroupService.getUserUserGroup(id);
        return new ResponseEntity<GroupMember>(userUserGroup, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<GroupMember> getAllUserUserGroups(Principal principal) {
    	return userUserGroupService.getAllUserUserGroups(principal.getName());
    }
    
    @GetMapping("/number")
    public int getNumberUserGroups(Principal principal) {
    	return userUserGroupService.getNumberUserUserGroups(principal.getName());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserGroup(@Valid @RequestBody GroupMember userUserGroup, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        GroupMember userUserGroup1 = userUserGroupService.createOrUpdateUserUserGroup(userUserGroup, principal.getName());
        return new ResponseEntity<GroupMember>(userUserGroup1, HttpStatus.OK);
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserUserGroup(@PathVariable Long id) {
    	userUserGroupService.deleteUserUserGroup(id);
        return new ResponseEntity<String>("UserUserGroup with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
