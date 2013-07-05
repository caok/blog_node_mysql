
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash')
  , socket = require('socket.io');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.session({secret: 'keyboard cat'}));
app.use(flash());
app.use(app.router);

app.use(function(req, res, next){
  res.locals.error = req.flash('error').toString();
  res.locals.success = req.flash('success').toString();
  res.locals.user = req.session.user ? req.session.user : null;
  next();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);

server = http.createServer(app);
io = socket.listen(server);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection', function (socket) {
  console.log('Client connected...');

  socket.emit('messages', { hello: 'world' });
});
