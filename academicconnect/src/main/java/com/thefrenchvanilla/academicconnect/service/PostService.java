package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.thefrenchvanilla.academicconnect.entity.Post;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.PostIdException;
import com.thefrenchvanilla.academicconnect.repository.PostRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Post saveOrUpdatePost(Post post, String username) {
        try {
            User user = userRepository.findByUsername(username);
            post.setUser(user);
            return postRepository.save(post);
        } catch (Exception e) {
            throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
    }

    public Post getPost(Long id){
    	Post post;
    	try {
    		post = postRepository.findById(id).get();
    		if (post == null) {
                throw new EducationIdException("Post ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("Post ID '" + id + "' does not exist");
    	}
    	return post;
    }

    public Iterable<Post> findAllPosts(String username){
        //return postRepository.findAll();
        
        try {
            User user = userRepository.findByUsername(username);
            Iterable<Post> posts = postRepository.findAllByUserOrderByCreateAtDesc(user);
            return posts;
        } catch (Exception e) {
        	e.printStackTrace();
            //throw new PostIdException("Post ID '" + post.getId() + "' already exists");
        }
    	
    	return null;
    }
    
    public Post updatePost(Post post, Long id, String username){
    	Post post1 = postRepository.findById(id).get();
        if(post1 == null) {
            throw new PostIdException("Cannot Post with ID '" + id + "'. This post does not exist");
        }
        return postRepository.save(post1);
    }


    public void deletePost(Long id){
    	Post post = postRepository.findById(id).get();
        if (post == null) {
            throw new EducationIdException("Cannot delete Post with ID '" + id + "'. This post does not exist");
        }
        postRepository.delete(post);
    }

}
