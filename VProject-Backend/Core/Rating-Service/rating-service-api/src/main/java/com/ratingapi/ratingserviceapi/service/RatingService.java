package com.ratingapi.ratingserviceapi.service;

import java.util.List;

import com.ratingapi.ratingserviceapi.models.*;


public interface RatingService {
    
    
    public List<Rating> getUserRatings(String userId); //to be seen by user

    public Rating getRating(long ratingId); //Detail view for user

    public Rating addRating(Rating rating); //form based entry by user

    public Rating addOrUpdateRating(Rating rating); //form based entry by user

    public void deleteRating(long ratingId); // to be done by user

    //What ever is done by user, admin have rights by defalut
}