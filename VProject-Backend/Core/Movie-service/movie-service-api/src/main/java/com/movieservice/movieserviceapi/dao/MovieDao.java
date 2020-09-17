package com.movieservice.movieserviceapi.dao;

import com.movieservice.movieserviceapi.model.Movie;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieDao extends JpaRepository<Movie, Long>{

    
    
}