FROM openjdk:11
ADD target/discovery-service-0.0.1-SNAPSHOT.jar discovery-service.jar
EXPOSE 8761
ENTRYPOINT [ "java", "-jar", "discovery-service.jar"] 