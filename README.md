blog_node_mysql
===============

blog based on expressjs and mysql

node install

### 数据库
* create database blog default character set utf8;
* create table users (name VARCHAR(30), password CHAR(30));
* create table articles (user VARCHAR(30), title TEXT, content TEXT, happened_at date);
