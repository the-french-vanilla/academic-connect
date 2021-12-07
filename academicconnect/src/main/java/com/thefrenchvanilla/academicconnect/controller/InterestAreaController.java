package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.InterestArea;
import com.thefrenchvanilla.academicconnect.entity.TrendingNews;
import com.thefrenchvanilla.academicconnect.service.InterestAreaService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.TrendingNewsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/interest")
@CrossOrigin(origins = "http://localhost:3000")
public class InterestAreaController {

    @Autowired
    private InterestAreaService interestAreaService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createTrendingNews(@Valid @RequestBody InterestArea interestArea, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        InterestArea interestArea1 = interestAreaService.createOrUpdateInterestArea(interestArea);
        return new ResponseEntity<InterestArea>(interestArea1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getInterestArea(@PathVariable Long id) {
    	InterestArea interestArea = interestAreaService.getInterestArea(id);
        return new ResponseEntity<InterestArea>(interestArea, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<InterestArea> getAllInterestAreas() {
    	return interestAreaService.getAllInterestAreas();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateInterestArea(@Valid @RequestBody InterestArea interestArea, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        InterestArea interestArea1 = interestAreaService.createOrUpdateInterestArea(interestArea);
        return new ResponseEntity<InterestArea>(interestArea1, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInterestArea(@PathVariable Long id) {
    	interestAreaService.deleteInterestArea(id);
        return new ResponseEntity<String>("InterestArea with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
