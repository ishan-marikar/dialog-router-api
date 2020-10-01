var xml2js = require('xml2js');
var js2xml = new xml2js.Builder();
var crypto = require('crypto');
var request = require('request');

var utilities = module.exports;

// Error code names from here: https://github.com/MartijnBraam/huawei-3g/blob/master/huawei_3g/huawei_e303.py
var errorCodes = {
  "100002": "No support", // Huawei branded 404
  "100003": "Access denied", // Huawei branded 403
  "100004": "Busy",
  "108001": "Wrong username",
  "108002": "Wrong password",
  "108003": "Already logged in",
  "120001": "Voice busy",
  "125001": "Wrong __RequestVerificationToken header",

  "125002": "Bad request, generic", // ??
  "125003": "Session tokens missing", // ??
  "100008": "Unknown", // ??
  "108006": "Wrong password", // ??
};

utilities.contactRouter = function(uri, token, post, callback) {
  var options = {
    url: uri,
    headers: {
      'Cookie': token.cookies,
      '__RequestVerificationToken': token.token,
      'DNT': '1'
    }
  };
  if (post) {
    options.method = 'POST';

    if (typeof post === "object") options.form = js2xml.buildObject({request:post});
    else options.form = post;
  }

  request(options, function(error, response, body) {
    if (error || !response ) { 
      callback(error || "Empty response!", null);
      return
    }

    if (response.headers['set-cookie']) token.cookies = response.headers['set-cookie'][0].split(';')[0];
    if (response.headers['__requestverificationtoken']) token.token = response.headers['__requestverificationtoken'];
    // if (response.headers['__requestverificationtokenone']) token.tokenOne = response.headers['__requestverificationtokenone']
    // if (response.headers['__requestverificationtokentwo']) token.tokenTwo = response.headers['__requestverificationtokentwo']

    xml2js.parseString(body, function(error, response) {
      if (response.error) {
        if (errorCodes[response.error.code]) callback(errorCodes[response.error.code]);
        else callback(new Error(response.error.code + ': ' + response.error.message));
      } else {
        callback(error, response.response);
      }
    });
  });
};

utilities.prepareLogin = function(username, password, token) {
  /*
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

utilities.SHA256andBase64 = function(text) {
  return new Buffer(
    crypto.createHash('sha256')
    .update(text)
    .digest('hex'),
  'utf-8').toString('base64');
};
