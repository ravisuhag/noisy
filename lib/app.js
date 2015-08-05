'use strict';
/**
 * Module dependencies.
 */
var config = require('../config/config');
var database = require('./mongoose');
var express = require('./express');
var chalk = require('chalk');

module.exports.start = function() {
  // Connect with mongo
  database.connect(function(db) {
    // Initialize express
    var app = express.init(db);
    // Start the app by listening on <port>
    app.listen(config.get('port'), function() {
      console.log('--');
      console.log(chalk.green(config.get('app.title')));
      console.log(chalk.green('Environment:\t\t\t' + config.get('env')));
      console.log(chalk.green('Port:\t\t\t\t' + config.get('port')));
      console.log(chalk.green('Database:\t\t\t' + config.get('db.uri')));
      console.log('--');
    });

  });

};
