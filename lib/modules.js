'use strict';

var glob = require('glob');
var _ = require('lodash');

function paths(pattern, options) {
  var result = glob.sync(pattern, options);
  return result;
}

// Load models
exports.loadModels = function() {
  var models = paths('modules/*/models/*.js');
  return models;
};

exports.loadRoutes = function(){

};
