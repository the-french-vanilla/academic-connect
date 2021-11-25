package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Education;
import com.thefrenchvanilla.academicconnect.entity.ResearchExperience;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.repository.EducationRepository;
import com.thefrenchvanilla.academicconnect.repository.ResearchExperienceRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class ResearchExperienceService {

    @Autowired
    private ResearchExperienceRepository researchExperienceRepository;

    @Autowired
    private UserRepository userRepository;

    public ResearchExperience createOrUpdateResearchExperience(ResearchExperience researchExperience, String username) {
        try {
            User user = userRepository.findByUsername(username);
            researchExperience.setUser(user);
            return researchExperienceRepository.save(researchExperience);
        } catch (Exception e) {
        	throw new EducationIdException("ResearchExperience ID '" + researchExperience.getId() + "' already exists");
        }
    }
    
    public ResearchExperience getResearchExperience(Long id) {
    	ResearchExperience researchExperience;
    	try {
    		researchExperience = researchExperienceRepository.findById(id).get();
    		if (researchExperience == null) {
                throw new EducationIdException("ResearchExperience ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("ResearchExperience ID '" + id + "' does not exist");
    	}
        return researchExperience;
    }

    public Iterable<ResearchExperience> getAllResearchExperiences() {
        return researchExperienceRepository.findAll();
    }

    public void deleteResearchExperience(Long id) {
    	ResearchExperience researchExperience = researchExperienceRepository.findById(id).get();
        if (researchExperience == null) {
            throw new EducationIdException("Cannot delete ResearchExperience with ID '" + id + "'. This researchExperience does not exist");
        }
        researchExperienceRepository.delete(researchExperience);
    }

}
