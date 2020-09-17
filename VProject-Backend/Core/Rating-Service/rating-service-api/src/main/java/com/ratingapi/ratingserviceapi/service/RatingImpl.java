package com.ratingapi.ratingserviceapi.service;

import java.util.List;

import com.ratingapi.ratingserviceapi.dao.RatingDao;
import com.ratingapi.ratingserviceapi.models.Rating;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RatingImpl implements RatingService {

    @Autowired
    RatingDao ratingdao;

    @Override
    public Rating addOrUpdateRating(Rating rating) {
       
        return ratingdao.save(rating);
    }

    @Override
    public Rating addRating(Rating rating) {
       
        return ratingdao.save(rating);
    }

    @Override
    public void deleteRating(long ratingId) {
       
        Rating rn = ratingdao.getOne(ratingId);
        ratingdao.delete(rn);

    }

    @Override
    public Rating getRating(long ratingId) {
        
        return ratingdao.getOne(ratingId);
    }

    @Override
    public List<Rating> getUserRatings(String userId) {
       
        return ratingdao.findAll(userId); //return all ratings of specified userid only.
    }

    
    
}