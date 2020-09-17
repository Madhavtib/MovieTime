FROM openjdk:11
ADD target/auth-server-0.0.1-SNAPSHOT.jar auth-server.jar
EXPOSE 9999
ENTRYPOINT [ "java", "-jar", "auth-server.jar"]