var  filesInDirectory;
$.get('/v1/getDirectoryData', { dirUrl: './' },function(data){
 // $('#result').html(data);
  populatePage(data);
});

var link = '<a href="/v1/getFileData?fileUrl="+'


function populatePage(filesinDirectory){
  for(var i = 0; i < filesinDirectory.length; i++){
      appendAnchorToList(filesinDirectory[i]);
  }
}

function appendAnchorToList(fileName){
  $('#fileList').append('<li id="'+fileName+'" onclick="clickHandler()">'+fileName+'</li>');
}

function clickHandler() {
  console.log(event.target.id);
  let fileName = event.target.id
 getFileData(fileName);
}
function getFileData(fileName){
  $.get('/v1/getFileData',{fileUrl:fileName}, function(data){
  $('#fileData').html(data);
  });
}