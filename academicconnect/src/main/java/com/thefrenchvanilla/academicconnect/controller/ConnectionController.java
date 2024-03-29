package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.payload.UnconnectRequest;
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
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8001"})
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
    
    @GetMapping("/{username}/connected")
    public ResponseEntity<?> getIsConnected(@PathVariable String username, Principal principal) {
    	Boolean isConnected = connectionService.getIsConnected(username, principal.getName());
        return new ResponseEntity<Boolean>(isConnected, HttpStatus.OK);
    }
    
    @PostMapping("/unconnect")
    public ResponseEntity<?> unconnect(@Valid @RequestBody UnconnectRequest unconnectRequest, BindingResult result, Principal principal) {
    	connectionService.unconnect(unconnectRequest.getUsername(), principal.getName());
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getConnection(@PathVariable Long id) {
    	Connection connection = connectionService.getConnection(id);
        return new ResponseEntity<Connection>(connection, HttpStatus.OK);
    }

    @GetMapping("/all/{username}")
    public Iterable<Connection> getAllConnections(@PathVariable String username, Principal principal) {
    	return connectionService.getAllConnections(username, principal.getName());
    }
    
    @GetMapping("/mutual/{username}")
    public Iterable<Connection> getMutualConnections(@PathVariable String username, Principal principal) {
    	return connectionService.getMutualConnections(username, principal.getName());
    }
    
    @GetMapping("/number/{username}")
    public long getNumberConnections(@PathVariable String username) {
    	return connectionService.getNumberConnections(username);
    }
    
    @GetMapping("/number/mutual/{username}")
    public long getNumberMutualConnections(@PathVariable String username, Principal principal) {
    	return connectionService.getNumberMutualConnections(username, principal.getName());
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
