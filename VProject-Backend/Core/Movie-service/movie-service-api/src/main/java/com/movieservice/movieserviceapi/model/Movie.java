package com.movieservice.movieserviceapi.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long movieId;
    private String movie_name;
    private String movie_desc;

    public long getMovieId() {
        return movieId;
    }

    public void setMovieId(long movieId) {
        this.movieId = movieId;
    }

    public String getMovie_name() {
        return movie_name;
    }

    public void setMovie_name(String movie_name) {
        this.movie_name = movie_name;
    }

    public String getMovie_desc() {
        return movie_desc;
    }

    public void setMovie_desc(String movie_desc) {
        this.movie_desc = movie_desc;
    }

    public Movie() {
    }

    public Movie(long movieId, String movie_name, String movie_desc) {
        this.movieId = movieId;
        this.movie_name = movie_name;
        this.movie_desc = movie_desc;
    }

    
    
}