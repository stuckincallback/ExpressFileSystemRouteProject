var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname,'public/')));

app.get('/',function(req, res){

  res.sendFile('index.html');
  
});
 
app.get('/v1/getDirectoryData', function(req, res){
  var directoryUrl = req.query.dirUrl;
  if(directoryUrl != undefined && directoryUrl != ""){
    fs.readdir(directoryUrl, function(err, dir){
      res.json(dir);
    })
  }
});

app.get('/v1/getFileData', function(req, res){
  var fileUrl = req.query.fileUrl;
  console.log(fileUrl);
  if(fileUrl != undefined && fileUrl != ""){
    fs.readFile(fileUrl, function(err, data){
      res.json(data.toString());
      //res.send(JSON.stringify({fileData : data}));
    })
  }
  
});

app.listen(8080);
