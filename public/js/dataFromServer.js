$.get("/v1/getDirectoryData", { dirUrl: "./" },function(data){
  $("#result").html(data);
});