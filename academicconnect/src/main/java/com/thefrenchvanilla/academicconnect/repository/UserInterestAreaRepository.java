package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.UserInterestArea;
import com.thefrenchvanilla.academicconnect.entity.UserProfile;

@Repository
public interface UserInterestAreaRepository extends CrudRepository<UserInterestArea, Long> {

    @Override
    Iterable<UserInterestArea> findAll();
    
    //List<UserInterestArea> findAllByUser1(User user1);
}
