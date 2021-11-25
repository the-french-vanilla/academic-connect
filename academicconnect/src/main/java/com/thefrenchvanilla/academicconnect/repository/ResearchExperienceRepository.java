package com.thefrenchvanilla.academicconnect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Education;
import com.thefrenchvanilla.academicconnect.entity.ResearchExperience;

@Repository
public interface ResearchExperienceRepository extends CrudRepository<ResearchExperience, Long> {

    @Override
    Iterable<ResearchExperience> findAll();
}
