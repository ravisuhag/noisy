'use strict';

var convict = require('convict');
var fs = require('fs');

// Define a schema
var conf = convict({
  env: {
    doc: 'The applicaton environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  }
});

// Load environment specific files
conf.load(require('./env/default'));
conf.load(require('./env/' + conf.get('env')));

// Load local file if present
if (fs.existsSync(__dirname + '/env/local.js')) {
  conf.load(require('./env/local.js'));
}

// Perform validation
conf.validate();

module.exports = conf;
