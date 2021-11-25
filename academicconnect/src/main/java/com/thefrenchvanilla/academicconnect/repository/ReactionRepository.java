package com.thefrenchvanilla.academicconnect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Comment;
import com.thefrenchvanilla.academicconnect.entity.Reaction;

@Repository
public interface ReactionRepository extends CrudRepository<Reaction, Long> {

    @Override
    Iterable<Reaction> findAll();
}
