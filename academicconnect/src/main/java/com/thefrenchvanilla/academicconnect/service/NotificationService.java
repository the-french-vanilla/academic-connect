package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.Notification;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.repository.ConnectionRepository;
import com.thefrenchvanilla.academicconnect.repository.NotificationRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    public Notification createOrUpdateNotification(Notification notification, String username) {
        try {
            User user = userRepository.findByUsername(username);
            notification.setUser(user);
            return notificationRepository.save(notification);
        } catch (Exception e) {
        	throw new EducationIdException("Notification ID '" + notification.getId() + "' already exists");
        }
    }
    
    public Notification getNotification(Long id) {
    	Notification notification;
    	try {
    		notification = notificationRepository.findById(id).get();
    		if (notification == null) {
                throw new EducationIdException("Notification ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("Notification ID '" + id + "' does not exist");
    	}
        return notification;
    }

    public Iterable<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public void deleteNotification(Long id) {
    	Notification notification = notificationRepository.findById(id).get();
        if (notification == null) {
            throw new EducationIdException("Cannot delete Notification with ID '" + id + "'. This notification does not exist");
        }
        notificationRepository.delete(notification);
    }

}
