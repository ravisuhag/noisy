'use strict';

var defaultConfig = require('./default');

module.exports = {
  db: {
    uri: 'mongodb://localhost/mean-dev',
    options: {
      user: '',
      pass: ''
    },
    debug: process.env.MONGODB_DEBUG || false
  },
  app: {
    title: defaultConfig.app.title + ' - Dev Mode'
  },
};
