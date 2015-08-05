'use strict';

var convict = require('convict');
var fs = require('fs');
var path = require('path');

// Define a schema
var conf = convict({
  env: {
    doc: 'The applicaton environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  app: {
    title: {
      doc: 'App title',
      format: String,
      default: 'Noisy'
    }
  },
  server: {
    port: {
      doc: 'port to bind',
      format: 'port',
      default: 8080
    }
  }
});

// Load environment specific files
conf.load(require('./env/global'));
conf.load(require('./env/' + conf.get('env')));

// Load local file if present
if (fs.existsSync(path.join(process.cwd(), 'config/env/local.js'))) {
  conf.load(require('./env/local.js'));
}

// Perform validation
conf.validate({
  strict: true
});

module.exports = conf;
