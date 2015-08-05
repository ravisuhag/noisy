'use strict';

module.exports = {
  app: {
    title: 'Noisy - Dev',
  },
  db: {
    uri: 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/noisy-dev',
    options: {
      user: '',
      pass: ''
    },
    debug: process.env.MONGODB_DEBUG || false // Enable mongoose debug mode
  }
};
