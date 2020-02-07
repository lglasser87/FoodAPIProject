$(document).ready(function () {
  //geting the sidenav to collapse in mobile mode  
  $('.sidenav').sidenav();

  //RECIPE FINDER DIV
  // Dynamically creating elements when recieving information from the APIs
  // FUNCTION HERE: When getting info:

  // Set variables for API keys
  var imageSrc = response.blah1.blah2;
  var recipeText = response.blah3.blah4;
  var recipeLink = response.blah5.blah6;

  // Create elements with the appropriate classes and content
  var row = $("<div>").addClass("row");
  var col = $("<div>").addClass("col");
  var card = $("<div>").addClass("card");
  var cardImageDiv = $("<div>").addClass("card-image");
  var cardImage = $("<img>").attr("src", imageSrc);
  var span = $("<span>").addClass("card-title");
  var cardContent = $("<div>").addClass("card-content");
  var cardP = $("<p>").text(recipeText);
  var cardAction = $("<div>").addClass("card-action");
  var a = $("<a>").attr("href", recipeLink);

  // Add the image and the span to the card image div
  cardImageDiv.append(cardImage);
  cardImageDiv.append(span);
  // Add the p to the content portion of the card
  cardContent.append(p);
  //append the link to the card action segment
  cardAction.append(a);
  //append the image, content and action divs to the main portion of the card
  card.append(cardImageDiv);
  card.append(cardContent);
  card.append(cardAction);
  //append the card to the reactive div
  col.append(card);
  //append the reactive div to the row div
  row.append(col);
  // Prepend the latest row element to the find recipe div
  $(".find-recipe").prepend(row);

//append

});
