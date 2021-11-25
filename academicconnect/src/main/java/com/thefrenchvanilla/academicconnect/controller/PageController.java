package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Page;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/page")
@CrossOrigin
public class PageController {

    @Autowired
    private PageService pageService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createPage(@Valid @RequestBody Page page, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Page page1 = pageService.createOrUpdatePage(page, principal.getName());
        return new ResponseEntity<Page>(page1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getPage(@PathVariable Long id) {
    	Page page = pageService.getPage(id);
        return new ResponseEntity<Page>(page, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Page> getAllPages(Principal principal) {
    	return pageService.getAllPages(principal.getName());
    }
    
    @GetMapping("/number")
    public int getNumberPages(Principal principal) {
    	return pageService.getNumberPages(principal.getName());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePage(@Valid @RequestBody Page page, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Page page1 = pageService.createOrUpdatePage(page, principal.getName());
        return new ResponseEntity<Page>(page1, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePage(@PathVariable Long id) {
    	pageService.deletePage(id);
        return new ResponseEntity<String>("Page with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
