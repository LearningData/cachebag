var request = require("request");
var fs = require("fs");
var image = require("imagemagick");
var image_config = require("../config/image.js").image_config;

var url = "http://demo.learningdata.net:81/resources/download/";

var ImageModule = {
  saveImage: function(id, filename, size, callback){
    var path = image_config[size].folder;
    request(url + id).pipe(fs.createWriteStream(path + id + "_" + filename));

    var data = fs.readFileSync(path + id + "_" + filename);
    return callback(data);
  },
  resizeImage: function(pathImage, id, name, size) {
    var config = image_config[size];
    var resizedPath = config.folder + id + "_" + name;
    console.log("Resizing image: " + resizedPath);
    fs.exists(pathImage, function(exists) {
      if(exists) {
        image.resize({srcPath: pathImage, dstPath: resizedPath,
          width: config.width, height: config.height}, function(err, stdout, stderr){
            if (err) { console.log("ERROR: " + err); }
        });
      } else {
        console.log("NON EXIST");
      }
    });
  }
};

exports.ImageModule = ImageModule;