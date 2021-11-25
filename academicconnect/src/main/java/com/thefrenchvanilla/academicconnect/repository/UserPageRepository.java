package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.PageLike;

@Repository
public interface UserPageRepository extends CrudRepository<PageLike, Long> {

    @Override
    Iterable<PageLike> findAll();
    
    List<PageLike> findAllByUser(User user);
}
