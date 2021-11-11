package com.thefrenchvanilla.academicconnect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Field;

@Repository
public interface FieldRepository extends CrudRepository<Field, Long> {

    @Override
    Iterable<Field> findAll();
}
