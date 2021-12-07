package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Reaction;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.ReactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/reaction")
@CrossOrigin(origins = "http://localhost:3000")
public class ReactionController {

    @Autowired
    private ReactionService reactionService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createReaction(@Valid @RequestBody Reaction reaction, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Reaction reaction1 = reactionService.createOrUpdateReaction(reaction, principal.getName());
        return new ResponseEntity<Reaction>(reaction1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getReaction(@PathVariable Long id) {
    	Reaction reaction = reactionService.getReaction(id);
        return new ResponseEntity<Reaction>(reaction, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Reaction> getAllReactions() {
    	return reactionService.getAllReactions();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReaction(@Valid @RequestBody Reaction reaction, BindingResult result, 
    											  @PathVariable Long id, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Reaction reaction1 = reactionService.updateReaction(reaction, id, principal.getName());
        return new ResponseEntity<Reaction>(reaction1, HttpStatus.OK);
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReaction(@PathVariable Long id) {
    	reactionService.deleteReaction(id);
        return new ResponseEntity<String>("Reaction with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
