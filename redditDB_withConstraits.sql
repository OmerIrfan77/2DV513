CREATE DATABASE IF NOT EXISTS `redditDB`;
USE `redditDB`;

#SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `Subreddit`;
DROP TABLE IF EXISTS `Post`;
DROP TABLE IF EXISTS `Comment`;
#SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `Subreddit` (
`id` varchar(20),# NOT NULL,
`subreddit` varchar(50)
#PRIMARY KEY (`id`)
);

CREATE TABLE `Post` (
`id` varchar(20),# NOT NULL,
`name` varchar(50),
`subreddit_id` varchar(20)
#PRIMARY KEY (`id`)
#CONSTRAINT `fk_post_subreddit_id` FOREIGN KEY (`subreddit_id`) REFERENCES `Subreddit`(`id`)
);


CREATE TABLE `Comment` (
`id` varchar(20), #NOT NULL,
`name` varchar(50),
`subreddit_id` varchar(20),
`parent_id` varchar(20),
`link_id` varchar(20),
`author` varchar(20),
`body` varchar(5000),
`score` int,
`created_utc` timestamp
#PRIMARY KEY (`id`),
#CONSTRAINT `fk_comment_subreddit_id` FOREIGN KEY (`subreddit_id`) REFERENCES `Subreddit`(`id`),
#CONSTRAINT `fk_link_id` FOREIGN KEY (`link_id`) REFERENCES `Post`(`id`)
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';



