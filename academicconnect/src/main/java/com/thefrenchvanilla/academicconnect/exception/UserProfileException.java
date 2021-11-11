package com.thefrenchvanilla.academicconnect.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserProfileException extends RuntimeException {

    public UserProfileException(String message) {
        super(message);
    }
}
