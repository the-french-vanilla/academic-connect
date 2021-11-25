package com.thefrenchvanilla.academicconnect.payload;

import javax.validation.constraints.NotBlank;

public class UpdateUserProfileRequest {
	
	@NotBlank(message = "Headline cannot be blank")
    private String headline;

    @NotBlank(message = "About cannot be blank")
    private String about;

	public String getHeadline() {
		return headline;
	}

	public void setHeadline(String headline) {
		this.headline = headline;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}
    
}
