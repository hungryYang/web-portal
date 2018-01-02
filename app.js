const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const session = require('cookie-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const httpErrorHandler = require('./middlewares/http_error_handler');
const errLogger = require('./utils/loggers/logger');
require('./services/mongodv_connection')
const apiIndex = require('./routes/api/index');

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
app.use(session({
  secret: 'asdasdwdasd',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true },
}))

app.use('/api', apiIndex);

// catch 404 and forward to error handler
app.use(httpErrorHandler());

// error handler

process.on('uncaughtException', (err) => {
  errLogger.error('uncaught exception', { err });
})

process.on('unhandledRejection', (reason, p) => {
  errLogger.error('unhandledRejection', { reason, p });
})
module.exports = app;
