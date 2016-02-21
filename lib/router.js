var utilities = require('./utilities');
var url = require('url-join');
require('default');

function DailogRouter(options) {
  this.options = {
    gateway: '192.168.8.1'
  };
  this.options = this.options.default(options);
}

var API = DailogRouter.prototype;
module.exports = DailogRouter;
module.exports.create = create;

API.getMonthStatistics = function(token, callback) {
  var uri = url('http://', this.options.gateway, '/api/monitoring/month_statistics');
  utilities.contactRouter(uri, token, function(error, response) {
    callback(error, response);
  });
};

API.getSignal = function(token, callback) {
  var uri = url('http://', this.options.gateway, '/api/device/signal');
  utilities.contactRouter(uri, token, function(error, response) {
    callback(error, response);
  });
};

API.getStatus = function(token, callback) {
  var uri = url('http://', this.options.gateway, '/api/monitoring/status');
  utilities.contactRouter(uri, token, function(error, response) {
    callback(error, response);
  });
};

API.getTrafficStatistics = function(token, callback) {
  var uri = url('http://', this.options.gateway, '/api/monitoring/traffic-statistics');
  utilities.contactRouter(uri, token, function(error, response) {
    callback(error, response);
  });
};

API.getBasicSettings = function(token, callback) {
  var uri = url('http://', this.options.gateway, '/api/wlan/basic-settings');
  utilities.contactRouter(uri, token, function(error, response) {
    callback(error, response);
  });
};

API.getCurrentPLMN = function(token, callback) {
  var uri = url('http://', this.options.gateway, '/api/net/current-plmn');
  utilities.contactRouter(uri, token, function(error, response) {
    callback(error, response);
  });
};

API.getToken = function(callback) {
  var uri = url('http://', this.options.gateway, '/api/webserver/SesTokInfo');
  utilities.contactRouter(uri, function(error, response) {
    callback(error, {
      cookies: response.SesInfo[0],
      token: response.TokInfo[0]
    });
  });
};

function create(options) {
  return new DailogRouter(options);
}
