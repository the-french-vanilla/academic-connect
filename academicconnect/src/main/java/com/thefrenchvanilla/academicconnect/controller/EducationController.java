package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Education;
import com.thefrenchvanilla.academicconnect.service.EducationService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = "http://localhost:3000")
public class EducationController {

    @Autowired
    private EducationService educationService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createEducation(@Valid @RequestBody Education education, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Education education1 = educationService.createOrUpdateEducation(education, principal.getName());
        return new ResponseEntity<Education>(education1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getEducation(@PathVariable Long id) {
    	Education education = educationService.getEducation(id);
        return new ResponseEntity<Education>(education, HttpStatus.OK);
    }

    @GetMapping("/all/{username}")
    public Iterable<Education> getAllEducations(@PathVariable String username) {
    	return educationService.getAllEducations(username);
    }
    
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateEducation(@Valid @RequestBody Education education, BindingResult result, Principal principal) {
//        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
//        if (errorMap != null) {
//        	return errorMap;
//        }
//
//        Education education1 = educationService.createOrUpdateEducation(education, principal.getName());
//        return new ResponseEntity<Education>(education1, HttpStatus.OK);
//    }
    
    @PutMapping("")
    public ResponseEntity<?> updateEducation(@Valid @RequestBody Education education, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Education education1 = educationService.createOrUpdateEducation(education, principal.getName());
        return new ResponseEntity<Education>(education1, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEducation(@PathVariable Long id) {
    	educationService.deleteEducation(id);
        return new ResponseEntity<String>("Education with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
