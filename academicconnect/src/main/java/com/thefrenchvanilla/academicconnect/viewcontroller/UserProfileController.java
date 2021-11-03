package com.thefrenchvanilla.academicconnect.viewcontroller;

//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import com.thefrenchvanilla.academicconnect.entity.User;
//import com.thefrenchvanilla.academicconnect.services.UserService;
//
//@Controller
//public class UserProfileController {
//	
//	private UserService userService;
//	
//	public UserProfileController(UserService userService) {
//		this.userService = userService;
//	}
//
//	@RequestMapping({"/profile", "/profile/index", "/profile/index.html", "/profile.html"})
//    public String index(Model theModel){
//		
//		// add to the spring model
//		theModel.addAttribute("tab", "profile");
//
//        return "profile/index";
//    }
//	
////	@GetMapping("/profile/publications")
////	public String displayPublications(Model theModel) {
////		
////		// add to the spring model
////		theModel.addAttribute("tab", "publications");
////		
////		return "profile/index";
////	}
////	
////	@GetMapping("/profile/connections")
////	public String displayConnections(Model theModel) {
////		
////		// get employees from db
//////		List<User> theUsers = new ArrayList<User>();
//////		theUsers.add(new User("Allan", "Kranz", "allan.kranz@unbc.ca"));
//////		theUsers.add(new User("David", "Casperson", "david.casperson@unbc.ca"));
////		
////		// get employees from db
////		List<User> theUsers = userService.findAll();
////				
////		// add to the spring model
////		theModel.addAttribute("users", theUsers);
////		
////		// add to the spring model
////		theModel.addAttribute("tab", "connections");
////		
////		return "profile/index";
////	}
////	
////	@GetMapping("/profile/groups")
////	public String displayGroups(Model theModel) {
////		
////		// add to the spring model
////		theModel.addAttribute("tab", "groups");
////		
////		return "profile/index";
////	}
//
//}
