package com.thefrenchvanilla.academicconnect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.UserProfile;

import java.util.List;

@Repository
public interface UserProfileRepository extends CrudRepository<UserProfile, Long> {

//    User findByUsername(String username);
//    User getById(Long id);
    
    UserProfile getByUserId(Long id);
    UserProfile findByUserId(Long id);
    
    UserProfile findByUser(User user);
	List<UserProfile> findByUserIn(List<User> users);
}
