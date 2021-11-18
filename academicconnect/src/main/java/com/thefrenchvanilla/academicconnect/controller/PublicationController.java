package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Notification;
import com.thefrenchvanilla.academicconnect.entity.Publication;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.NotificationService;
import com.thefrenchvanilla.academicconnect.service.PublicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/publication")
@CrossOrigin
public class PublicationController {

    @Autowired
    private PublicationService publicationService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createPublication(@Valid @RequestBody Publication publication, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Publication notification1 = publicationService.createOrUpdatePublication(publication, principal.getName());
        return new ResponseEntity<Publication>(notification1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getPublication(@PathVariable Long id) {
    	Publication notification = publicationService.getPublication(id);
        return new ResponseEntity<Publication>(notification, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Publication> getAllPublications() {
    	return publicationService.getAllPublications();
    }
    
    @GetMapping("/number")
    public int getNumberPublications(Principal principal) {
    	return publicationService.getNumberPublications(principal.getName());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePublication(@Valid @RequestBody Publication publication, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Publication notification1 = publicationService.createOrUpdatePublication(publication, principal.getName());
        return new ResponseEntity<Publication>(notification1, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePublication(@PathVariable Long id) {
    	publicationService.deletePublication(id);
        return new ResponseEntity<String>("Publication with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
