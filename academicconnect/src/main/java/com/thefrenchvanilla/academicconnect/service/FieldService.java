package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Field;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.repository.FieldRepository;

@Service
public class FieldService {

    @Autowired
    private FieldRepository fieldRepository;

    public Field createOrUpdateField(Field field) {
        try {
            return fieldRepository.save(field);
        } catch (Exception e) {
        	throw new EducationIdException("Field ID '" + field.getId() + "' already exists");
        }
    }
    
    public Field getField(Long id) {
    	Field field;
    	try {
    		field = fieldRepository.findById(id).get();
    		if (field == null) {
                throw new EducationIdException("Field ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("Field ID '" + id + "' does not exist");
    	}
        return field;
    }

    public Iterable<Field> getAllFields() {
        return fieldRepository.findAll();
    }

    public void deleteField(Long id) {
    	Field field = fieldRepository.findById(id).get();
        if (field == null) {
            throw new EducationIdException("Cannot delete Field with ID '" + id + "'. This field does not exist");
        }
        fieldRepository.delete(field);
    }

}
