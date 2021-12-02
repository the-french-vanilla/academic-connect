package com.thefrenchvanilla.academicconnect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.User;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
    User getById(Long id);
	List<User> findAllByUsernameContaining(String username);
}

//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import com.thefrenchvanilla.academicconnect.entity.User;
//
//public interface UserRepository extends JpaRepository<User, Integer> {
//
//	// add a method to sort by last name
//	public List<User> findAllByOrderByLastNameAsc();
//
//}
