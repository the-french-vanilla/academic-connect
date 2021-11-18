package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.Publication;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.UserGroup;

@Repository
public interface GroupRepository extends CrudRepository<UserGroup, Long> {

    @Override
    Iterable<UserGroup> findAll();
    
    //List<UserGroup> findAllByUser(User user);
}
