package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.UserProfile;
import com.thefrenchvanilla.academicconnect.payload.UpdateUserProfileRequest;
import com.thefrenchvanilla.academicconnect.payload.UpdateUserProfileResponse;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.UserProfileService;
import com.thefrenchvanilla.academicconnect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class UserProfileController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserProfileService userProfileService;

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserProfile(@PathVariable String username){

    	UserProfile userProfile = userProfileService.findUserProfile(username);

        return new ResponseEntity<UserProfile>(userProfile, HttpStatus.OK);
    }
    
    @GetMapping("/ids/{ids}")
    public ResponseEntity<?> getUserProfilesById(@PathVariable("ids") String ids, Principal principal) {
    	Iterable<UserProfile> userProfile = userProfileService.getUserProfilesById(ids, principal.getName());

        return new ResponseEntity<Iterable<UserProfile>>(userProfile, HttpStatus.OK);
    }
    
    @GetMapping("/search/{username}")
    public ResponseEntity<?> searchUserProfiles(@PathVariable String username, Principal principal) {

    	Iterable<UserProfile> userProfile = userProfileService.searchUserProfiles(username, principal.getName());

        return new ResponseEntity<Iterable<UserProfile>>(userProfile, HttpStatus.OK);
    }
    
    @GetMapping("/otherprofiles/{username}")
    public ResponseEntity<?> getOtherUserProfilesNotConnected(@PathVariable String username) {

    	Iterable<UserProfile> userProfile = userProfileService.getOtherUserProfilesNotConnected(username);

        return new ResponseEntity<Iterable<UserProfile>>(userProfile, HttpStatus.OK);
    }
    
//    @PatchMapping("/{userId}")
//    public ResponseEntity<?> updateUserProfile(@Valid @RequestBody UpdateUserProfileRequest updateAboutRequest, BindingResult result,
//                                               @PathVariable Long userId, Principal principal) {
//        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
//        if (errorMap != null) {
//        	return errorMap;
//        }
//
//        UserProfile userProfile1 = userProfileService.updateUserProfile(userId, updateAboutRequest.getAbout(), updateAboutRequest.getHeadline());
//        UpdateUserProfileResponse updateAboutResponse = new UpdateUserProfileResponse(userId, userProfile1.getHeadline(), userProfile1.getAbout());
//        return new ResponseEntity<UpdateUserProfileResponse>(updateAboutResponse, HttpStatus.OK);
//    }
    
    @PatchMapping("")
    public ResponseEntity<?> updateUserProfile(@Valid @RequestBody UpdateUserProfileRequest updateAboutRequest, BindingResult result,
                                               Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        UserProfile userProfile1 = userProfileService.updateUserProfile(updateAboutRequest.getHeadline(), updateAboutRequest.getAbout(), principal.getName());
        //UpdateUserProfileResponse updateAboutResponse = new UpdateUserProfileResponse(userProfile1.getUser().getId(), userProfile1.getHeadline(), userProfile1.getAbout());
        return new ResponseEntity<UserProfile>(userProfile1, HttpStatus.OK);
    }
    
}
