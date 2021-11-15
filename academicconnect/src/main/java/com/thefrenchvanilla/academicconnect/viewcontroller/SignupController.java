package com.thefrenchvanilla.academicconnect.viewcontroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SignupController {

	@RequestMapping({"/signup", "/signup/index", "/signup/index.html", "/signup.html"})
    public String index(){

        return "signup/index";
    }

}
