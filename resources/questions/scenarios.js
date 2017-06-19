
window.onload = function(){
  makeScenario = function(scenario){

    //Create output Element
    let $trueOutputElement = $("<li></li")
    $trueOutputElement.attr("id", `scenarios-${scenario.name}`);

    let $outputElement = $("<div class=\"accordion-panel\"></div>");

    //Create Control Element
    const isAccordion = true;
    if(isAccordion){
      $controlElement = $("<button></button>")
        .addClass("accordion-control")
        .append(scenario.name);

      $trueOutputElement.append($controlElement);
    }

    //Mature Content rating
    if(scenario.adult == true){
      $adultText = $("<p></p>")
        .addClass("adult")
        .append(`(question for those over the age of 18... or those mature enough)`)

      $outputElement.append($adultText);
      $outputElement.addClass("adult-scenario");
    }

    //description
    $descriptionElement = $(`<p>${scenario.description}</p>`);

    //option list
    $optionElement = $("<ul></ul>");
    for(option of scenario.options){
      //Create radio button
      $inputTag = $("<input>")
        .attr("type", "radio")
        .attr("name", `radio-${scenario.name}`);

      //Populate list element
      $newOption = $("<li></li>")
        .append($inputTag)
        .append(option)
      $optionElement.append($newOption);

    }
    //Other Question
    if (scenario.other){
      $inputTag = $("<input>")
            .attr("type", "radio")
            .attr("name", `radio-${scenario.name}`);
      $otherElement = $("<li>Other... <input type=text></li>")
        .prepend($inputTag);
      $optionElement.append($otherElement);
    }

    //Default question, always shows up
    $whyElement = $("<p>Why would you choose this awnser?</p>");

    //Awnser space for the default element
    $whyResponseElement = $("<textArea></textArea>")
    $whyResponseElement.attr("placeholder", "Enter response here");

    //Populate outputElement
    $outputElement.append($descriptionElement);
    $outputElement.append($optionElement);
    $outputElement.append($whyElement);
    $outputElement.append($whyResponseElement);

    //Extra Question
    if(scenario.question){
      $question = $("<p>" + scenario.question + "</p>")
        .append($("<textArea></textArea>")
          .attr("placeholder", "Enter response here"));

      $outputElement.append($question);
    }

    //Submission button
    $submitElement = $("<input>")
      .attr("type", "submit")
      .append("Submit");

    $outputElement.append($("<br /><br />"));
    $outputElement.append($submitElement);

    $trueOutputElement.append($outputElement);
    return $trueOutputElement;
  }

  $.getJSON("./resources/questions/scenarios.json", "", function(data){
    $accordionElement = $("#scenarios");
    $accordionElement.addClass("accordion")
    for(const scenario of data.scenarios){
      $accordionElement.append(makeScenario(scenario))
    }

    $(".accordion").on('click', '.accordion-control', function(e){
      e.preventDefault;
      $(this)
        .next('.accordion-panel')
        .not(':animated')
        .slideToggle();
    });
  });

}
