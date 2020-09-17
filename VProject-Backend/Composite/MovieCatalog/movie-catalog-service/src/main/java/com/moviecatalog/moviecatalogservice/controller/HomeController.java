package com.moviecatalog.moviecatalogservice.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.moviecatalog.moviecatalogservice.model.CatalogItem;
import com.moviecatalog.moviecatalogservice.model.Movie;
import com.moviecatalog.moviecatalogservice.model.Rating;
import com.moviecatalog.moviecatalogservice.model.UserRating;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
// import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
// import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
// import org.springframework.security.oauth2.client.registration.ClientRegistration;
// import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.annotation.ModelAndViewResolver;

// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;

// import com.moviecatalog.moviecatalogservice.model.*;

@RestController
@RequestMapping("/catalog")
@CrossOrigin(origins = "http://localhost:3000",maxAge = 3600)
public class HomeController {

  
    @Autowired
    RestTemplate restTemplate;

    @GetMapping("/showmovies") //<-- product-composite
    public Object[] showAllMovies(){

        ResponseEntity<Movie[]> responseEntity = restTemplate.getForEntity("http://movie-service-api/movieservice/allmovies", Movie[].class);
        Movie[] movies = responseEntity.getBody();
        return movies;
    }

    @GetMapping("/showratedmovie_d/{userId}")
    public Object[] showAllRatedMovies(@PathVariable String userId){
        ResponseEntity<Object[]> responseEntity = restTemplate.getForEntity("http://rating-service-api/ratingservice/allratings/" + userId, Object[].class);
        Object[] objects = responseEntity.getBody();
        return objects;
    }

    @GetMapping("/showratedmovie/{userId}")
    public List<CatalogItem> getCatalog(@PathVariable String userId){
        ResponseEntity<Rating[]> userRating = restTemplate.getForEntity("http://rating-service-api/ratingservice/allratings/"+ userId ,Rating[].class);
        
        System.out.println("*******123123*\n***\n****"+userRating.getBody()); //returning null
        List<Rating> ratings = Arrays.asList(userRating.getBody());
        return ratings.stream().map(rating -> {
            Movie movie = restTemplate.getForObject("http://movie-service-api/movieservice/movie/"+ (""+rating.getMovieId()), Movie.class);
            return new CatalogItem(movie.getMovie_name(), movie.getMovie_desc(), rating.getRating(),rating.getRatingId());
        }).collect(Collectors.toList());
    }
    @GetMapping("/showmoviebyid/{movieId}")
    public Movie getMovieById(@PathVariable String movieId){

        return restTemplate.getForObject("http://movie-service-api/movieservice/movie/"+movieId, Movie.class);
    }


    @PostMapping("/ratemovie")
    public ResponseEntity<String> rateMovies(@RequestBody final String rating) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
         HttpEntity<String> entity = new HttpEntity<String>(rating, headers);
         ResponseEntity<String> result = restTemplate
                .postForEntity("http://rating-service-api/ratingservice/addrating", entity, String.class);
        
        return new ResponseEntity<>(result.getStatusCode()); //working on it
    }

    @PostMapping(path = "/addmovie", produces = "application/json")
    public Movie addMovie(@RequestBody final String movie) {
         HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
         HttpEntity<String> entity = new HttpEntity<String>(movie, headers);
         ResponseEntity<Movie> result = restTemplate
                .postForEntity("http://movie-service-api/movieservice/addmovie", entity, Movie.class);
        
        return result.getBody(); // add movies updated, now returns json
    }

    
    
    
}