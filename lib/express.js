'use strict';

/**
 * Module dependencies.
 * Order matters here: 
 *   - Request body parsing middleware should be above methodOverride
 *   - Compression should be placed before express.static
 */
var config = require('../config/config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var helmet = require('helmet');
var reactEngine = require('react-engine');

module.exports.init = function(db) {
  // Initialize express app
  var app = express();

  /**
   * Initialize local variables
   */
  app.locals.title = config.get('app.title');
  app.locals.description = config.get('app.description');
  app.locals.keywords = config.get('app.keywords');

  /**
   * Initialize application middlewares
   */
  app.use(compress({
    filter: function(req, res) {
      return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  if (config.get('env') === 'development') {
    app.use(morgan('dev'));
    app.set('view cache', false);
  } else if (config.get('env') === 'production') {
    app.locals.cache = 'memory';
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(flash());

  /**
   * Error Handlers
   */
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message
    });
  });


  /**
   * React view engine setup
   */
  var engine = reactEngine.server.create({});   // create an engine instance
  app.engine('.jsx', engine);
  app.set('views', __dirname + './');
  app.set('view engine', 'jsx');
  app.set('view', reactEngine.expressView); // Set the custom view

  /**
   * Configure Helmet headers configuration
   */
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.use(helmet.ienoopen());
  app.disable('x-powered-by');

  /**
   * Configure Static assets
   */
  app.use('/', express.static(path.resolve('./public')));



  

  // expose app
  return app;
};
