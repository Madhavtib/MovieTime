


DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
);



INSERT INTO `hibernate_sequence` VALUES (8);



DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating` (
  `rating_id` bigint(20) NOT NULL,
  `movie_id` varchar(255) DEFAULT NULL,
  `rating` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rating_id`)
);


INSERT INTO `rating` VALUES (4,'3','4.2','103'),(5,'5','3.0','104'),(6,'7','5.0','111'),(7,'9999','5.0','309299');


