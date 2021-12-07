package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Post;
import com.thefrenchvanilla.academicconnect.payload.CreatePostRequest;
import com.thefrenchvanilla.academicconnect.payload.CreatePostResponse;
import com.thefrenchvanilla.academicconnect.payload.JWTLoginSucessReponse;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/post")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;


    @PostMapping("")
    public ResponseEntity<?> createPost(@Valid @RequestBody CreatePostRequest postRequest, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }
        
        Post post = new Post(postRequest.getText());

        Post post1 = postService.saveOrUpdatePost(post, principal.getName());
        //return new ResponseEntity<Post>(post1, HttpStatus.CREATED);
        
        return ResponseEntity.ok(new CreatePostResponse(post1.getId(), post1.getUser().getUsername(), 
        		post1.getText(), post1.getDeleted(), post1.getCreateAt()));
        
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPost(@PathVariable Long id) {
    	Post post = postService.getPost(id);
        return new ResponseEntity<Post>(post, HttpStatus.OK);
    }

    @GetMapping("/all/{username}")
    public Iterable<Post> getAllPosts(@PathVariable String username) {
    	return postService.findAllPosts(username);
    }
    
    @GetMapping("/allinfeed")
    public Iterable<Post> getAllPostsInFeed(Principal principal) {
    	return postService.findAllPostsInFeed(principal.getName());
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<?> updatePost(@Valid @RequestBody Post post, BindingResult result,
                                               @PathVariable Long id, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Post post1 = postService.updatePost(post, id, principal.getName());
        return new ResponseEntity<Post>(post1,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
    	postService.deletePost(id);
        return new ResponseEntity<String>("Post with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
