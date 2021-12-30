CREATE DATABASE IF NOT EXISTS `redditDB`;
USE `redditDB`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `Subreddit`;
DROP TABLE IF EXISTS `Post`;
DROP TABLE IF EXISTS `Comment`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `Subreddit` (
`id` varchar(20),
`subreddit` varchar(50)
);

CREATE TABLE `Post` (
`id` varchar(20),
`name` varchar(50),
`subreddit_id` varchar(20)
);


CREATE TABLE `Comment` (
`id` varchar(20),
`name` varchar(50),
`subreddit_id` varchar(20),
`parent_id` varchar(20),
`link_id` varchar(20),
`author` varchar(20),
`body` varchar(5000),
`score` int,
`created_utc` timestamp
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';



