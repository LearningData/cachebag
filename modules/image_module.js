var request = require("request");
var fs = require("fs");
var image = require("imagemagick");
var image_config = require("../config/image.js").image_config;

var url = "http://demo.learningdata.net:81/resources/download/"

var ImageModule = {
  saveImage: function(id, filename, size, callback){
    var path = image_config[size].folder;
    request(url + id).pipe(fs.createWriteStream(path + id + "_" + filename));
    fs.readFile(path + id + "_" + filename, function(err, data) {
      if(err) {
        return callback({"err": "was not possible to get the image"});
      } else {
        return callback(data);
      }
    });
  },
  resizeImage: function(pathImage, name, size) {
    var config = image_config[size];
    image.resize({srcPath: pathImage, dstPath: config.folder + name,
      width: config.width});
  }
}

exports.ImageModule = ImageModule;