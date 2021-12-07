package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Comment;
import com.thefrenchvanilla.academicconnect.service.CommentService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createComment(@Valid @RequestBody Comment comment, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Comment comment1 = commentService.createOrUpdateComment(comment, principal.getName());
        return new ResponseEntity<Comment>(comment1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getComment(@PathVariable Long id) {
    	Comment comment = commentService.getComment(id);
        return new ResponseEntity<Comment>(comment, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Comment> getAllComments() {
    	return commentService.getAllComments();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateComment(@Valid @RequestBody Comment comment, BindingResult result, 
    											  @PathVariable Long id, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Comment comment1 = commentService.updateComment(comment, id, principal.getName());
        return new ResponseEntity<Comment>(comment1, HttpStatus.OK);
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) {
    	commentService.deleteComment(id);
        return new ResponseEntity<String>("Comment with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
