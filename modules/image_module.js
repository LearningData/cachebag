var request = require("request");
var fs = require("fs");
var image = require("imagemagick");
var imageConfig = require("../config/image.js").image_config;

var url = imageConfig.server;

var ImageModule = {
  get: function(id, size, callback) {
    var filename = imageConfig[size].folder + id;
    console.log("Getting image " + filename);

    fs.readFile(filename, function(err, data){
      if(err) { callback(err); }

      return callback(null, data);
    });
  },
  save: function(id, size, callback){
    var originalPath = imageConfig["original"].folder + id;
    var req = request(url + id).pipe(fs.createWriteStream(originalPath));
    var resizedPath = imageConfig[size].folder + id;

    req.on("close", function(){
      console.log("Save and Resizing: " + originalPath);
      ImageModule.resize(originalPath, id, size, function(err, data){
        if(err) { console.log(err) };

        var resized = fs.readFileSync(resizedPath);
        return callback(null, resized);
      });
    });
  },
  resize: function(pathImage, id, size, callback) {
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
            if (err) { callback(err); }

            return callback(null, stdout);
        });
      } else {
        console.log("File not found");
      }
    });
  }
};

exports.ImageModule = ImageModule;
