package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.UserEvent;

@Repository
public interface UserEventRepository extends CrudRepository<UserEvent, Long> {

    @Override
    Iterable<UserEvent> findAll();
    
    List<UserEvent> findAllByUser(User user);
}
