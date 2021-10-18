package com.thefrenchvanilla.academicconnect.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserProfileController {

	@RequestMapping({"/profile", "/profile/index", "/profile/index.html", "/profile.html"})
    public String index(){

        return "profile/index";
    }

}
