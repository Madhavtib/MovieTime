package com.ratingapi.ratingserviceapi.dao;

import java.util.List;

import com.ratingapi.ratingserviceapi.models.Rating;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RatingDao extends JpaRepository<Rating, Long>{

    @Query(value = "SELECT * FROM rating r WHERE r.user_id = ?1", nativeQuery = true)
    List<Rating> findAll(String userid);
}