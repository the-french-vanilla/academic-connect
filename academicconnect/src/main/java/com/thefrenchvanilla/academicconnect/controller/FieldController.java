package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.Field;
import com.thefrenchvanilla.academicconnect.service.FieldService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/field")
@CrossOrigin(origins = "http://localhost:3000")
public class FieldController {

    @Autowired
    private FieldService fieldService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createField(@Valid @RequestBody Field field, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Field field1 = fieldService.createOrUpdateField(field);
        return new ResponseEntity<Field>(field1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getField(@PathVariable Long id) {
    	Field field = fieldService.getField(id);
        return new ResponseEntity<Field>(field, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Field> getAllFields() {
    	return fieldService.getAllFields();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateField(@Valid @RequestBody Field field, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        Field field1 = fieldService.createOrUpdateField(field);
        return new ResponseEntity<Field>(field1, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteField(@PathVariable Long id) {
    	fieldService.deleteField(id);
        return new ResponseEntity<String>("Field with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
