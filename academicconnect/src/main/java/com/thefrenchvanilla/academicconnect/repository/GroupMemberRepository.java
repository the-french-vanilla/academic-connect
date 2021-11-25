package com.thefrenchvanilla.academicconnect.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.Connection;
import com.thefrenchvanilla.academicconnect.entity.User;
import com.thefrenchvanilla.academicconnect.entity.UserProfile;
import com.thefrenchvanilla.academicconnect.entity.GroupMember;

@Repository
public interface GroupMemberRepository extends CrudRepository<GroupMember, Long> {

    @Override
    Iterable<GroupMember> findAll();
    
    List<GroupMember> findAllByUser(User user);
}
