var crypto  = require('crypto'),
    User    = require('../models/user.js'),
    Article = require('../models/article.js');

// 主页
exports.index = function(req, res){
  Article.get(null, function(err, articles){
    if(err){
      articles = [];
    }
    res.render('index',{
      title    : '主页',
      user     : req.session.user,
      articles : articles
      success  : req.flash('success').toString(),
      error    : req.flash('error').toString()
    });
  });
};

// 文章
exports.article = function(req, res) {
  res.render('article', { title: '发表' });
};

exports.doarticle = function(req, res) {
  var currentuser = req.session.user;
  article = new Article(currentuser.name, req.body.title, req.body.content);
  article.save(function(err){
    if(err){
      req.flash('error', '发布失败!');
      return res.redirect('/');
    }
    req.flash('success', '发布成功!');
    res.redirect('/');
  });
};

exports.rmarticle = function(req, res) {
  var query = 'id = ' + req.params.id;
  Article.remove(query, function(err) {
    if(err){
      req.flash('error', err);
      return res.redirect('/');
    }
    req.flash('success', '删除成功!');
    res.redirect('/');
  });
};

// 注册
exports.reg = function(req, res) {
  res.render('reg', { title: '注册' });
};

exports.doReg = function(req, res) {
  if(req.body['password-repeat'] != req.body['password']){
    req.flash('error', '两次输入的口令不一致');
    return res.redirect('/reg');
  }
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('base64');
  var newUser = new User({
    name: req.body.username,
    password: password
  });
  User.get(newUser.name, function(err, user){
    if(user){
      err = '用户已存在';
    }
    if(err){
      req.flash('error', err);
      return res.redirect('/reg');
    }
    newUser.save(function(err){
      if(err){
        req.flash('error', err);
        return res.redirect('/reg');
      }
      req.session.user = newUser;
      req.flash('success', '注册成功');
      res.redirect('/');
    });
  });
};

// 登陆
exports.login = function(req, res) {
  res.render('login', { title: '登陆' });
};

exports.doLogin = function(req, res) {
  var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('base64');
  User.get(req.body.username, function(err, user){
    if(!user){
      req.flash('error', '用户不存在');
      return res.redirect('/login');
    }
    if(user.password != password){
      req.flash('error', '密码错误');
      return res.redirect('/login');
    }
    req.session.user = user;
    req.flash('success', '登陆成功');
    res.redirect('/');
  });
};

// 退出
exports.logout = function(req, res) {
  req.session.user = null;
  req.flash('success', '退出成功');
  res.redirect('/');
};
