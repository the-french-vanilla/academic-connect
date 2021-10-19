package com.thefrenchvanilla.academicconnect;

import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Created by jt on 9/24/17.
 */
@Component
public class Bootstrap implements CommandLineRunner{

    private final UserRepository userRespository;

    public Bootstrap(UserRepository userRespository) {
        this.userRespository = userRespository;
    }

    @Override
    public void run(String... args) throws Exception {
    	// initialize data
        loadUsers();
    }

    private void loadUsers() {
        User user1 = new User("Allan", "Kranz", "allan.kranz@unbc.ca");
        userRespository.save(user1);

        User user2 = new User("David", "Casperson", "david.casperson@unbc.ca");
        userRespository.save(user2);

        System.out.println("Users Loaded: " + userRespository.count());
    }
}
