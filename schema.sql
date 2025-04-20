-- create database delta_app;
-- use delta_app;
-- create table temp(id int primary key);
-- SET SQL_SAFE_UPDATES = 0;

CREATE TABLE user
(
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);