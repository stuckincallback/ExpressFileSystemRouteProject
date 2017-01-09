var  filesInDirectory;
globalDirectoryName = '.';
getDirectoryContent('');
function getDirectoryContent(directoryName){
  
  $.get('/v1/getDirectoryData', { dirUrl: globalDirectoryName+'/'+directoryName },function(data){
  if(directoryName.length != 0){
    console.log('Before'+globalDirectoryName);
    globalDirectoryName += '/'+directoryName;
    console.log('after'+globalDirectoryName);
  }
   $('#fileList').html('');
  populateList(data);
  console.log(data);
 // populatePage(data);
 });
}


var link = '<a href="/v1/getFileData?fileUrl="+'


function populateList(filesinDirectory){
  for(var i = 0; i < filesinDirectory.length; i++){
      appendAnchorToList(filesinDirectory[i]);
  }
}

function appendAnchorToList(directoryObject){
     let name = directoryObject.dirname;
     let fileType = directoryObject.isFile ? 'file' : 'dir';
     $('#fileList').append('<a href = "#" class="collection-item" data= "'+ fileType +'" id="'+name+'" onclick="clickHandler()">'+name+'</a>');
}

function clickHandler() {
 
  //directoryName can be a file.
  let directoryName = event.target.id
  let fileType = event.target.getAttribute('data');
  console.log(fileType);
  if(fileType == 'file'){
    getFileData(directoryName);
  }else{
    getDirectoryContent(directoryName);
  }
 //getFileData(fileName);
}
function getFileData(fileName){
   let fn =globalDirectoryName + '/' +fileName;
  $.get('/v1/getFileData',{fileUrl:fn}, function(data){
  console.log(data);
  $('#fileData').html(data);
  });
}

$('#backButton').on('click',function(){
  if(globalDirectoryName != '.'){
    let lastIndexOfSlash = globalDirectoryName.lastIndexOf('/');
    globalDirectoryName =  globalDirectoryName.substr(0,lastIndexOfSlash);
    console.log(globalDirectoryName);
  }else{
    globalDirectoryName = '.';
  }
  getDirectoryContent('');
   $('#fileData').html('');
});