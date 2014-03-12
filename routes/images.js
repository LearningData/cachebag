var ImageModule = require("../modules/image_module.js").ImageModule;
var image_config = require("../config/image.js").image_config;

exports.download = function(req, res) {
  var config = image_config[req.params.size];
  var filename = config.folder + req.params.id;

  ImageModule.get(req.params.id, req.params.size, function(err, data){
    console.log("Saving new image: " + req.params.id);
    ImageModule.save(req.params.id, req.params.size, function(err, data){
      res.end(data);
    });
  });
};
