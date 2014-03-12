var request = require("request");
var fs = require("fs");
var image = require("imagemagick");
var imageConfig = require("../config/image.js").image_config;

var url = "http://demo.learningdata.net:81/resources/download/";

var ImageModule = {
  save: function(id, size){
    var originalPath = imageConfig["original"].folder + id;
    var req = request(url + id).pipe(fs.createWriteStream(originalPath));

    req.on("close", function(){
      console.log("Resizing: " + originalPath);
      ImageModule.resize(originalPath, id, size);
    });
  },
  resize: function(pathImage, id, size) {
    var config = imageConfig[size];
    var resizedPath = config.folder + id;
    console.log("Resizing image: " + resizedPath);
    fs.exists(pathImage, function(exists) {
      if(exists) {
        var params = {
          srcPath: pathImage,
          dstPath: resizedPath,
          width: config.width
        };

        image.resize(params, function(err, stdout, stderr){
            if (err) { throw err; }
        });
      } else {
        console.log("File not found");
      }
    });
  }
};

exports.ImageModule = ImageModule;