
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.post = function(req, res) {

};

exports.reg = function(req, res) {
  res.render('reg', { title: '注册' });
};

exports.doReg = function(req, res) {
  if(req.body['password-repeat'] != req.body['password']){
    console.log('error','两次输入的口令不一致');
    return res.redirect('/reg');
  }
};

exports.login = function(req, res) {
  res.render('login', { title: '登陆' });
};

exports.doLogin = function(req, res) {
};

exports.logout = function(req, res) {
  req.session.user = null;
  res.render('/', { title: '已退出' });
};
