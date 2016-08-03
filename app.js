require('dotenv').config({ silent: true });

var express = require('express');
var path = require('path');
var compression = require('compression');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');
var session = require('cookie-session');
var bluebird = require('bluebird');

require(path.join(__dirname, 'utilities', 'configure-passport'))(passport);

mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost');

var routes = require('./routes/index');
var users = require('./routes/users');
var organizer = require('./routes/organizer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.COOKIE_KEY1 && process.env.COOKIE_KEY2)
{
    var keys = [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2];
}
else
{
    var keys = ['keyboard', 'cat'];
}
var expiryDate = new Date( 5 * Date.now() + 60 * 60 * 1000 ); // 5 hours
app.use(session(
{
    keys    :  keys,
    secret  : process.env.COOKIE_SECRET || 'secret',
    cookie  :
    {
        secure: true,
        expires: expiryDate
    }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use('/bower_components', express.static(__dirname + '/bower_components'));


// set up message flashing
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/organizer', organizer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers


// intercept unauthorized requests and redirect to index.
app.use(function (err, req, res, next) {
    if (err.status == 400 || err.status == 403)
    {
        req.flash('error', err.message);
        return res.redirect('/');
    }
    return next(err);
});



// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
