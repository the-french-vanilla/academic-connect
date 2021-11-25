package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.ConnectionRequest;
import com.thefrenchvanilla.academicconnect.entity.User;

@Repository
public interface ConnectionRequestRepository extends CrudRepository<ConnectionRequest, Long> {

    @Override
    Iterable<ConnectionRequest> findAll();
    
    List<ConnectionRequest> findAllByUser1(User user1);
}
