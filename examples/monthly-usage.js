var Router = require('../lib/router');
var bytes = require('pretty-bytes');

var router = Router.create();

router.getToken(function(error, token) {
  router.getMonthStatistics(token, function(error, response) {
    console.log('Your current monthly download usage is:', bytes(
      parseFloat(response.CurrentMonthDownload[0])
    ));
    console.log('Your current monthly upload usage is:', bytes(
      parseFloat(response.CurrentMonthUpload[0])
    ));
  });
});
