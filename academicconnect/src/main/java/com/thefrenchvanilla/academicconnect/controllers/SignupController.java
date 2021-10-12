package com.thefrenchvanilla.academicconnect.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SignupController {
	
	@RequestMapping({"/signup", "/signup/index", "/signup/index.html", "/signup.html"})
    public String index(Model model){

        return "signup/index";
    }

}
