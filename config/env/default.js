'use strict';

module.exports = {
  app: {
    title: 'Noisy',
    description: 'Minimal node app starter',
    keywords: 'mongodb, express, node.js, mongoose, passport'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'noisy',
  sessionCollection: 'sessions'
};
