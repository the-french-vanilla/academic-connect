package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.InterestArea;
import com.thefrenchvanilla.academicconnect.entity.TrendingNews;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.repository.InterestAreaRepository;
import com.thefrenchvanilla.academicconnect.repository.TrendingNewsRepository;

@Service
public class InterestAreaService {

    @Autowired
    private InterestAreaRepository interestAreaRepository;

    public InterestArea createOrUpdateInterestArea(InterestArea interestArea) {
        try {
            return interestAreaRepository.save(interestArea);
        } catch (Exception e) {
        	throw new EducationIdException("InterestArea ID '" + interestArea.getId() + "' already exists");
        }
    }
    
    public InterestArea getInterestArea(Long id) {
    	InterestArea interestArea;
    	try {
    		interestArea = interestAreaRepository.findById(id).get();
    		if (interestArea == null) {
                throw new EducationIdException("InterestArea ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("InterestArea ID '" + id + "' does not exist");
    	}
        return interestArea;
    }

    public Iterable<InterestArea> getAllInterestAreas() {
        return interestAreaRepository.findAll();
    }

    public void deleteInterestArea(Long id) {
    	InterestArea interestArea = interestAreaRepository.findById(id).get();
        if (interestArea == null) {
            throw new EducationIdException("Cannot delete InterestArea with ID '" + id + "'. This interest area does not exist");
        }
        interestAreaRepository.delete(interestArea);
    }

}
