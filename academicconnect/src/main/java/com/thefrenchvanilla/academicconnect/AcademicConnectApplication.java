package com.thefrenchvanilla.academicconnect;

import javax.annotation.Resource;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.thefrenchvanilla.academicconnect.service.FilesStorageService;

@SpringBootApplication
public class AcademicConnectApplication implements CommandLineRunner {
	
	@Resource
	FilesStorageService storageService;
	
	@Bean
    BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

	public static void main(String[] args) {
		SpringApplication.run(AcademicConnectApplication.class, args);
	}
	
	@Override
	public void run(String... arg) throws Exception {
	    storageService.loadAll();
	}

}
