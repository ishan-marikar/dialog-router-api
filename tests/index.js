var expect = require('chai').expect;
var Router = require('../lib/router');

describe('getToken', function() {
  it('should provide a token for the other functions to authenticate with ', function() {
    var router = new Router();
    router.getToken(function(error, token) {
      expect(token).to.have.property('token');
    });
  });
});

describe('getMonthStatistics', function() {
  it('should respond with the monthly data statistics/quota set on the router ', function() {
    var router = new Router();
    router.getToken(function(token) {
      router.getMonthStatistics(token, function(error, response) {
        expect(response).to.have.property('CurrentMonthDownload');
      });
    });
  });
});

describe('getSignal', function() {
  it('should respond with the signal information on the router ', function() {
    var router = new Router();
    router.getToken(function(token) {
      router.getMonthStatistics(token, function(error, response) {
        expect(response).to.have.property('cell_id');
      });
    });
  });
});

describe('getStatus', function() {
  it('should respond with the status information on the router ', function() {
    var router = new Router();
    router.getToken(function(token) {
      router.getStatus(token, function(error, response) {
        expect(response).to.have.property('ConnectionStatus');
      });
    });
  });
});

describe('getTrafficStatistics', function() {
  it('should respond with the traffic transferred', function() {
    var router = new Router();
    router.getToken(function(token) {
      router.getTrafficStatistics(token, function(error, response) {
        expect(response).to.have.property('CurrentConnectTime');
      });
    });
  });
});

describe('getCurrentPLMN', function() {
  it('should with the Public Land Mobile Network Information', function() {
    var router = new Router();
    router.getToken(function(token) {
      router.getCurrentPLMN(token, function(error, response) {
        expect(response).to.have.property('FullName');
      });
    });
  });
});

describe('getBasicSettings', function() {
  it('should respond with the signal information on the router ', function() {
    var router = new Router();
    router.getToken(function(token) {
      router.getMonthStatistics(token, function(error, response) {
        expect(response).to.have.property('WifiSsid');
      });
    });
  });
});
