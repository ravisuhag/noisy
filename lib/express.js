'use strict';
/**
 * Module dependencies.
 * Order matters here: 
 *   - Request body parsing middleware should be above methodOverride
 *   - Compression should be placed before express.static
 */
require('node-jsx').install();
var config = require('../config/config');
var register = require('./register');

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

function initLocals(app) {
  app.locals.title = config.get('app.title');
  app.locals.description = config.get('app.description');
  app.locals.keywords = config.get('app.keywords');
}

function initMiddlewares(app) {
  // Compression
  app.use(compress({
    filter: function(req, res) {
      return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));
  // Enviremnent specific middlewares
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
}

function initErrhandler(app) {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message
    });
  });
}

function initViewEngine(app) {
  var engine = reactEngine.server.create({
    performanceCollector: function(stats) {
      console.log(stats);
    }
  });
  app.engine('.jsx', engine);
  app.set('views', path.resolve('./'));
  app.set('view engine', 'jsx');
  app.set('view', reactEngine.expressView); // Set the custom view
}

function initHelmet(app) {
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.use(helmet.ienoopen());
  app.disable('x-powered-by');
}

function initRoutes(app) {
  register.services().forEach(function(file) {
    require('../' + file)(app);
  });
}

function initAssets(app) {
  app.use('/', express.static(path.resolve('./public')));
}

// Init Express
module.exports.init = function(db) {
  var app = express();
  initLocals(app);
  initMiddlewares(app);
  initViewEngine(app);
  initHelmet(app);
  initErrhandler(app);
  initRoutes(app);
  return app;
};
