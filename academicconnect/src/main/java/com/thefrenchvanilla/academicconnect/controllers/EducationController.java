package com.thefrenchvanilla.academicconnect.controllers;

import com.thefrenchvanilla.academicconnect.services.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.entity.Education;
import com.thefrenchvanilla.academicconnect.services.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/education")
@CrossOrigin
public class EducationController {

    @Autowired
    private EducationService educationService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;


    @PostMapping("")
    public ResponseEntity<?> createNewEducation(@Valid @RequestBody Education education, BindingResult result, Principal principal){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Education project1 = educationService.saveOrUpdateEducation(education, principal.getName());
        return new ResponseEntity<Education>(project1, HttpStatus.CREATED);
    }


    @GetMapping("/{educationId}")
    public ResponseEntity<?> getEducationById(@PathVariable String educationId){

    	Education education = educationService.findEducationById(educationId);

        return new ResponseEntity<Education>(education, HttpStatus.OK);
    }


    @GetMapping("/all")
    public Iterable<Education> getAllEducations(){return educationService.findAllEducations();}


    @DeleteMapping("/{educationId}")
    public ResponseEntity<?> deleteEducation(@PathVariable String educationId){
    	educationService.deleteEducationById(educationId);

        return new ResponseEntity<String>("Education with ID: '"+educationId+"' was deleted", HttpStatus.OK);
    }
}
