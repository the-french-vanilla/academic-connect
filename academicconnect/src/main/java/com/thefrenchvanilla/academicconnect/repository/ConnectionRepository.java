package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.UserProfile;

@Repository
public interface ConnectionRepository extends CrudRepository<Connection, Long> {

    @Override
    Iterable<Connection> findAll();
    
    List<Connection> findAllByUser1(User user1);
}
