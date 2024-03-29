package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Contact;
import com.thefrenchvanilla.academicconnect.payload.AcceptConnectionRequestRequest;
import com.thefrenchvanilla.academicconnect.payload.CreateContactIfNotExistRequest;
import com.thefrenchvanilla.academicconnect.service.ContactService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createContact(@Valid @RequestBody Contact contact, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Contact contact1 = contactService.createOrUpdateContact(contact, principal.getName());
        return new ResponseEntity<Contact>(contact1, HttpStatus.CREATED);
    }
    
    @PostMapping("/createifnotexist")
    public ResponseEntity<?> createContactIfNotExist(@Valid @RequestBody CreateContactIfNotExistRequest createContactIfNotExistRequest, Principal principal) {
    	Contact contact = contactService.createContactIfNotExist(createContactIfNotExistRequest.getUsername(), principal.getName());
        return new ResponseEntity<Contact>(contact, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getContact(@PathVariable Long id, Principal principal) {
    	Contact contact = contactService.getContact(id);
        return new ResponseEntity<Contact>(contact, HttpStatus.OK);
    }
    
    @GetMapping("/{id}/othercontactid")
    public ResponseEntity<?> getOtherContactId(@PathVariable Long id, Principal principal) {
    	Long contactId = contactService.getOtherContactId(id);
    	return new ResponseEntity<Long>(contactId, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Contact> getAllContacts(Principal principal) {
    	return contactService.getAllContacts(principal.getName());
    }
    
    @GetMapping("/firstContactId")
    public ResponseEntity<?> getFirstContactId(Principal principal) {
    	Long contactId = contactService.getFirstContactId(principal.getName());
    	return new ResponseEntity<Long>(contactId, HttpStatus.OK);
    }
    
    @GetMapping("/firstOtherContactId")
    public ResponseEntity<?> getFirstOtherContactId(Principal principal) {
    	Long contactId = contactService.getFirstOtherContactId(principal.getName());
    	return new ResponseEntity<Long>(contactId, HttpStatus.OK);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateContact(@Valid @RequestBody Contact contact, BindingResult result, 
    												  @PathVariable Long id, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Contact contact1 = contactService.updateContact(contact, id, principal.getName());
        return new ResponseEntity<Contact>(contact1, HttpStatus.OK);
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Long id) {
    	contactService.deleteContact(id);
        return new ResponseEntity<String>("Contact with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
