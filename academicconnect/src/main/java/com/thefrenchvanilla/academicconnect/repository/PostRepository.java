package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Post;
import com.thefrenchvanilla.academicconnect.entity.User;

@Repository
public interface PostRepository extends CrudRepository<Post, Long> {

    @Override
    Iterable<Post> findAll();
    
    List<Post> findAllByUserOrderByCreateAtDesc(User user);
    
    Iterable<Post> findAllByUserInOrderByCreateAtDesc(Set<User> user);
}
