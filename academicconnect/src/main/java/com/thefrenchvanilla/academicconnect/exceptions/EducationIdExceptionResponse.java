package com.thefrenchvanilla.academicconnect.exceptions;

public class EducationIdExceptionResponse {

    private String educationId;

    public EducationIdExceptionResponse(String educationId) {
        this.educationId = educationId;
    }

    public String getEducationId() {
        return educationId;
    }

    public void setEducationId(String educationId) {
        this.educationId = educationId;
    }
}