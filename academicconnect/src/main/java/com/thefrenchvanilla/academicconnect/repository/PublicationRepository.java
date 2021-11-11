package com.thefrenchvanilla.academicconnect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Publication;

@Repository
public interface PublicationRepository extends CrudRepository<Publication, Long> {

    @Override
    Iterable<Publication> findAll();
}
