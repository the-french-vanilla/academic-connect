package com.thefrenchvanilla.academicconnect.viewcontroller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForgotPasswordController {
	
	@RequestMapping({"/forgotpassword", "/forgotpassword/index", "/forgotpassword/index.html", "/forgotpassword.html"})
    public String index(Model model){

        return "forgotpassword/index";
    }

}
