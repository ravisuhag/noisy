'use strict';

/**
 * Module dependencies.
 */
var config = require('../config/config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var helmet = require('helmet');

module.exports.init = function(db) {
  // Initialize express app
  var app = express();

  /**
   * Initialize local variables
   */
  app.locals.title = config.get('app.title');
  app.locals.description = config.get('app.description');

  /**
   * Initialize application middlewares
   */
  if (config.get('env') === 'development') {
    app.use(morgan('dev'));
    app.set('view cache', false);
  } else if (config.get('env') === 'production') {
    app.locals.cache = 'memory';
  }
  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  // Add the cookie parser and flash middleware
  app.use(cookieParser());
  app.use(flash());

  /**
   * Error Handlers
   */

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

  /**
   * Configure Helmet headers configuration
   */
  module.exports.initHelmetHeaders = function(app) {
    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');
  };



  return app;
};
