package com.moviecatalog.moviecatalogservice.model;

import java.util.List;

public class UserRating {
    
    private List<Rating> UserRating;

    public List<Rating> getUserRating() {
        return UserRating;
    }

    public void setUserRating(List<Rating> userRating) {
        this.UserRating = userRating;
    }
}
