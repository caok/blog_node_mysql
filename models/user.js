var mysql = require('./db');

function User(user){
  this.name = user.name;
  this.password = user.password;
};

User.prototype.save = function save(callback) {
  var post  = {
    name:this.name,
    password: this.password
  };
  var query = mysql.query('INSERT INTO users SET ?', post, function(err, result) {
    if(err){
      callback(err);
    }
    callback(err, result);
  });
};

//几个路由共用，所以为静态方法
User.get = function get(username, callback){
  //var query = username;
  //var sql = 'SELECT name, password FROM users WHERE name= '+ query;

  mysql.query('SELECT name,password FROM users WHERE name = ?', [username], function(err, rows, fields) {
    if(err){
      callback(err);
    }
    var row = rows ? rows[0] : [];
    callback(err, row);
  });
};

module.exports = User;
