package com.movieservice.movieserviceapi.controller;

import com.movieservice.movieserviceapi.service.MovieService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.movieservice.movieserviceapi.model.*;
@RestController
@RequestMapping("/movieservice")
@CrossOrigin(origins = "http://localhost:3000",maxAge = 3600)
public class MovieController {
    
    @Autowired
    MovieService movieService;

    @GetMapping("/allmovies")
    public List<Movie> getAllMovies(){
        return this.movieService.getallMovies();
    }

    @GetMapping("/movie/{movieId}")
    public Movie getMovieByName(@PathVariable String movieId){
        return this.movieService.getMovie(Long.parseLong(movieId));
    }

    //admin
    @PostMapping("/addmovie")
    public Movie addMovie(@RequestBody Movie movie){
        return this.movieService.addMovie(movie);
    }

    @PutMapping("/updatemovie/{movieId}")
    public Movie addOrUpdateMovie(@RequestBody Movie movie, @PathVariable String movieId){
        Movie mv = movieService.getMovie(Long.parseLong(movieId));
        return this.movieService.addOrUpdateMovie(movie);
    }

    @DeleteMapping("/deleteMovie/{movieId}")
    public ResponseEntity<HttpStatus> deleteRating(@PathVariable String movieId){
        try{
            this.movieService.deleteMovie(Long.parseLong(movieId));
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}