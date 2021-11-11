package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Education;
import com.thefrenchvanilla.academicconnect.entity.Post;
import com.thefrenchvanilla.academicconnect.service.EducationService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.PostService;

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
@RequestMapping("/api/post")
@CrossOrigin
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;


    @PostMapping("")
    public ResponseEntity<?> createNewPost(@Valid @RequestBody Post post, BindingResult result, Principal principal){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Post post1 = postService.saveOrUpdatePost(post, principal.getName());
        return new ResponseEntity<Post>(post1, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable String id){

    	Post post = postService.findPostById(id);

        return new ResponseEntity<Post>(post, HttpStatus.OK);
    }


    @GetMapping("/all")
    public Iterable<Post> getAllPosts(){return postService.findAllPosts();}
    
    @PatchMapping("/{id}")
    public ResponseEntity<?> updatePost(@Valid @RequestBody Post post, BindingResult result,
                                               @PathVariable String id, Principal principal ){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        Post post1 = postService.updatePostById(post,id, principal.getName());

        return new ResponseEntity<Post>(post1,HttpStatus.OK);

    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable String id){
    	postService.deletePostById(id);

        return new ResponseEntity<String>("Post with ID: '"+id+"' was deleted", HttpStatus.OK);
    }
}
