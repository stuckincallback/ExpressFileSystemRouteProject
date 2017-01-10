var express = require('express');
var fs = require('fs');
var path = require('path');
var configObject = require('./config.json');
var app = express();
var whiteList = configObject.whiteList;
app.use(express.static(path.join(__dirname,'public/')));

app.get('/',function(req, res){

  res.sendFile('index.html');
   
});

function fileDataObject(){
  this.dirname;
  this.isFile;
  this.isDirectory;
  this.extName;
  return this;
}
app.get('/getAppTitle', function(req, res){
  // fs.readFile('config.json', function(err, data){
  //   //console.log(data.toString());
  //   var configObject = JSON.parse(data);
    // whiteList = configObject.whitelist;
  //   res.send(data);
   
  // });
  res.json(configObject);
}); 
app.get('/v1/getDirectoryData', function(req, res){
  var directoryUrl = req.query.dirUrl;
  var fileDataObjectArray=[];
  if(directoryUrl != undefined && directoryUrl != ""){
    var startIndexOf = directoryUrl.indexOf('\\');
    var startDrive = directoryUrl.substr(0,startIndexOf);
    console.log(startDrive);
    if(configObject.blackList.includes(startDrive)){
        res.json('Access Denied');
    }else {
      dir = fs.readdirSync(directoryUrl);
      for(var i = 0; i < dir.length; i++){
        fstatObject = fs.statSync(directoryUrl + '/' + dir[i]);
        var fDObject = new fileDataObject();
        
        fDObject.dirname = dir[i];
        fDObject.isFile =    fstatObject.isFile();
        fDObject.isDirectory = fstatObject.isDirectory();
        if(fstatObject.isFile())
          // console.log(path.extname(dir[i]));
        fDObject.extName = path.extname(dir[i]);
        
        fileDataObjectArray.push(fDObject);
      }
      // console.log(fileDataObjectArray);
      res.json(fileDataObjectArray);
    }
  }
  
});

app.get('/v1/getFileData', function(req, res){
  var fileUrl = req.query.fileUrl;
  var lastIndexOf = fileUrl.lastIndexOf('/');
  console.log(whiteList);
  console.log(path.extname(fileUrl));
  if(configObject.whitelist.includes(path.extname(fileUrl))){
    if(fileUrl != undefined && fileUrl != ""){
    fs.readFile(fileUrl, function(err, data){
      res.json(data.toString());
      //res.send(JSON.stringify({fileData : data}));
    })
  }
  }else{
    res.send('sorry you cant open this extension');
  }
  
  
});

app.listen(8080);
