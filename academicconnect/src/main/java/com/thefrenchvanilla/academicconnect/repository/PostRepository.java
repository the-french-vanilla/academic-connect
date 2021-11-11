package com.thefrenchvanilla.academicconnect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Post;

@Repository
public interface PostRepository extends CrudRepository<Post, Long> {

	Post findById(String id);

    @Override
    Iterable<Post> findAll();
}
