package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.ConnectionRequest;
import com.thefrenchvanilla.academicconnect.payload.AcceptConnectionRequestRequest;
import com.thefrenchvanilla.academicconnect.payload.CancelConnectionRequestRequest;
import com.thefrenchvanilla.academicconnect.payload.CreateConnectionRequestRequest;
import com.thefrenchvanilla.academicconnect.payload.DeleteConnectionRequestRequest;
import com.thefrenchvanilla.academicconnect.service.ConnectionRequestService;
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
@CrossOrigin(origins = "http://localhost:3000")
public class ConnectionRequestController {

    @Autowired
    private ConnectionRequestService connectionRequestService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/")
    public ResponseEntity<?> createConnectionRequest(@Valid @RequestBody CreateConnectionRequestRequest createConnectionRequestRequest, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        ConnectionRequest connectionRequest1 = connectionRequestService.createOrUpdateConnectionRequest(createConnectionRequestRequest.getUsername(), principal.getName());
        return new ResponseEntity<ConnectionRequest>(connectionRequest1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{username}/checksent")
    public boolean checkSendConnectionRequest(@PathVariable String username, Principal principal) {
    	return connectionRequestService.checkSendConnectionRequest(username, principal.getName());
    }
    
    @GetMapping("/{username}/checkreceived")
    public boolean checkReceivedConnectionRequest(@PathVariable String username, Principal principal) {
    	return connectionRequestService.checkReceivedConnectionRequest(username, principal.getName());
    }
    
    @GetMapping("/sendrequests")
    public Iterable<ConnectionRequest> getSentConnectionRequests(Principal principal) {
    	return connectionRequestService.getSentConnectionRequests(principal.getName());
    }
    
    @GetMapping("/receivedrequests")
    public Iterable<ConnectionRequest> getReceivedConnectionRequests(Principal principal) {
    	return connectionRequestService.getReceivedConnectionRequests(principal.getName());
    }
    
    @PostMapping("/accept")
    public ResponseEntity<?> acceptConnectionRequest(@Valid @RequestBody AcceptConnectionRequestRequest acceptConnectionRequestRequest, Principal principal) {
    	connectionRequestService.acceptConnectionRequest(acceptConnectionRequestRequest.getUsername(), principal.getName());
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    @PostMapping("/delete")
    public ResponseEntity<?> deleteConnectionRequest(@Valid @RequestBody DeleteConnectionRequestRequest deleteConnectionRequestRequest, Principal principal) {
    	connectionRequestService.deleteConnectionRequest(deleteConnectionRequestRequest.getUsername(), principal.getName());
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    @PostMapping("/cancel")
    public ResponseEntity<?> cancelConnectionRequest(@Valid @RequestBody CancelConnectionRequestRequest cancelConnectionRequestRequest, Principal principal) {
    	connectionRequestService.cancelConnectionRequest(cancelConnectionRequestRequest.getUsername(), principal.getName());
        return new ResponseEntity<Void>(HttpStatus.OK);
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

//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteConnectionRequest(@PathVariable Long id) {
//    	connectionRequestService.deleteConnectionRequest(id);
//        return new ResponseEntity<String>("ConnectionRequest with ID: '" + id + "' was deleted", HttpStatus.OK);
//    }
}
