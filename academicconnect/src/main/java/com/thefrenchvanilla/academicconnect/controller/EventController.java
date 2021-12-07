package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Event;
import com.thefrenchvanilla.academicconnect.entity.Page;
import com.thefrenchvanilla.academicconnect.service.EventService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/event")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createEvent(@Valid @RequestBody Event event, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Event event1 = eventService.createOrUpdateEvent(event, principal.getName());
        return new ResponseEntity<Event>(event1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getEvent(@PathVariable Long id) {
    	Event event = eventService.getEvent(id);
        return new ResponseEntity<Event>(event, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Event> getAllEvents(Principal principal) {
    	return eventService.getAllEvents(principal.getName());
    }
    
    @GetMapping("/number")
    public int getNumberEvents(Principal principal) {
    	return eventService.getNumberEvents(principal.getName());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@Valid @RequestBody Event event, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Event event1 = eventService.createOrUpdateEvent(event, principal.getName());
        return new ResponseEntity<Event>(event1, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
    	eventService.deleteEvent(id);
        return new ResponseEntity<String>("Event with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
