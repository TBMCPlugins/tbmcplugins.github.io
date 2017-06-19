//AJAX request method
updateCell = function(path, pageType, requestType){
  path = path.toLowerCase();
  const $element = $("#hello-" + path);
  $.ajax({
    type: requestType, //GET or POST
    url: "https://server.figytuna.com:8080/ali/hello/" + path,
    timeout: 2000, //ms
    beforeSend: function(data){
      $element.html("<em>Loading...</em>");
    },
    success: function(data){
      if (pageType == "html"){
        $element.html(data);
      }else{
        $element.text(data);
      }
    },
    error: function(e){
      $("#hello-" + path).html("<em>Error " + e.status + " " + e.statusText + "</em>");
    }
  });
}

window.onload = function(){
  const pageList = {
    "unsafe": ["World", "Data", "Post"],
    "html": ["Location", "Players"],
  }

  //Generate HTML table
  for (const pageType in pageList){
    for (const path of pageList[pageType]){
      //Adds new table row based on the data request
      const $row = $("<tr></tr>");
      const $request = $("<td>Hello " + path + "</td>");
      const $response = $("<td id=\"hello-"+ path.toLowerCase() + "\"></td>")

      $row.append($request);
      $row.append($response);

      //Appends new table row to table
      $("#hello-table").append($row);
    }
  }
  //Populate Table Data
  for (const id of pageList["html"]){
    //Gets data from server, adds response to table
    updateCell(id, "safe", "GET");
  }

  for (const id of pageList["unsafe"]){
    //Gets data from server, adds response to table
    updateCell(id, "unsafe", "GET");
  }


}
