package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Page;
import com.thefrenchvanilla.academicconnect.entity.User;

@Repository
public interface PageRepository extends CrudRepository<Page, Long> {

    @Override
    Iterable<Page> findAll();
    
    List<Page> findAllByUser(User user);
}
