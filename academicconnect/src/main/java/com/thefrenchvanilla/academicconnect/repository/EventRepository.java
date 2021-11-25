package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Event;
import com.thefrenchvanilla.academicconnect.entity.User;

@Repository
public interface EventRepository extends CrudRepository<Event, Long> {

    @Override
    Iterable<Event> findAll();
    
    List<Event> findAllByUser(User user);
}
