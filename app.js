// 引入依赖模块
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var session=require('express-session');

// 路由中间件
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
<<<<<<< HEAD
const mainRouter = require('./routes/public');
var captchaRouter = require('./routes/captcha');
=======
const positionsRouter = require('./routes/positions.js');
>>>>>>> a4e40314b5ad5caed28a06a789bfee748c22592a

// 创建 Express 应用实例
const app = express();

// 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用各中间件完成应用功能
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
<<<<<<< HEAD
app.use(cookieParser('xm'));
//session配置
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'xm',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:45*60*1000 }
}));

=======
app.use(cookieParser());

// 指明静态资源存放位置
>>>>>>> a4e40314b5ad5caed28a06a789bfee748c22592a
app.use(express.static(path.join(__dirname, 'public')));

// 使用路由中间件
app.use('/', indexRouter);
app.use('/users', usersRouter);
<<<<<<< HEAD
app.use('/public', mainRouter);
app.use('/captcha', captchaRouter);
=======
app.use('/positions', positionsRouter); // 访问type目录下资源
>>>>>>> a4e40314b5ad5caed28a06a789bfee748c22592a

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
