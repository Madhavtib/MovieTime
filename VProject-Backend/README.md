# SPRING BOOT MICROCSERVICE USING SPRING CLOUD, OAUTH,JWT, EUREKA, RIBBON, ZUUL, DOCKER
This project is created to get experience on Microservices With OAuth, JWT etc. This is a simple project by coded imperative programming with simple business requirements.

The project have been dockerized

## There are 7 microservices:
* **Zuul-server** : This microservice is the front door for all requests from devices and websites to the backend of the application.
* **Auth-server** :  this microservice delegates the operations of sign-in, sign-out, and password recovery to a separate service (also called identity federation) 
* **Eureka-server**  : This microservice holds the information about all client-service applications. Every Micro service will register into the Eureka server and Eureka server knows all the client applications running on each port and IP address
* **Movie-service** : This microservice is provides the List of all the movies present
* **Rating-service** : This movie stores the ratings for each movie that user provides.
* **Movie-catalog-service** : This microservice uses calls endpoints of Movie-service and Rating-service to execute business logic. 
* **Product-api** : This acts as an gate way to the actual application and have authorizaions enabled

 Movies-catalog-service microservice has an endpoint with path "/api/catalog/showratedmovies/{urlId}". This endpoint return a list of movies with name description and rating.


## ENDPOINTS
Service |	EndPoint |	Method |	Description
------- | -------  | ------- | -----------
product-service-api | /movies/{urlId} |	GET	| Return list of all movies
product-service-api | /userratings/{urlId} |	GET	| Return list of all movies of a particular user
product-service-api | /addratings/{urlId} |	POST	| Sends rating of a particular user of the movie
product-service-api | /addmovies/{urlId} |	POST	| Adds new Movie to the database
movie-catalog-service |	/catalog/showmovies |	GET	| Return List of all movies
movie-catalog-service |	/catalog/showratedmovie/{userId} |	GET	| Return List of all rated movies with rating
movie-catalog-service |	/catalog/ratemovie |	POST	| Adds Rating to List of all rated movies with rating
movie-catalog-service |	/catalog/addmovie |	POST	| Adds Movie to List of all movies
movie-service-api |	/movieservice/allmovies |	GET	| Returns List of all movies
movie-service-api |	/movieservice/movie/{movieId} |	GET	| Returns List of all movies with given Id
movie-service-api |	/movieservice/addmovie |	POST	| Posts details of a movie to be added to database
movie-service-api |	/movieservice/updatemovie/{movieId} |	POST	| Posts details of a movie to be added/updated to database
movie-service-api |	/movieservice/deleteMovie/{movieId} |	POST	| Posts details of a movie to be deleted from database
rating-service-api |	/rating/service/deleteMovie/{movieId} |	POST	| Posts details of a movie to be deleted from database
rating-service-api |	/rating/allratings/{userId} |	GET	| Get List of all rated movies
rating-service-api |	/rating/addrating |	POST | Post a new rating to the database
rating-service-api |	/rating/updaterating/{ratingId} |	POST | Update any exisiting Rating information
rating-service-api |	/rating/deleterating/{ratingId} |	POST | Delete any exisiting Rating information

## GATEWAYS
Service |	EndPoint
------- | ------- 
auth-server	| /api/authserver/oauth/token
auth-server	| /api/authserver/oauth/check_token
product-service-api	| /api/resource-server-api

URI for gateway : http://localhost:8763

## Used Netflix OSS:
* Netflix Eureka is used for discovery service.
* Netflix Ribbon is used for client side load-balancing.
* Netflix Zuul is used for gateway.

## Build & Run
* >mvn clean package : to build
* >docker-compose up --build : build docker images and containers and run containers
* >docker-compose stop : stop the dockerized services
* Each maven module has a Dockerfile.

In docker-compose.yml file:

* discovery-service : 8761 port is mapped to 8761 port of host
* auth-server : 9999 port is mapped to 9999 port of host
* movie-service-api : 9090 port is mapped to 9090 port of host
* rating-service-api : 9091 port is mapped to 9091 port of host
* movie-catalog-service : 8081 port is mapped to 8081 port of host
* product-service-api : 8080 port is mapped to 8080 port of host
* zuul-server : 8763 port is mapped to 8763 port of port 

## VERSIONS

* 1.0.0 SNAPSHOT
* Spring-Boot 2.3.1.RELEASE
* Java 11
* Docker Image updated
* Spring-Cloud artifacts have been changed



## CONTRIBUTORS
@madhavtib, @birajghosh6





