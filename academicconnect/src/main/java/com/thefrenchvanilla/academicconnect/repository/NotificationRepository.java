package com.thefrenchvanilla.academicconnect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Notification;

@Repository
public interface NotificationRepository extends CrudRepository<Notification, Long> {

    @Override
    Iterable<Notification> findAll();
}
