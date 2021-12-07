package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Education;
import com.thefrenchvanilla.academicconnect.entity.ResearchExperience;
import com.thefrenchvanilla.academicconnect.service.EducationService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.ResearchExperienceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/researchexperience")
@CrossOrigin(origins = "http://localhost:3000")
public class ResearchExperienceController {

    @Autowired
    private ResearchExperienceService researchExperienceService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createResearchExperience(@Valid @RequestBody ResearchExperience researchExperience, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        ResearchExperience researchExperience1 = researchExperienceService.createOrUpdateResearchExperience(researchExperience, principal.getName());
        return new ResponseEntity<ResearchExperience>(researchExperience1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getResearchExperience(@PathVariable Long id) {
    	ResearchExperience researchExperience = researchExperienceService.getResearchExperience(id);
        return new ResponseEntity<ResearchExperience>(researchExperience, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<ResearchExperience> getAllResearchExperiences() {
    	return researchExperienceService.getAllResearchExperiences();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateResearchExperience(@Valid @RequestBody ResearchExperience researchExperience, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        ResearchExperience education1 = researchExperienceService.createOrUpdateResearchExperience(researchExperience, principal.getName());
        return new ResponseEntity<ResearchExperience>(education1, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResearchExperience(@PathVariable Long id) {
    	researchExperienceService.deleteResearchExperience(id);
        return new ResponseEntity<String>("ResearchExperience with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
