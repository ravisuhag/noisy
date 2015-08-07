'use strict';

var glob = require('glob');
var _ = require('lodash');

function paths(pattern, options) {
  var result = glob.sync(pattern, options);
  return result;
}

// Load models
exports.models = function() {
  var models = paths('modules/*/models/*.js');
  return models;
};

exports.services = function() {
  var services = paths('modules/*/routes/*.js');
  return services;
};
