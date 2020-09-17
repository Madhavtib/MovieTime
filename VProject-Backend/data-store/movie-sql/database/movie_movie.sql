

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
);



INSERT INTO `hibernate_sequence` VALUES (9);




DROP TABLE IF EXISTS `movie`;

CREATE TABLE `movie` (
  `movie_id` bigint(20) NOT NULL,
  `movie_desc` varchar(255) DEFAULT NULL,
  `movie_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`movie_id`)
);


INSERT INTO `movie` VALUES (1,NULL,NULL),(2,'this a test movie','test name'),(3,NULL,NULL),(4,NULL,NULL),(5,NULL,NULL),(6,'this a test movie 3','test name 3'),(7,'this a test movie 4','test name 4'),(8,'arnob123','arnobtest');
