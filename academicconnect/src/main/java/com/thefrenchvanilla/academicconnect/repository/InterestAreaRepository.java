package com.thefrenchvanilla.academicconnect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.InterestArea;

@Repository
public interface InterestAreaRepository extends CrudRepository<InterestArea, Long> {

    @Override
    Iterable<InterestArea> findAll();
}
