FROM openjdk:11
ADD target/movie-service-api-0.0.1-SNAPSHOT.jar movie-service-api.jar
EXPOSE 9090
ENTRYPOINT [ "java", "-jar", "movie-service-api.jar"] 