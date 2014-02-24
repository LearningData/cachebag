var request = require("request");
var fs = require("fs");
var image = require("imagemagick");

var ImageModule = {
  getImage: function(url, filename){
    request(url).pipe(fs.createWriteStream("/tmp/" + filename));
  },
  resizeImage: function(pathImage, name, size) {
    image.resize({srcPath: pathImage, dstPath: "/tmp/thumb/"+name, width: 200});
  }
}

exports.ImageModule = ImageModule;