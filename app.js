var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var factureRouter = require('./routes/facture');
var  mailRouter = require('./routes/mailRequest');
var  adminRouter = require('./routes/admin');
var  clientRouter = require('./routes/client');
var  missionRouter = require('./routes/mission');
var  serviceRouter = require('./routes/service');
var  prestataireRouter = require('./routes/prestataire');
var usersRouter = require('./routes/users');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/factureUser', factureRouter);
app.use('/mail', mailRouter);
app.use('/admin', adminRouter);
app.use('/mission', missionRouter);
app.use('/service', serviceRouter);
app.use('/client', clientRouter);
app.use('/prestataire', prestataireRouter);



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
