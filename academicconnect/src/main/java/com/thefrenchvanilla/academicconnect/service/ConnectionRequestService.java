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
    private ConnectionRepository connectionRepository;

    @Autowired
    private UserRepository userRepository;

    public ConnectionRequest createOrUpdateConnectionRequest(String username2, String username) {
    	ConnectionRequest connectionRequest = new ConnectionRequest();
        try {
            User user = userRepository.findByUsername(username);
            User user2 = userRepository.findByUsername(username2);
            connectionRequest.setUser1(user);
            connectionRequest.setUser2(user2);
            return connectionRequestRepository.save(connectionRequest);
        } catch (Exception e) {
        	throw new EducationIdException("ConnectionRequest ID '" + connectionRequest.getId() + "' already exists");
        }
    }
    
    public boolean checkSendConnectionRequest(String username2, String username) {
        try {
            User user = userRepository.findByUsername(username);
            User user2 = userRepository.findByUsername(username2);
            return connectionRequestRepository.existsByUser1AndUser2(user, user2);
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
        return false;
	}
    
    public boolean checkReceivedConnectionRequest(String username2, String username) {
    	try {
            User user = userRepository.findByUsername(username);
            User user2 = userRepository.findByUsername(username2);
            return connectionRequestRepository.existsByUser1AndUser2(user2, user);
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
        return false;
	}
    
    public Iterable<ConnectionRequest> getSentConnectionRequests(String username) {
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

	public Iterable<ConnectionRequest> getReceivedConnectionRequests(String username) {
		Iterable<ConnectionRequest> connectionRequest = null;
        try {
            User user = userRepository.findByUsername(username);
            connectionRequest = connectionRequestRepository.findAllByUser2(user);
            
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
        return connectionRequest;
	}
	
	public void acceptConnectionRequest(String username2, String username) {
		Iterable<ConnectionRequest> connectionRequests = null;
		User user = null;
		User user2 = null;
		try {
            user = userRepository.findByUsername(username);
            user2 = userRepository.findByUsername(username2);
            connectionRequests = connectionRequestRepository.findAllByUser1AndUser2(user2, user);
            connectionRequestRepository.deleteAll(connectionRequests);
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
		
		Connection connection = new Connection();
		Connection connection2 = new Connection();
		try {
            connection.setUser1(user2);
            connection.setUser2(user);
            connection2.setUser1(user);
            connection2.setUser2(user2);
            connectionRepository.save(connection);
            connectionRepository.save(connection2);
        } catch (Exception e) {
        	throw new EducationIdException("Connection ID '" + connection.getId() + "' already exists");
        }
	}

	public void deleteConnectionRequest(String username2, String username) {
		Iterable<ConnectionRequest> connectionRequests = null;
		User user = null;
		User user2 = null;
		try {
            user = userRepository.findByUsername(username);
            user2 = userRepository.findByUsername(username2);
            connectionRequests = connectionRequestRepository.findAllByUser1AndUser2(user2, user);
            connectionRequestRepository.deleteAll(connectionRequests);
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
	}

	public void cancelConnectionRequest(String username2, String username) {
		Iterable<ConnectionRequest> connectionRequests = null;
		User user = null;
		User user2 = null;
		try {
            user = userRepository.findByUsername(username);
            user2 = userRepository.findByUsername(username2);
            connectionRequests = connectionRequestRepository.findAllByUser1AndUser2(user, user2);
            connectionRequestRepository.deleteAll(connectionRequests);
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
	}
    
    public ConnectionRequest getConnectionRequest(Long id) {
    	ConnectionRequest connectionRequest;
    	try {
    		connectionRequest = connectionRequestRepository.findById(id).get();
    		if (connectionRequest == null) {
                throw new EducationIdException("ConnectionRequest ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("ConnectionRequest ID '" + id + "' does not exist");
    	}
        return connectionRequest;
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

//    public void deleteConnectionRequest(Long id) {
//    	ConnectionRequest connectionRequest = connectionRequestRepository.findById(id).get();
//        if (connectionRequest == null) {
//            throw new EducationIdException("Cannot delete ConnectionRequest with ID '" + id + "'. This connectionRequest does not exist");
//        }
//        connectionRequestRepository.delete(connectionRequest);
//    }

}
