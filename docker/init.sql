CREATE DATABASE trello;
CREATE USER 'trello_admin'@'localhost' IDENTIFIED BY 'trello_admin';
GRANT ALL PRIVILEGES ON trello.* TO 'trello_admin'@'localhost';