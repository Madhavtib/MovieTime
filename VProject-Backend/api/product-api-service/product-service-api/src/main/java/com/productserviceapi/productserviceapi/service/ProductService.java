package com.productserviceapi.productserviceapi.service;

import java.net.URI;
import java.security.Principal;
import java.util.Arrays;
import java.util.List;

import com.productserviceapi.productserviceapi.model.Movie;
import com.productserviceapi.productserviceapi.model.MovieList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
@RestController
@EnableResourceServer
@CrossOrigin(origins = "http://localhost:3000",maxAge = 3600)
public class ProductService {
    
    @Value("${api.key}")
    private String apiKey;

    private static final Logger LOG = LoggerFactory.getLogger(ProductService.class);

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    private LoadBalancerClient loadBalancer;

    @RequestMapping("/movies/{urlId}")
    @PreAuthorize("hasAnyRole('user','admin')")
    public ResponseEntity<String> getProductComposite(@PathVariable String urlId,
                                    @RequestHeader(value="Authorization") String authorizationHeader,
                                    Principal currentUser) {

        //Debug
        LOG.info("ProductApi: User={}, Auth={}, called with urlId={}", currentUser.getName(), authorizationHeader, urlId);
        
        URI uri = loadBalancer.choose("movie-catalog-service").getUri();
        String url = uri.toString() + "/catalog/" + urlId;

        System.out.println(url);
        // http://localhost:8081/catalog/showmovies
        
        //Debug
        LOG.debug("GetProductComposite from URL: {}", url);

        ResponseEntity<String> result = restTemplate.getForEntity(url, String.class);
        
        //Debug 
        //LOG.info("GetProductComposite http-status: {}", result.getStatusCode());
        //LOG.debug("GetProductComposite body: {}", result.getBody());

        return result;
    }

    @GetMapping("/userratings/{urlId}")
    @PreAuthorize("hasAnyRole('user','admin')")
    public ResponseEntity<String> getRatingComposite(@PathVariable String urlId,
        @RequestHeader(value="Authorization") String authorizationHeader,
        Principal currentUser) {

        //Debug
        LOG.info("ProductApi: User={}, Auth={}, called with urlId={}", currentUser.getName(), authorizationHeader, urlId);

        URI uri = loadBalancer.choose("movie-catalog-service").getUri();
        String url = uri.toString() + "/catalog/showratedmovie/" + urlId;

        System.out.println(url);
        // http://localhost:8081/catalog/showmovies
        // http://localhost:8081/catalog/showratedmovie/101

        //Debug
        LOG.debug("GetProductComposite from URL: {}", url);

        ResponseEntity<String> result = restTemplate.getForEntity(url, String.class);

        //Debug 
        //LOG.info("GetProductComposite http-status: {}", result.getStatusCode());
        //LOG.debug("GetProductComposite body: {}", result.getBody());

        return result;
    }

    // add rating(user,admin), add movies(admin), delete movies(admin), delete ratings(user,admin)

    @PostMapping("/addratings/{urlId}") //working
    @PreAuthorize("hasAnyRole('user','admin')")
    public ResponseEntity<String> PostRatingComposite(@PathVariable String urlId,
        @RequestBody final String rating,
        @RequestHeader(value="Authorization") String authorizationHeader,
        Principal currentUser) {

        //Debug
        LOG.info("ProductApi: User={}, Auth={}, called with urlId={}", currentUser.getName(), authorizationHeader, urlId);

        URI uri = loadBalancer.choose("movie-catalog-service").getUri();
        String url = uri.toString() + "/catalog/" + urlId;

        System.out.println(url);
        // http://localhost:8081/catalog/ratemovies
        

        //Debug
        LOG.debug("GetProductComposite from URL: {}", url);

        ResponseEntity<String> result = restTemplate.postForEntity(url, rating, String.class);

        //Debug 
        //LOG.info("GetProductComposite http-status: {}", result.getStatusCode());
        //LOG.debug("GetProductComposite body: {}", result.getBody());

        return result;
    }

    @PostMapping("/addmovies/{urlId}")
    @PreAuthorize("hasRole('admin')") 
    public ResponseEntity<String> PostMovieComposite(@PathVariable String urlId,
        @RequestBody final String movie,
        @RequestHeader(value="Authorization") String authorizationHeader,
        Principal currentUser) {

        //Debug
        LOG.info("ProductApi: User={}, Auth={}, called with urlId={}", currentUser.getName(), authorizationHeader, urlId);

        URI uri = loadBalancer.choose("movie-catalog-service").getUri();
        String url = uri.toString() + "/catalog/" + urlId;

        System.out.println(url);
        // http://localhost:8081/catalog/addmovies
        

        //Debug
        LOG.debug("GetProductComposite from URL: {}", url);

        ResponseEntity<String> result = restTemplate.postForEntity(url, movie, String.class);

        //Debug 
        //LOG.info("GetProductComposite http-status: {}", result.getStatusCode());
        //LOG.debug("GetProductComposite body: {}", result.getBody());

        return result;
    }

    //Home List of all movies from moviedb
    @GetMapping(path = "/home/{page}")
    @PreAuthorize("hasAnyRole('user','admin')")
    public MovieList getMoviedb(@PathVariable String page){
        MovieList movies = restTemplate.getForObject("https://api.themoviedb.org/3/movie/popular?api_key="+ apiKey +"&language=en-US&page=" + page, MovieList.class);
        return movies;
    }

    // Search Movie
    @GetMapping(path = "/search/{movie_name}")
    @PreAuthorize("hasAnyRole('user','admin')")
    public MovieList searchMoviedb(@PathVariable String movie_name){
        MovieList movies = restTemplate.getForObject("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey +"&language=en-US&query="+ movie_name+ "&page=1", MovieList.class);
        return movies;
    }
    //showmoviebyid
    @RequestMapping("/showmoviesbyid/{urlId}")
    @PreAuthorize("hasAnyRole('user','admin')")
    public ResponseEntity<String> getMovieById(@PathVariable String urlId) {

        
        URI uri = loadBalancer.choose("movie-catalog-service").getUri();
        String url = uri.toString() + "/catalog/showmoviebyid/" + urlId;

        ResponseEntity<String> result = restTemplate.getForEntity(url, String.class);

        return result;
    }

}