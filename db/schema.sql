#DROP DATABASE IF EXISTS name_vs_skeletondb;

CREATE DATABASE name_vs_skeletondb;

USE name_vs_skeletondb;

CREATE TABLE user (
    id INT AUTO_INCREMENT,
    username VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    PRIMARY KEY (id)
);