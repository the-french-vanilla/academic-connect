package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Education;
import com.thefrenchvanilla.academicconnect.service.EducationService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;

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

        Education education1 = educationService.saveOrUpdateEducation(education, principal.getName());
        return new ResponseEntity<Education>(education1, HttpStatus.CREATED);
    }


    @GetMapping("/{educationId}")
    public ResponseEntity<?> getEducationById(@PathVariable String educationId){

    	Education education = educationService.findEducationById(educationId);

        return new ResponseEntity<Education>(education, HttpStatus.OK);
    }


    @GetMapping("/all")
    public Iterable<Education> getAllEducations(){
    	return educationService.findAllEducations();
    	//return null;
    }


    @DeleteMapping("/{educationId}")
    public ResponseEntity<?> deleteEducation(@PathVariable String educationId){
    	educationService.deleteEducationById(educationId);

        return new ResponseEntity<String>("Education with ID: '"+educationId+"' was deleted", HttpStatus.OK);
    }
}
