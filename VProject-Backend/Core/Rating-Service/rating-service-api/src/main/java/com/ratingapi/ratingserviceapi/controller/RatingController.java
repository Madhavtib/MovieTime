package com.ratingapi.ratingserviceapi.controller;

import java.util.List;

import com.ratingapi.ratingserviceapi.models.Rating;
import com.ratingapi.ratingserviceapi.service.RatingService;
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

@RestController
@CrossOrigin(origins = "http://localhost:3000",maxAge = 3600)
@RequestMapping("/ratingservice")
public class RatingController {

    @Autowired
    RatingService ratingService;

    @GetMapping(path = "/allratings/{userId}")
    public List<Rating> getUserRatings(@PathVariable String userId){
        System.out.println("in movie service");
        return this.ratingService.getUserRatings(userId); //working
    }

    @PostMapping("/addrating")
    public Rating addrating(@RequestBody Rating rating){
        return this.ratingService.addRating(rating); //working rating_id self generated
    }

    @PutMapping("/updaterating/{ratingId}")
    public Rating addOrUpRating(@RequestBody Rating rating){
        return this.ratingService.addOrUpdateRating(rating);
    }

    @DeleteMapping("/deleterating/{ratingId}")
    public ResponseEntity<HttpStatus> deleteRating(@PathVariable String ratingId){
        try{
            this.ratingService.deleteRating(Long.parseLong(ratingId));
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}