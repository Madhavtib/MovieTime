package com.movieservice.movieserviceapi.service;

import java.util.List;

import com.movieservice.movieserviceapi.dao.MovieDao;
import com.movieservice.movieserviceapi.model.Movie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieServiceImpl implements MovieService {


    @Autowired
    MovieDao movieDao;

    @Override
    public Movie addMovie(Movie movie) {
        
        return movieDao.save(movie);
    }

    @Override
    public Movie addOrUpdateMovie(Movie movie) {
       
        return movieDao.save(movie);
    }

    @Override
    public void deleteMovie(Long movieId) {
        
        Movie mv = movieDao.getOne(movieId);
        movieDao.delete(mv);

    }

    @Override
    public Movie getMovie(Long movieid) {
       
        return movieDao.findById(movieid).get();
    }

    @Override
    public List<Movie> getallMovies() {
        
        return movieDao.findAll();
    }
    
}