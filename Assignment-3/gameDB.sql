CREATE DATABASE IF NOT EXISTS `gamesDB`;
USE `gamesDB`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Store`;
DROP TABLE IF EXISTS `Game`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `User` (
`user_id` varchar(20) NOT NULL,
`name` varchar(50),
`address` varchar(20),
PRIMARY KEY (`user_id`)
);

CREATE TABLE `Store` (
`store_id` varchar(20) NOT NULL,
`name` varchar(50),
`address` varchar(20),
PRIMARY KEY (`store_id`)
);

CREATE TABLE `Game` (
`game_id` varchar(20) NOT NULL,
`title` varchar(50),
`store_id` varchar(20),
`genre` varchar(20),
`platform` varchar(20),
`release_year` int,
`description` varchar(10000),
PRIMARY KEY (`game_id`),
CONSTRAINT `fk_game_store_id` FOREIGN KEY (`store_id`) REFERENCES `Store`(`store_id`)
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
