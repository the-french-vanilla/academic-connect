package com.thefrenchvanilla.academicconnect.service;

import java.security.Principal;
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
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class ConnectionService {

    @Autowired
    private ConnectionRepository connectionRepository;

    @Autowired
    private UserRepository userRepository;

    public Connection createOrUpdateConnection(Connection connection, String username) {
        try {
            User user = userRepository.findByUsername(username);
            connection.setUser1(user);
            return connectionRepository.save(connection);
        } catch (Exception e) {
        	throw new EducationIdException("Connection ID '" + connection.getId() + "' already exists");
        }
    }
    
    public void unconnect(String username2, String username) {
		Iterable<Connection> connections = null;
		Iterable<Connection> connections2 = null;
		User user = null;
		User user2 = null;
		try {
            user = userRepository.findByUsername(username);
            user2 = userRepository.findByUsername(username2);
            connections = connectionRepository.findAllByUser1AndUser2(user, user2);
            connections2 = connectionRepository.findAllByUser1AndUser2(user2, user);
            connectionRepository.deleteAll(connections);
            connectionRepository.deleteAll(connections2);
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
	}
    
    public Boolean getIsConnected(Principal principal, String username) {
    	User user1 = userRepository.findByUsername(principal.getName());
    	User user2 = userRepository.findByUsername(username);
		if (connectionRepository.countByUser1OrUser2(user1, user2) == 0) {
			return false;
		} else {
			return true;
		}
	}
    
    public Connection getConnection(Long id) {
    	Connection connection;
    	try {
    		connection = connectionRepository.findById(id).get();
    		if (connection == null) {
                throw new EducationIdException("Connection ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("Connection ID '" + id + "' does not exist");
    	}
        return connection;
    }

    public Iterable<Connection> getAllConnections(String username) {
    	Iterable<Connection> connections = null;
        try {
            User user = userRepository.findByUsername(username);
            connections = connectionRepository.findAllByUser1(user);
            
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
        return connections;
    }
    
    public int getNumberConnections(String username) {
    	try {
            User user = userRepository.findByUsername(username);
            int numConnections = connectionRepository.findAllByUser1(user).size();
            return numConnections;
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
    	
    	return 0;
    }

    public void deleteConnection(Long id) {
    	Connection connection = connectionRepository.findById(id).get();
        if (connection == null) {
            throw new EducationIdException("Cannot delete Connection with ID '" + id + "'. This connection does not exist");
        }
        connectionRepository.delete(connection);
    }

}
