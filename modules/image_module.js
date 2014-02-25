var request = require("request");
var fs = require("fs");
var image = require("imagemagick");
var image_config = require("../config/image.js").image_config;

var ImageModule = {
  getImage: function(url, filename){
    request(url).pipe(fs.createWriteStream("/tmp/" + filename));
  },
  resizeImage: function(pathImage, name, size) {
    var config = image_config[size];
    image.resize({srcPath: pathImage, dstPath: config.folder + name,
      width: config.width});
  }
}

exports.ImageModule = ImageModule;