var request = require("request");

exports.Resource = {
  getInfo: function(url, callback) {
    request(url, function(err, response, body){
      if (err) { return callback("Error to get info"); }
      var info = JSON.parse(body);
      return callback(info);
    });
  }
};