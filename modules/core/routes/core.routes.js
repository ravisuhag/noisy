'use strict';

var core = require('express').Router();
var coreCtrl = require('../controllers/core.controller.js');

module.exports = function(app) {

  // Home route
  core.get('/', coreCtrl.home);

  
  // Mount core on express
  app.use('/', core);

};
