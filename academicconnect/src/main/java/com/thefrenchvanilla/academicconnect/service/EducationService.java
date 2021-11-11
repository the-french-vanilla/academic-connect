package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Education;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.repository.EducationRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class EducationService {

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private UserRepository userRepository;

    public Education createOrUpdateEducation(Education education, String username){
        try{
            User user = userRepository.findByUsername(username);
            education.setUser(user);

            return educationRepository.save(education);

        }catch (Exception e){
            //throw new EducationIdException("Education ID '"+education.getEducationId().toUpperCase()+"' already exists");
        	throw new EducationIdException("Education ID '"+education.getId()+"' already exists");
        }

    }


//    public Education findEducationById(String educationId){
//
//        //Only want to return the education if the user looking for it is the owner
//
//        Education education = educationRepository.findByEducationId(educationId.toUpperCase());
//
//        if(education == null){
//            throw new EducationIdException("Education ID '"+educationId+"' does not exist");
//
//        }
//
//
//        return education;
//    }
    
    public Education getEducation(Long id){

        //Only want to return the education if the user looking for it is the owner
    	
    	Education education;
    	
    	try {

    		education = educationRepository.findById(id).get();
    		
    		if(education == null){
                throw new EducationIdException("Education ID '"+id+"' does not exist");

            }
        
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("Education ID '"+id+"' does not exist");
    	}

        


        return education;
    }

    public Iterable<Education> getAllEducations(){
        return educationRepository.findAll();
    }


    public void deleteEducation(Long id){
        //Education education = educationRepository.findByEducationId(educationid.toUpperCase());
    	Education education = educationRepository.findById(id).get();

        if(education == null){
            throw  new  EducationIdException("Cannot Education with ID '"+id+"'. This education does not exist");
        }

        educationRepository.delete(education);
    }

}
