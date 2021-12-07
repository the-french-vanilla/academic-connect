package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.PageLike;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.PageLikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/userpage")
@CrossOrigin(origins = "http://localhost:3000")
public class PageLikeController {

    @Autowired
    private PageLikeService userPageService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createUserPage(@Valid @RequestBody PageLike userPage, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        PageLike userPage1 = userPageService.createOrUpdateUserPage(userPage, principal.getName());
        return new ResponseEntity<PageLike>(userPage1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserPage(@PathVariable Long id) {
    	PageLike userPage = userPageService.getUserPage(id);
        return new ResponseEntity<PageLike>(userPage, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<PageLike> getAllUserPages(Principal principal) {
    	return userPageService.getAllUserPages(principal.getName());
    }
    
    @GetMapping("/number")
    public int getNumberUserPages(Principal principal) {
    	return userPageService.getNumberUserPages(principal.getName());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserPage(@Valid @RequestBody PageLike userPage, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        PageLike userPage1 = userPageService.createOrUpdateUserPage(userPage, principal.getName());
        return new ResponseEntity<PageLike>(userPage1, HttpStatus.OK);
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserPage(@PathVariable Long id) {
    	userPageService.deleteUserPage(id);
        return new ResponseEntity<String>("UserPage with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
