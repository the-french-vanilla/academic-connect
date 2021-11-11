package com.thefrenchvanilla.academicconnect.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.thefrenchvanilla.academicconnect.entity.Education;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.UserProfile;
import com.thefrenchvanilla.academicconnect.payload.JWTLoginSucessReponse;
import com.thefrenchvanilla.academicconnect.payload.LoginRequest;
import com.thefrenchvanilla.academicconnect.security.JwtTokenProvider;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.UserProfileService;
import com.thefrenchvanilla.academicconnect.service.UserService;
import com.thefrenchvanilla.academicconnect.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.thefrenchvanilla.academicconnect.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin
public class UserProfileController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserProfileService userProfileService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long userId){

    	UserProfile userProfile = userProfileService.findUserProfile(userId);

        return new ResponseEntity<UserProfile>(userProfile, HttpStatus.OK);
    }
}
