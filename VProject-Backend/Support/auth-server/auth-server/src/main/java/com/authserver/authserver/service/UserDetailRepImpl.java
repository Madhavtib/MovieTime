package com.authserver.authserver.service;

import java.util.Optional;

import com.authserver.authserver.model.AuthUserDetail;
import com.authserver.authserver.model.User;
import com.authserver.authserver.repository.UserDetailRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailRepImpl implements UserDetailsService{

    @Autowired
	UserDetailRepository userdetailrepository;

	@Override
	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
		Optional<User> optionalUser=userdetailrepository.findByUsername(name);
		optionalUser.orElseThrow(()-> new UsernameNotFoundException("Username or Password Wrong"));
		 UserDetails userDetails = new AuthUserDetail(optionalUser.get());
	        new AccountStatusUserDetailsChecker().check(userDetails);
	        return userDetails;
	}
    
}