window.onload = function(){
  const addRow = function(building){

    //Populate First table cell: Building Name
    $nameElement = $("<td></td>")
      .attr("id", `${building.id}-progress.name`)
      .append(building.name);

    //Populate table cell: Use
    $useElement = $("<td></td>")
      .attr("id", `${building.id}-progress.use`)
      .append(building.use)

    //Populate table cell: Designed
    $designedElement = $("<td></td>")
      .attr("id", `${building.id}-progress.designed`)
      .addClass("checkboxCell")
      .append($("<input>")
          .attr("type", "checkbox")
          .attr("id", `${building.id}.designed?`)
          .attr("checked", building.designed));

    //Populate table cell: Started
    $startedElement = $("<td></td>")
      .attr("id", `${building.id}-progress.stated`)
      .addClass("checkboxCell")
      .append($("<input>")
          .attr("type", "checkbox")
          .attr("id", `${building.id}.started?`)
          .attr("checked", building.started));

    //Populate table cell: Completed
    $completedElement = $("<td></td>")
      .attr("id", `${building.id}-progress.completed`)
      .addClass("checkboxCell")
      .append($("<input>")
        .attr("type", "checkbox")
        .attr("id", `${building.id}.completed?`)
        .attr("checked", building.completed));

    //Populate table cell: Populated
    $populatedElement = $("<td></td>")
      .attr("id", `${building.id}-progress.populated`)
      .addClass("checkboxCell")
      .append($("<input>")
        .attr("type", "checkbox")
        .attr("id", `${building.id}.populated?`)
        .attr("checked", building.populated));

    //Create entire row, appending all elements
    $outputRow = $("<tr></tr>")
      .attr("id", `${building.id}-progress`)
      .append($nameElement)
      .append($useElement)
      .append($designedElement)
      .append($startedElement)
      .append($completedElement)
      .append($populatedElement);

    //return the entire row
    return $outputRow;
  }
  console.info("loading");
  $.getJSON("./resources/spawn/buildings.json", "", function(file){
    for(const buildingName in file.buildings){
      $("#progress-table").append(addRow(file.buildings[buildingName]));
    }
  });
}
