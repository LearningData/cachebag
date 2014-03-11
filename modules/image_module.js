var request = require("request");
var fs = require("fs");
var image = require("imagemagick");
var image_config = require("../config/image.js").image_config;

var url = "http://demo.learningdata.net:81/resources/download/";

var ImageModule = {
  saveImage: function(id, size, callback){
    var path = image_config[size].folder;
    request(url + id).pipe(fs.createWriteStream(path + id));

    var data = fs.readFileSync(path + id);
    return callback(data);
  },
  resizeImage: function(pathImage, id, size) {
    var config = image_config[size];
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