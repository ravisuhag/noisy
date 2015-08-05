'use strict';

var convict = require('convict');
var fs = require('fs');

// Define a schema
var config = convict({
  env: {
    doc: 'The applicaton environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  }
});

// Load environment specific files
config.load(require('./env/default'));
config.load(require('./env/' + config.get('env')));

// Load local file if present
if (fs.existsSync(__dirname + '/env/local.js')) {
  config.load(require('./env/local.js'));
}

// Perform validation
config.validate();

module.exports = config;
