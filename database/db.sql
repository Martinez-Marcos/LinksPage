CREATE DATABASE database_links; /*crea una base de dato*/

USE database_links;

CREATE TABLE users(
    id TINYINT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    add PRIMARY KEY (id);

ALTER TABLE users -- puedes llamarla las veces q quieras
    MODIFY id TINYINT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE users;

CREATE TABLE grs(
	id TINYINT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT(500),
    user_id TINYINT(11),
    create_ad timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
    );

CREATE TABLE links (
	id TINYINT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT (500),
    user_id TINYINT(11),
    grs_id TINYINT(11),
    create_ad timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_grs FOREIGN KEY (grs_id) REFERENCES users(id)
    );
    
    
ALTER TABLE links
    ADD PRIMARY KEY (id) ;

ALTER TABLE links 
	MODIFY id TINYINT(11) NOT NULL AUTO_INCREMENT;
    
DESCRIBE links;

show databases;
