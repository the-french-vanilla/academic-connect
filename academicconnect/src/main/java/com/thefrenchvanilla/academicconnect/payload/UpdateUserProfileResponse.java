package com.thefrenchvanilla.academicconnect.payload;

public class UpdateUserProfileResponse {

	private Long userId;
	private String headline;
    private String about;
    
	public UpdateUserProfileResponse(Long userId, String headline, String about) {
		this.userId = userId;
		this.headline = headline;
		this.about = about;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

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
