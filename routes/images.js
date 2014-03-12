var fs = require("fs");
var ImageModule = require("../modules/image_module.js").ImageModule;
var image_config = require("../config/image.js").image_config;

exports.download = function(req, res) {
  var config = image_config[req.params.size];
  var filename = config.folder + req.params.id;

  fs.exists(filename, function(exists){
    if(!exists){
      console.log("Saving new image: " + req.params.id);

      ImageModule.save(req.params.id, req.params.size, function(err, msg){
          if(err) {
            res.end("Error save image");
            return;
          }

          console.log(msg);
      });
    }

    fs.readFile(filename, function(err, data){
      if(err) {
        console.log(err);
      }
      res.end(data, "binary");
    });
  });
};
