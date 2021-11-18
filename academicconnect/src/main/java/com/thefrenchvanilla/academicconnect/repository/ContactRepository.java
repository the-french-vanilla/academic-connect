package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.ChatMessage;
import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.Contact;
import com.thefrenchvanilla.academicconnect.entity.User;

@Repository
public interface ContactRepository extends CrudRepository<Contact, Long> {

    @Override
    Iterable<Contact> findAll();
    
    List<Contact> findAllByUser1(User user1);
    
    List<Contact> findAllByUser2(User user2);
}
