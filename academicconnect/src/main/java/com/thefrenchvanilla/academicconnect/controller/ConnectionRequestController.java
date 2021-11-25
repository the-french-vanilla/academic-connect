package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.ConnectionRequest;
import com.thefrenchvanilla.academicconnect.service.ConnectionRequestService;
import com.thefrenchvanilla.academicconnect.service.ConnectionService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/connectionrequest")
@CrossOrigin
public class ConnectionRequestController {

    @Autowired
    private ConnectionRequestService connectionRequestService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createConnectionRequest(@Valid @RequestBody ConnectionRequest connectionRequest, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        ConnectionRequest connectionRequest1 = connectionRequestService.createOrUpdateConnectionRequest(connectionRequest, principal.getName());
        return new ResponseEntity<ConnectionRequest>(connectionRequest1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getConnectionRequest(@PathVariable Long id) {
    	ConnectionRequest connectionRequest = connectionRequestService.getConnectionRequest(id);
        return new ResponseEntity<ConnectionRequest>(connectionRequest, HttpStatus.OK);
    }

    @GetMapping("/all/sent")
    public Iterable<ConnectionRequest> getAllSentConnectionRequests(Principal principal) {
    	return connectionRequestService.getAllSentConnectionRequests(principal.getName());
    }
    
    @GetMapping("/all/received")
    public Iterable<ConnectionRequest> getAllReceivedConnectionRequests(Principal principal) {
    	return connectionRequestService.getAllReceivedConnectionRequests(principal.getName());
    }
    
    @GetMapping("/number")
    public int getNumberConnectionRequests(Principal principal) {
    	return connectionRequestService.getNumberConnectionRequests(principal.getName());
    }
    
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateConnectionRequest(@Valid @RequestBody ConnectionRequest connectionRequest, BindingResult result, Principal principal) {
//        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
//        if (errorMap != null) {
//        	return errorMap;
//        }
//
//        ConnectionRequest connectionRequest1 = connectionRequestService.createOrUpdateConnectionRequest(connectionRequest, principal.getName());
//        return new ResponseEntity<ConnectionRequest>(connectionRequest1, HttpStatus.OK);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteConnectionRequest(@PathVariable Long id) {
    	connectionRequestService.deleteConnectionRequest(id);
        return new ResponseEntity<String>("ConnectionRequest with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
