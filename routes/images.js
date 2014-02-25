var fs = require('fs');
var image_config = require("../config/image.js").image_config;

exports.download = function(req, res) {
  var config = image_config[req.params.size];

  fs.readFile(config.folder + req.params.file , function (err, data) {
    if (err) {
      res.send("Image not found");
    } else {
      res.write(data);
    }
  });
};
