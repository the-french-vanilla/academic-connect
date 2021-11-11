package com.thefrenchvanilla.academicconnect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Connection;

@Repository
public interface ConnectionRepository extends CrudRepository<Connection, Long> {

    @Override
    Iterable<Connection> findAll();
}
