CREATE DATABASE IF NOT EXISTS trello;
CREATE USER 'trello_admin'@'%' IDENTIFIED BY 'trello_admin';
GRANT ALL PRIVILEGES ON *.* TO 'trello_admin'@'%';
FLUSH PRIVILEGES;