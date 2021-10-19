package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thefrenchvanilla.academicconnect.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	// add a method to sort by last name
	public List<User> findAllByOrderByLastNameAsc();

}











