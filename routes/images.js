var fs = require("fs");
var ImageModule = require("../modules/image_module.js").ImageModule;
var image_config = require("../config/image.js").image_config;
var request = require("request");
var image = require("imagemagick");

exports.download = function(req, res) {
  var config = image_config[req.params.size];
  var filename = config.folder + req.params.id;

  fs.readFile(filename , function (err, data) {
    if (err) {
      console.log("Saving new image: " + req.params.id);

      ImageModule.saveImage(req.params.id, req.params.size, function(data){
         res.end(data, "binary");
      });
    }
    console.log("Getting new image: " + filename);
    res.end(data, "binary");
  });
};
