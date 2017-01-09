var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname,'public/')));

app.get('/',function(req, res){

  res.sendFile('index.html');
   
});

function fileDataObject(){
  this.dirname;
  this.isFile;
  this.isDirectory;
  return this;
}
 
app.get('/v1/getDirectoryData', function(req, res){
  var directoryUrl = req.query.dirUrl;
  var fileDataObjectArray=[];
  if(directoryUrl != undefined && directoryUrl != ""){
    dir = fs.readdirSync(directoryUrl);
    for(var i = 0; i < dir.length; i++){
      fstatObject = fs.statSync(directoryUrl + '/' + dir[i]);
      var fDObject = new fileDataObject();
      fDObject.dirname = dir[i];
      fDObject.isFile =    fstatObject.isFile();
      fDObject.isDirectory = fstatObject.isDirectory();
      fileDataObjectArray.push(fDObject);
    }
      console.log(fileDataObjectArray);
  }
  res.json(fileDataObjectArray);
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
