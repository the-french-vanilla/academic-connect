package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Notification;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/notification")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNotification(@Valid @RequestBody Notification notification, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Notification notification1 = notificationService.createOrUpdateNotification(notification, principal.getName());
        return new ResponseEntity<Notification>(notification1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getNotification(@PathVariable Long id) {
    	Notification notification = notificationService.getNotification(id);
        return new ResponseEntity<Notification>(notification, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Notification> getAllNotifications() {
    	return notificationService.getAllNotifications();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateNotification(@Valid @RequestBody Notification notification, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Notification notification1 = notificationService.createOrUpdateNotification(notification, principal.getName());
        return new ResponseEntity<Notification>(notification1, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long id) {
    	notificationService.deleteNotification(id);
        return new ResponseEntity<String>("Notification with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
