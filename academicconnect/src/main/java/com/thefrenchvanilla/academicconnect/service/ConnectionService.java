package com.thefrenchvanilla.academicconnect.service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.ConnectionRequest;
import com.thefrenchvanilla.academicconnect.entity.Post;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.UserProfile;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.PostIdException;
import com.thefrenchvanilla.academicconnect.repository.ConnectionRepository;
import com.thefrenchvanilla.academicconnect.repository.ConnectionRequestRepository;
import com.thefrenchvanilla.academicconnect.repository.UserProfileRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class ConnectionService {

	@Autowired
	private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;
    
    @Autowired
    private ConnectionRepository connectionRepository;
    
    @Autowired
    private ConnectionRequestRepository connectionRequestRepository;

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
    
    public Boolean getIsConnected(String username2, String username) {
    	User user = userRepository.findByUsername(username);
    	User user2 = userRepository.findByUsername(username2);
		if (connectionRepository.countByUser1AndUser2(user, user2) == 0) {
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

    public Iterable<Connection> getAllConnections(String username2, String username) {
    	User user = userRepository.findByUsername(username);
    	List<Connection> connections = connectionRepository.findAllByUser1(user);
    	List<String> usernames = new ArrayList<String>();
    	for (Connection connection : connections) {
    		usernames.add(connection.getUser2().getUsername());
    	}
    	
    	User user2 = userRepository.findByUsername(username2);
        List<Connection> connections2 = connectionRepository.findAllByUser1(user2);
        Collections.sort(connections2);
        
        for (Connection connection2 : connections2) {
        	User user3 = connection2.getUser2();
        	List<Connection> connections3 = connectionRepository.findAllByUser1(user3);
        	List<String> usernames3 = new ArrayList<String>();
        	for (Connection connection3 : connections3) {
        		usernames3.add(connection3.getUser2().getUsername());
        	}
        	
        	List<String> mutualUsernames = new ArrayList<String>();
            for (String usr : usernames) {
                if (usernames3.contains(usr)) {
                	mutualUsernames.add(usr);
                }
            }
            
            boolean connected = false;
            if (connectionRepository.countByUser1AndUser2(user, user3) > 0) {
            	connected = true;
    		}
            
            boolean connectionRequestSent = connectionRequestRepository.existsByUser1AndUser2(user, user3);
            boolean connectionRequestReceived = connectionRequestRepository.existsByUser1AndUser2(user3, user);
            
            UserProfile userProfile3 = userProfileRepository.getByUserId(user3.getId());
            
            connection2.setHeadline(userProfile3.getHeadline());
            connection2.setNumMutualConnections(mutualUsernames.size());
            connection2.setConnectionRequestSent(connectionRequestSent);
            connection2.setConnectionRequestReceived(connectionRequestReceived);
            connection2.setConnected(connected);
        }
        
//        if(userProfile == null){
//            throw new UserProfileException("User Profile id '"+userProfile.getId()+"' does not exist");
//        }
        return connections2;
//    	Iterable<Connection> connections = null;
//        try {
//            User user = userRepository.findByUsername(username2);
//            connections = connectionRepository.findAllByUser1(user);
//            
//        } catch (Exception e) {
//        	e.printStackTrace();
//            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
//        }
//        return connections;
    }
    
    public Iterable<Connection> getMutualConnections(String username2, String username) {
    	User user = userRepository.findByUsername(username);
    	List<Connection> connections = connectionRepository.findAllByUser1(user);
    	List<String> usernames = new ArrayList<String>();
    	for (Connection connection : connections) {
    		usernames.add(connection.getUser2().getUsername());
    	}
    	
    	User user2 = userRepository.findByUsername(username2);
        List<Connection> connections2 = connectionRepository.findAllByUser1(user2);
        //Collections.sort(connections2);
        List<String> usernames2 = new ArrayList<String>();
    	for (Connection connection2 : connections2) {
    		usernames2.add(connection2.getUser2().getUsername());
    	}
        
        List<String> mutualUsernames = new ArrayList<String>();
        for (String usr : usernames) {
            if (usernames2.contains(usr)) {
            	mutualUsernames.add(usr);
            }
        }
        
        List<User> users = userRepository.findAllByUsernameIn(mutualUsernames);
        List<Connection> mutualConnections =connectionRepository.findAllByUser1AndUser2In(user2, users);
        
        
        for (Connection mutualConnection : mutualConnections) {
        	User user3 = mutualConnection.getUser2();
        	List<Connection> connections3 = connectionRepository.findAllByUser1(user3);
        	List<String> usernames3 = new ArrayList<String>();
        	for (Connection connection3 : connections3) {
        		usernames3.add(connection3.getUser2().getUsername());
        	}
        	
        	List<String> mutualUsernames3 = new ArrayList<String>();
            for (String usr : usernames) {
                if (usernames3.contains(usr)) {
                	mutualUsernames3.add(usr);
                }
            }
            
            boolean connected = false;
            if (connectionRepository.countByUser1AndUser2(user, user3) > 0) {
            	connected = true;
    		}
            
            boolean connectionRequestSent = connectionRequestRepository.existsByUser1AndUser2(user, user3);
            boolean connectionRequestReceived = connectionRequestRepository.existsByUser1AndUser2(user3, user);
            
            UserProfile userProfile3 = userProfileRepository.getByUserId(user3.getId());
            
            mutualConnection.setHeadline(userProfile3.getHeadline());
            mutualConnection.setNumMutualConnections(mutualUsernames.size());
            mutualConnection.setConnectionRequestSent(connectionRequestSent);
            mutualConnection.setConnectionRequestReceived(connectionRequestReceived);
            mutualConnection.setConnected(connected);
        }
        
//        if(userProfile == null){
//            throw new UserProfileException("User Profile id '"+userProfile.getId()+"' does not exist");
//        }
        return mutualConnections;
	}
    
    public long getNumberConnections(String username) {
    	try {
            User user = userRepository.findByUsername(username);
            long numConnections = connectionRepository.countByUser1(user);
            return numConnections;
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
    	
    	return 0;
    }
    
    public long getNumberMutualConnections(String username2, String username) {
    	User user = userRepository.findByUsername(username);
    	List<Connection> connections = connectionRepository.findAllByUser1(user);
    	List<String> usernames = new ArrayList<String>();
    	for (Connection connection : connections) {
    		usernames.add(connection.getUser2().getUsername());
    	}
    	
    	User user2 = userRepository.findByUsername(username2);
        List<Connection> connections2 = connectionRepository.findAllByUser1(user2);
        //Collections.sort(connections2);
        List<String> usernames2 = new ArrayList<String>();
    	for (Connection connection2 : connections2) {
    		usernames2.add(connection2.getUser2().getUsername());
    	}
        
        List<String> mutualUsernames = new ArrayList<String>();
        for (String usr : usernames) {
            if (usernames2.contains(usr)) {
            	mutualUsernames.add(usr);
            }
        }
        
        List<User> users = userRepository.findAllByUsernameIn(mutualUsernames);
        long numMutualConnections = connectionRepository.countByUser1AndUser2In(user2, users);
        
        return numMutualConnections;
	}

    public void deleteConnection(Long id) {
    	Connection connection = connectionRepository.findById(id).get();
        if (connection == null) {
            throw new EducationIdException("Cannot delete Connection with ID '" + id + "'. This connection does not exist");
        }
        connectionRepository.delete(connection);
    }

}
