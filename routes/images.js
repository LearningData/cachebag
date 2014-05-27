var ImageModule = require("../modules/image_module.js").ImageModule;
var image_config = require("../config/image.js").image_config;
var fs = require("fs");

exports.download = function(req, res) {
  var config = image_config[req.params.size];

  if(config) {
    var filename = config.folder + req.params.id;

    if(fs.existsSync(filename)) {
      ImageModule.get(req.params.id, req.params.size, function(err, data){
        res.end(data, "binary");
      });
    } else {
      console.log("Saving new image: " + req.params.id);
      ImageModule.save(req.params.id, req.params.size, function(err, data){
        if(err) {
          res.send(404, 'Image not found');
        } else {
          res.end(data, "binary");
        }
      });
    }
  } else {
    res.send(404, 'Image not found');
  }

};

exports.test = function(req, res) {
    res.end("It's working");
}
