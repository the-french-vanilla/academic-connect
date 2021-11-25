package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.ConnectionRequest;
import com.thefrenchvanilla.academicconnect.entity.Post;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.PostIdException;
import com.thefrenchvanilla.academicconnect.repository.ConnectionRepository;
import com.thefrenchvanilla.academicconnect.repository.ConnectionRequestRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class ConnectionRequestService {

    @Autowired
    private ConnectionRequestRepository connectionRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public ConnectionRequest createOrUpdateConnectionRequest(ConnectionRequest connectionRequest, String username) {
        try {
            User user = userRepository.findByUsername(username);
            connectionRequest.setUser1(user);
            return connectionRequestRepository.save(connectionRequest);
        } catch (Exception e) {
        	throw new EducationIdException("ConnectionRequest ID '" + connectionRequest.getId() + "' already exists");
        }
    }
    
    public ConnectionRequest getConnectionRequest(Long id) {
    	ConnectionRequest connection;
    	try {
    		connection = connectionRequestRepository.findById(id).get();
    		if (connection == null) {
                throw new EducationIdException("ConnectionRequest ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("ConnectionRequest ID '" + id + "' does not exist");
    	}
        return connection;
    }

    public Iterable<ConnectionRequest> getAllSentConnectionRequests(String username) {
    	Iterable<ConnectionRequest> connectionRequest = null;
        try {
            User user = userRepository.findByUsername(username);
            connectionRequest = connectionRequestRepository.findAllByUser1(user);
            
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
        return connectionRequest;
    }
    
    public Iterable<ConnectionRequest> getAllReceivedConnectionRequests(String username) {
    	Iterable<ConnectionRequest> connectionRequest = null;
        try {
            User user = userRepository.findByUsername(username);
            connectionRequest = connectionRequestRepository.findAllByUser1(user);
            
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
        return connectionRequest;
    }
    
    public int getNumberConnectionRequests(String username) {
    	try {
            User user = userRepository.findByUsername(username);
            int numConnections = connectionRequestRepository.findAllByUser1(user).size();
            return numConnections;
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
    	
    	return 0;
    }

    public void deleteConnectionRequest(Long id) {
    	ConnectionRequest connectionRequest = connectionRequestRepository.findById(id).get();
        if (connectionRequest == null) {
            throw new EducationIdException("Cannot delete ConnectionRequest with ID '" + id + "'. This connectionRequest does not exist");
        }
        connectionRequestRepository.delete(connectionRequest);
    }

}
