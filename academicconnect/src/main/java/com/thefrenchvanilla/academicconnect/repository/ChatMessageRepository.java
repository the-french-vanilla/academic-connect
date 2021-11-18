package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.ChatMessage;
import com.thefrenchvanilla.academicconnect.entity.Contact;
import com.thefrenchvanilla.academicconnect.entity.User;

@Repository
public interface ChatMessageRepository extends CrudRepository<ChatMessage, Long> {

    @Override
    Iterable<ChatMessage> findAll();
    
    List<ChatMessage> findAllByUser1(User user1);
    
    List<ChatMessage> findAllByContact(Contact contact);
}
