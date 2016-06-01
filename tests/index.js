var expect = require('chai').expect;
var Router = require('../lib/router');

describe('getToken', function() {
  it('should provide a token for the other functions to authenticate with ', function(done) {
    var router = new Router();
    router.getToken(function(error, token) {
      expect(token).to.have.property('token');
      done();
    });
  });
});

describe('getMonthStatistics', function() {
  it('should respond with the monthly data statistics/quota set on the router ', function(done) {
    var router = new Router();
    router.getToken(function(error, token) {
      router.getMonthStatistics(token, function(error, response) {
        expect(response).to.have.property('CurrentMonthDownload');
        done();
      });
    });
  });
});

describe('getSignal', function() {
  it('should respond with the signal information on the router ', function(done) {
    var router = new Router();
    router.getToken(function(error, token) {
      router.getSignal(token, function(error, response) {
        expect(response).to.have.property('cell_id');
        done();
      });
    });
  });
});

describe('getStatus', function() {
  it('should respond with the status information on the router ', function(done) {
    var router = new Router();
    router.getToken(function(error, token) {
      router.getStatus(token, function(error, response) {
        expect(response).to.have.property('ConnectionStatus');
        done();
      });
    });
  });
});

describe('getTrafficStatistics', function() {
  it('should respond with the traffic transferred', function(done) {
    var router = new Router();
    router.getToken(function(error, token) {
      router.getTrafficStatistics(token, function(error, response) {
        expect(response).to.have.property('CurrentConnectTime');
        done();
      });
    });
  });
});

describe('getCurrentPLMN', function() {
  it('should with the Public Land Mobile Network Information', function(done) {
    var router = new Router();
    router.getToken(function(error, token) {
      router.getCurrentPLMN(token, function(error, response) {
        expect(response).to.have.property('FullName');
        done();
      });
    });
  });
});

describe('getBasicSettings', function() {
  it('should respond with the signal information on the router ', function(done) {
    var router = new Router();
    router.getToken(function(error, token) {
      router.getBasicSettings(token, function(error, response) {
        expect(response).to.have.property('WifiSsid');
        done();
      });
    });
  });
});

describe('login', function() {
  it('should login correctly to the router', function(done) {
    var router = new Router();
    router.getToken(function(error, token) {
      router.login(token, process.env.HUAWEI_GW_USERNAME, process.env.HUAWEI_GW_PASSWORD, function(error, response) {
        expect(error).to.not.exist;
        expect(response).to.equal('OK');
        done();
      });
    });
  });
});
