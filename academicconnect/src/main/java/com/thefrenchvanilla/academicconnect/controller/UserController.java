package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.payload.JWTLoginSucessReponse;
import com.thefrenchvanilla.academicconnect.payload.LoginRequest;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;
import com.thefrenchvanilla.academicconnect.security.JwtTokenProvider;
import com.thefrenchvanilla.academicconnect.service.FilesStorageService;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.UserService;
import com.thefrenchvanilla.academicconnect.utils.FileUploadUtil;
import com.thefrenchvanilla.academicconnect.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

import static com.thefrenchvanilla.academicconnect.security.SecurityConstants.TOKEN_PREFIX;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.Base64;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;
    
    @Autowired
    FilesStorageService storageService;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
//    	System.out.println(userValidator);
//    	System.out.println(user);
//    	System.out.println(result);
        // Validate passwords match
        userValidator.validate(user,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        User newUser = userService.saveUser(user);

        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }
    
    @GetMapping("")
    public ResponseEntity<?> getCurrentUser(Principal principal) {
    	User user = userService.getCurrentUser(principal.getName());
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId){
    	User user = userService.findUserById(userId);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<User> getAllUsers() {
    	return userService.getAllUsers();
    }
    
    @PostMapping("/profilepicture")
    public ResponseEntity<?> saveProfilePicture(@RequestParam("username") String username,
            @RequestParam("image") MultipartFile multipartFile) throws IOException {
    	
    	User user = userRepository.findByUsername(username);
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        user.setProfilePicture(fileName);
        
        
        User savedUser = userRepository.save(user);
 
        String uploadDir = "user-photos/" + savedUser.getId();
 
        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
         
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    @GetMapping("/profilepicture/{username}")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable String username) throws IOException {
       
       User user = userRepository.findByUsername(username);
       
       Resource file = storageService.load(user.getProfilePicture());
       
       byte[] bytes = Files.readAllBytes(Paths.get(file.getFile().getAbsolutePath()));

       
       byte[] base64encodedData = Base64.getEncoder().encode(bytes);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + 
                		file.getFilename() + "\"")
                .body(base64encodedData);
    }
}

//import java.util.List;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//import com.thefrenchvanilla.academicconnect.entity.User;
//import com.thefrenchvanilla.academicconnect.services.UserService;

//@Controller
//@RequestMapping("/users")
//public class UserController {
//
//	private UserService employeeService;
//	
//	public UserController(UserService theEmployeeService) {
//		employeeService = theEmployeeService;
//	}
//	
//	// add mapping for "/list"
//
//	@GetMapping("/list")
//	public String listEmployees(Model theModel) {
//		
//		// get employees from db
//		List<User> theEmployees = employeeService.findAll();
//		
//		// add to the spring model
//		theModel.addAttribute("employees", theEmployees);
//		
//		return "employees/list-employees";
//	}
//	
//	@GetMapping("/showFormForAdd")
//	public String showFormForAdd(Model theModel) {
//		
//		// create model attribute to bind form data
//		User theEmployee = new User();
//		
//		theModel.addAttribute("employee", theEmployee);
//		
//		return "employees/employee-form";
//	}
//
//	@PostMapping("/showFormForUpdate")
//	public String showFormForUpdate(@RequestParam("employeeId") int theId,
//									Model theModel) {
//		
//		// get the employee from the service
//		User theEmployee = employeeService.findById(theId);
//		
//		// set employee as a model attribute to pre-populate the form
//		theModel.addAttribute("employee", theEmployee);
//		
//		// send over to our form
//		return "employees/employee-form";			
//	}
//	
//	
//	@PostMapping("/save")
//	public String saveEmployee(@ModelAttribute("employee") User theEmployee) {
//		
//		// save the employee
//		employeeService.save(theEmployee);
//		
//		// use a redirect to prevent duplicate submissions
//		return "redirect:/employees/list";
//	}
//	
//	
//	@PostMapping("/delete")
//	public String delete(@RequestParam("employeeId") int theId) {
//		
//		// delete the employee
//		employeeService.deleteById(theId);
//		
//		// redirect to /employees/list
//		return "redirect:/employees/list";
//		
//	}
//}
