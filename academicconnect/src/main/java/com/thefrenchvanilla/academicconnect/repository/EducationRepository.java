package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Education;
import com.thefrenchvanilla.academicconnect.entity.User;

@Repository
public interface EducationRepository extends CrudRepository<Education, Long> {

    @Override
    Iterable<Education> findAll();
    
    List<Education> findAllByUser(User user);
}
