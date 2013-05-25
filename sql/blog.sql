-- 主机: localhost

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- 数据库: `blog_mysql`
--
create database blog default character set utf8;

-- --------------------------------------------------------

--
-- 表的结构 `users`
--
CREATE TABLE users ( id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  password text NOT NULL,
  PRIMARY KEY (id) );

--
-- 表的结构 `articles`
--
CREATE TABLE articles ( id int(11) NOT NULL AUTO_INCREMENT,
  user varchar(100) NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  happened_at date NOT NULL,
  PRIMARY KEY (id) );
