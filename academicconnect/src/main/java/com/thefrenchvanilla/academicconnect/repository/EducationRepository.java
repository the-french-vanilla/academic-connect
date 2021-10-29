package com.thefrenchvanilla.academicconnect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Education;

@Repository
public interface EducationRepository extends CrudRepository<Education, Long> {

	Education findByEducationId(String educationId);

    @Override
    Iterable<Education> findAll();
}
