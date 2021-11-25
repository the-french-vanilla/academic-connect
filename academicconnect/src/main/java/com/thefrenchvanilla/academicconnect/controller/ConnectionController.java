package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Connection;
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
@RequestMapping("/api/connection")
@CrossOrigin
public class ConnectionController {

    @Autowired
    private ConnectionService connectionService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createConnection(@Valid @RequestBody Connection connection, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Connection connection1 = connectionService.createOrUpdateConnection(connection, principal.getName());
        return new ResponseEntity<Connection>(connection1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getConnection(@PathVariable Long id) {
    	Connection connection = connectionService.getConnection(id);
        return new ResponseEntity<Connection>(connection, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Connection> getAllConnections(Principal principal) {
    	return connectionService.getAllConnections(principal.getName());
    }
    
    @GetMapping("/number")
    public int getNumberConnections(Principal principal) {
    	return connectionService.getNumberConnections(principal.getName());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateConnection(@Valid @RequestBody Connection connection, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Connection connection1 = connectionService.createOrUpdateConnection(connection, principal.getName());
        return new ResponseEntity<Connection>(connection1, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteConnection(@PathVariable Long id) {
    	connectionService.deleteConnection(id);
        return new ResponseEntity<String>("Connection with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
