var xml2js = require('xml2js');
var js2xml = new xml2js.Builder();
var crypto = require('crypto');
var request = require('request');

var utilities = module.exports;

utilities.contactRouter = function(uri, token, callback) {
  var options = {
    url: uri,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36',
      'Cookie': token.cookies,
      '__RequestVerificationToken': token.token,
      'DNT': '1'
    }
  };
  request(options, function(error, response, body) {
    if (error) callback(error, null);
    xml2js.parseString(body, function(error, response) {
      callback(error, response.response);
    });
  });
};

utilities.prepareLogin = function(username, password, token) {
  /*
   *  This function is here for future purposes. Some of the functions of
   *  API require you to login, and currently this doesn't seem to work
   *  at all with mine. (router is locked down by Dailog? Different firmware?)
   *
   * Note how the router wants the password to be the following:
   * 1) Hashed by SHA256, then the raw output base64 encoded.
   * 2) The username is appended with the result of the above,
   *	 AND the current token. Yes, the password changes everytime
   *	 depending on what token we got. This really fucks with scrapers.
   * 3) The string from above (point 2) is then hashed by SHA256 again,
   *    and the raw output is once again base64 encoded.
   *
   * This is how the router login process works. So the password being sent
   * changes everytime depending on the current user session/token.
   * Not bad actually.
   */
  var hashedPassword = SHA256andBase64(
    SHA256andBase64(password) + username + token
  ).toString();

  var login = {
    request: {
      username: username,
      password: hashedPassword
    }
  };

  return js2xml.buildObject(login);
};

var SHA256andBase64 = function(text) {
  return new Buffer(
    crypto.createHash('sha256')
    .update(text)
    .digest("hex")
  ).toString('base64');
};
