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
      var url = "http://demo.learningdata.net:81/resources/download/";
      request(url + req.params.id).pipe(fs.writeFile(filename));

      console.log("HERE: " + filename);
      var params = {
        srcPath: filename,
        dstPath: filename,
        width: config.width
      };

      image.resize(params);

      // ImageModule.saveImage(req.params.id, "original", function(data){
      //   var originalConfig = image_config["original"];
      //   var originalPath = originalConfig.folder + req.params.id;

      //   if(req.params.size != "original") {
      //     console.log("Resize image: " + originalPath);
      //     ImageModule.resizeImage(originalPath, req.params.id, req.params.size);
      //   }

      //   res.end(data, "binary");
      // });
    }
    console.log("Getting new image: " + filename);
    res.end(data, "binary");
  });
};
