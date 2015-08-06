'use Strict';

var core = new require('express').Router();
var core = require('../controllers/core.controller.js');

// Home route
core.get('/', core.home);

module.exports = core;
