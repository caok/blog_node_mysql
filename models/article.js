var mysql = require('./db');

function Article(username, title, content, happened_at) {
  this.user    = username;
  this.title   = title;
  this.content = content;
  if (happened_at) {
    this.happened_at = happened_at;
  } else {
    this.happened_at = new Date();
  }
}

Article.prototype.save = function save(callback) {
  var article = {
    user        : this.username,
    title       : this.title,
    content     : this.content,
    happened_at : this.happened_at
  };
  var query = mysql.query('INSERT INTO articles SET ?', article, function(err, result) {
    if(err){
      callback(err);
    }
    callback(err, result);
  });
};

Article.get = function get(query, callback){
  var sql = 'SELECT * FROM articles' + (query ? (' WHERE ' + query) : '')

  mysql.query(sql, function(err, rows, fields) {
    if(err){
      callback(err);
    }
    //rows.forEach(function (row, index) {
      //var now = row.happened_at;
      //row.happened_at = now.getFullYear() + "-" + (now.getUTCMonth()+1) + "-" + now.getUTCDate();
    //});
    //rows.reverse();//倒序排列
    callback(err, rows);
  });
};

module.exports = Article;
