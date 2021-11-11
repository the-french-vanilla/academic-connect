package com.thefrenchvanilla.academicconnect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.ChatMessage;

@Repository
public interface ChatMessageRepository extends CrudRepository<ChatMessage, Long> {

    @Override
    Iterable<ChatMessage> findAll();
}
