var fs = require("fs");
var ImageModule = require("../modules/image_module.js").ImageModule;
var image_config = require("../config/image.js").image_config;

exports.download = function(req, res) {
  var config = image_config[req.params.size];
  var filename = config.folder + req.params.id + "_" + req.params.file;

  fs.readFile(filename , function (err, data) {
    if (err) {
      console.log("Saving new image: " + req.params.file);
      ImageModule.saveImage(req.params.id, req.params.file, "original", function(data){
        var originalConfig = image_config["original"];
        var originalPath = originalConfig.folder + req.params.id + "_" + req.params.file;

        if(req.params.size != "original") {
          console.log("Resize image: " + originalPath);
          ImageModule.resizeImage(originalPath, req.params.id, req.params.file, req.params.size);
        }

        res.end("resized image");
      });
      // ImageModule.resizeImage("originalPath", req.params.id, req.params.file, req.params.size);
      // res.end("resized");
    } else {
      res.end(data, "binary");
      console.log("Getting new image: " + req.params.file);
    }
  });
};

exports.test = function(req, res) {
    console.log("It's working");
    res.end("It's working");
};
