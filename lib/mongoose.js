'use strict';
// Bring Mongoose into the app 
var config = require('../config/config');
var mongoose = require('mongoose');
var chalk = require('chalk');

// Connect DB
module.exports.connect = function(cb) {
  // Setup mongoose connection
  var db = mongoose.connect(config.get('db.uri'), config.get('db.options'), function(err) {
    // Call callback function if connection is successful
    if(err){
      console.log(chalk.red(err));
    }
    else {
      if (cb) cb(db);
    }
    
  });
};

module.exports.listen = function() {
  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to ' + config.get('db.uri'));
  });

  // If the connection throws an error
  mongoose.connection.on('error', function(err) {
    console.log(chalk.red('Database : Mongoose default connection error: ' + err));
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function() {
    console.log('Database : Mongoose disconnected');
  });

  // If the Node process ends, close the Mongoose connection 
  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log(chalk.red('Database : Mongoose disconnected through app termination'));
      process.exit(0);
    });
  });

};
