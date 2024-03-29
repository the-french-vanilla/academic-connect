package com.thefrenchvanilla.academicconnect.exception;

public class EducationNotFoundExceptionResponse {

    private String educationNotFound;

    public EducationNotFoundExceptionResponse(String educationNotFound) {
    	this.educationNotFound = educationNotFound;
    }

    public String getEducationNotFound() {
        return educationNotFound;
    }

    public void setEducationNotFound(String educationNotFound) {
    	this.educationNotFound = educationNotFound;
    }
}
