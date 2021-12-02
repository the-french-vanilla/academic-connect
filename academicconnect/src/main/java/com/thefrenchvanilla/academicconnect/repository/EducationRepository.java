package com.thefrenchvanilla.academicconnect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Education;
import com.thefrenchvanilla.academicconnect.entity.User;

@Repository
public interface EducationRepository extends CrudRepository<Education, Long> {

    @Override
    Iterable<Education> findAll();
    
	Iterable<Education> findAllByUser(User user);
}
