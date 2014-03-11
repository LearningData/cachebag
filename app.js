var express = require('express');
var images = require('./routes/images');
var http = require('http');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json({limit: '1000mb'}));
app.use(express.multipart({limit: '1000mb'}));
app.use(express.urlencoded({limit: '1000mb'}));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/images/:id/:size', images.download);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Running Cachebag on port ' + app.get('port'));
});
