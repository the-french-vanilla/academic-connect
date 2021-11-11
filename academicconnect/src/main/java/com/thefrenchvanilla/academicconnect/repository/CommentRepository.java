package com.thefrenchvanilla.academicconnect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Comment;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {

    @Override
    Iterable<Comment> findAll();
}
