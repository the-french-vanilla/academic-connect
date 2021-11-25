package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.SuggestedUser;
import com.thefrenchvanilla.academicconnect.entity.User;

@Repository
public interface SuggestedUserRepository extends CrudRepository<SuggestedUser, Long> {

    @Override
    Iterable<SuggestedUser> findAll();
    
    List<SuggestedUser> findAllByUser1(User user1);
}
