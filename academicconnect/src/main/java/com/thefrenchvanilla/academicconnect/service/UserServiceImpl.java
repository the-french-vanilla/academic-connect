package com.thefrenchvanilla.academicconnect.service;

//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.thefrenchvanilla.academicconnect.repository.UserRepository;
//import com.thefrenchvanilla.academicconnect.entity.User;
//
//@Service
//public class UserServiceImpl implements UserService {
//
//	private UserRepository employeeRepository;
//	
//	@Autowired
//	public UserServiceImpl(UserRepository theEmployeeRepository) {
//		employeeRepository = theEmployeeRepository;
//	}
//	
//	@Override
//	public List<User> findAll() {
//		return employeeRepository.findAllByOrderByLastNameAsc();
//	}
//
//	@Override
//	public User findById(int theId) {
//		Optional<User> result = employeeRepository.findById(theId);
//		
//		User theEmployee = null;
//		
//		if (result.isPresent()) {
//			theEmployee = result.get();
//		}
//		else {
//			// we didn't find the employee
//			throw new RuntimeException("Did not find employee id - " + theId);
//		}
//		
//		return theEmployee;
//	}
//
//	@Override
//	public void save(User theEmployee) {
//		employeeRepository.save(theEmployee);
//	}
//
//	@Override
//	public void deleteById(int theId) {
//		employeeRepository.deleteById(theId);
//	}
//
//}






