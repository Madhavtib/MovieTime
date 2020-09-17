package com.authserver.authserver.repository;

import java.util.Optional;

import com.authserver.authserver.model.User;

import org.springframework.data.jpa.repository.JpaRepository;



public interface UserDetailRepository extends JpaRepository<User, Integer>{
	
	Optional<User> findByUsername(String name);

}
