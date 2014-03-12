var request = require("request");
var fs = require("fs");
var image = require("imagemagick");
var imageConfig = require("../config/image.js").image_config;

var url = "http://demo.learningdata.net:81/resources/download/";

var ImageModule = {
  saveImage: function(id, size, callback){
    var path = imageConfig[size].folder + id;
    var originalPath = imageConfig["original"].folder + id;

    var req = request(url + id).pipe(fs.createWriteStream(originalPath));

    req.on("close", function(){
      console.log("Resizing: " + originalPath);

      var params = {
        srcPath: originalPath,
        dstPath: path,
        width: imageConfig[size].width
      };

      image.resize(params, function(err, stdout, stderr){
        if(err) {
          return callback({"err": "error to resize"})
        } else {
          var data = fs.readFileSync(path);
          return callback(data);
        }
      });
    });
  },
  resizeImage: function(pathImage, id, size) {
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
            if (err) {
              console.log("ERROR: " + err);
              return;
            }
        });
      } else {
        console.log("File not found");
      }
    });
  }
};

exports.ImageModule = ImageModule;