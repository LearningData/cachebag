fs = require('fs');
var imagesPath = "./images/";

exports.download = function(req, res) {
  var path = imagesPath + req.params.size + "/" + req.params.file;
  console.log("Working: " + path);
  fs.readFile(path , function (err, data) {
    if (err) {
      res.send("Image not found");
    } else {
      res.write(data);
    }
  });
};
