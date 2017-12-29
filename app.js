const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const httpErrorHandler = require('./middlewares/http_error_handler');
// const errorHandler = require('./middlewares/eroor_handler');
require('./services/mongodv_connection')
const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', users);


// catch 404 and forward to error handler
app.use(httpErrorHandler());

// error handler

process.on('uncaughtException', (err) => {
  console.log(err);
})

process.on('unhandledRejection', (reason, p) => {
  console.log(p);
  console.log(reason);
  // process.exit(1)
})
module.exports = app;
