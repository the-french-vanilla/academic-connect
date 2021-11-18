package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.Publication;
import com.thefrenchvanilla.academicconnect.entity.User;

@Repository
public interface PublicationRepository extends CrudRepository<Publication, Long> {

    @Override
    Iterable<Publication> findAll();
    
    List<Publication> findAllByUser(User user);
}
