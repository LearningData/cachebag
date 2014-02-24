var request = require("request");

var ImageModule = {
  getImage: function(url, filename){
    request(img_url).pipe(fs.createWriteStream("/tmp/" + filename));
  }
}

exports.ImageModule = ImageModule;