var Router = require('../lib/router');

var router = Router.create();

const USERNAME = 'admin';
const PASSWORD = 'admin';
const NETWORK_MODE = '03'; // LTE Only
const NETWORK_BAND = '3FFFFFFF'; // All supported
const LTE_BAND = '7FFFFFFFFFFFFFFF'; // All supported

router.getToken(function(error, token) {
  router.login(token, USERNAME, PASSWORD, function (error) {
    if (error) {
      console.error('Failed to login:', error);
      return;
    }
    router.setNetworkMode(token, NETWORK_MODE, NETWORK_BAND, LTE_BAND, function (error, response) {
      if (error) {
        console.error('Failed to set network mode:', error);
      } else {
        console.log('Set network mode result:', response);
      }
    });
  });
});
