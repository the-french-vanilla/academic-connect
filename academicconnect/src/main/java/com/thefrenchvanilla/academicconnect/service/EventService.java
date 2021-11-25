package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Event;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.PostIdException;
import com.thefrenchvanilla.academicconnect.repository.EventRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public Event createOrUpdateEvent(Event event, String username) {
    	try {
            return eventRepository.save(event);
        } catch (Exception e) {
        	throw new EducationIdException("Event ID '" + event.getId() + "' already exists");
        }
    }
    
    public Event getEvent(Long id) {
    	Event page;
    	try {
    		page = eventRepository.findById(id).get();
    		if (page == null) {
                throw new EducationIdException("Event ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("Event ID '" + id + "' does not exist");
    	}
        return page;
    }

    public Iterable<Event> getAllEvents(String username) {
    	return eventRepository.findAll();
    }
    
    public int getNumberEvents(String username) {
    	try {
            User user = userRepository.findByUsername(username);
            int numConnections = eventRepository.findAllByUser(user).size();
            return numConnections;
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
    	
    	return 0;
    }
    
    public Event updateEvent(Long id, String username){
    	Event event = eventRepository.findById(id).get();
        if(event == null) {
            throw new PostIdException("Cannot Event with ID '" + id + "'. This event does not exist");
        }
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
    	Event event = eventRepository.findById(id).get();
        if (event == null) {
            throw new EducationIdException("Cannot delete Event with ID '" + id + "'. This event does not exist");
        }
        eventRepository.delete(event);
    }

}
