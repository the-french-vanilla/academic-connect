package com.thefrenchvanilla.academicconnect.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.PublicationService;

@RestController
@RequestMapping("/api/group")
@CrossOrigin
public class GroupController {
	
//	@Autowired
//    private GroupService groupService;
//
//    @Autowired
//    private MapValidationErrorService mapValidationErrorService;
//
//	@GetMapping("/number")
//    public int getNumberGroups(Principal principal) {
//    	return groupService.getNumberGroups(principal.getName());
//    }
}
