'use strict';

/**
 * Module dependencies.
 */
var config = require('./config/config');
var database = require('./lib/mongoose');
var express = require('./lib/express');

database.connect(function(db) {

  // Initialize express
  var app = express.init(db);
  console.log('running');


});

