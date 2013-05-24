blog_node_mysql
===============

blog based on expressjs and mysql

node install

### 数据库
* create database blog default character set utf8;
* CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`)
  );
* CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `happened_at` date NOT NULL,
  PRIMARY KEY (`id`)
  );
