package com.thefrenchvanilla.academicconnect.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thefrenchvanilla.academicconnect.entity.Education;
import com.thefrenchvanilla.academicconnect.entity.Post;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.exception.PostIdException;
import com.thefrenchvanilla.academicconnect.repository.EducationRepository;
import com.thefrenchvanilla.academicconnect.repository.PostRepository;
import com.thefrenchvanilla.academicconnect.repository.UserRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Post saveOrUpdatePost(Post post, String username){
        try{
            User user = userRepository.findByUsername(username);
            post.setUser(user);

            return postRepository.save(post);

        }catch (Exception e){
            throw new PostIdException("Post ID '"+post.getPostId().toUpperCase()+"' already exists");
        }

    }


    public Post findPostById(String postId){

        //Only want to return the post if the user looking for it is the owner

        Post post = postRepository.findByPostId(postId.toUpperCase());

        if(post == null){
            throw new PostIdException("Post ID '"+postId+"' does not exist");

        }


        return post;
    }

    public Iterable<Post> findAllPosts(){
        return postRepository.findAll();
    }
    
    public Post updatePostById(Post post, String postid, String username){
    	Post post1 = postRepository.findByPostId(postid.toUpperCase());

        if(post1 == null){
            throw  new  PostIdException("Cannot Post with ID '"+postid+"'. This post does not exist");
        }
        
        return postRepository.save(post1);
    }


    public void deletePostById(String postid){
        Post post = postRepository.findByPostId(postid.toUpperCase());

        if(post == null){
            throw  new  PostIdException("Cannot Post with ID '"+postid+"'. This post does not exist");
        }

        postRepository.delete(post);
    }

}
