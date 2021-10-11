package com.thefrenchvanilla.academicconnect.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FeedController {
	
	@RequestMapping({"/feed", "/feed/index", "/feed/index.html", "/feed.html"})
    public String index(Model model){

		model.addAttribute("data", "hello world");

        return "feed/index";
    }

}
