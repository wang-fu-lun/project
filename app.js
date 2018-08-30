const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var session=require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mainRouter = require('./routes/public');
var captchaRouter = require('./routes/captcha');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('xm'));
//session配置
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'xm',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:45*60*1000 }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/public', mainRouter);
app.use('/captcha', captchaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
