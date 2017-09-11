var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-mate'));
app.locals._layoutFile = 'layout.ejs';

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  console.log('a')
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  console.log('b')
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {
    status: err.status,
    message: "程序出错，请联系管理员ddy_dhj@163.com"
  };

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: "错误页" });
});

/**
 * 如果客户端出错，一定会进入console.log('b')
 * 如果是服务器端出错，console.log('a')不一定能进来
 */

module.exports = app;
