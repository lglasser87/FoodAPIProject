$(document).ready(function () {
    //geting the sidenav to collapse in mobile mode  
    $('.sidenav').sidenav();
    $('select').formSelect();
  
    //RECIPE FINDER DIV
    // Dynamically creating elements when recieving information from the APIs
    // FUNCTION HERE: When getting info:
  
    $("#saveFood").on("click", function (event) {
      event.preventDefault();
  
      let recipeName = $("#recipeName").val();
      let selectedDietType = $(".dietType").val();
  
      let selectedIntolerances = [];
      $(".foodIntolerances :selected").each(function () {
        selectedIntolerances.push($(this).val());
      });
  
      let recipeInstructions = $("#instructions").val();
  
      console.log(recipeName);
      console.log(selectedDietType);
      console.log(selectedIntolerances);
      console.log(recipeInstructions);
  
      let mySavedRecipe = [];
  
      let foodFormInput = {
        name: recipeName,
        diet: selectedDietType,
        intolerances: selectedIntolerances,
        instructions: recipeInstructions
      }
  
      mySavedRecipe.push(foodFormInput);
  
      console.log(mySavedRecipe);
  
      let myRecipeListSaved = JSON.stringify(mySavedRecipe);
      localStorage.setItem('savedRecipe', myRecipeListSaved);
  
      let myRecipeListGet = JSON.parse(localStorage.getItem("savedRecipe"));
  
      let intolString = myRecipeListGet[0].intolerances;
  
      console.log(intolString.join(", "));
      
    let col = $("<div>").addClass("col");
    let card = $("<div>").addClass("card blue-grey darken-1");
    let cardContent = $("<div>").addClass("card-content white-text");
    let cardTitle = $("<span>").addClass("card-title").text(myRecipeListGet[0].name);
    let cardInst = $("<p>").text("Cooking Instructions: " + myRecipeListGet[0].instructions);
    let cardDiet = $("<p>").text("Diet Type: "+ myRecipeListGet[0].diet);
    let cardIntols = $("<p>").text("Excluded Allergens: " + intolString.join(", "));
    
    $(cardContent).append(cardTitle);
    $(cardContent).append(cardDiet);
    $(cardContent).append(cardIntols);
    $(cardContent).append(cardInst);
    $(card).append(cardContent);
    $(col).append(card);
  
    $("#saved-recipe").prepend(col);
  
    });
    
    $("gRamsay").on("click", function(event){
      event.preventDefault();
  
      var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + gordonRamsey + "&api_key=dc6zaTOxFJmzC&limit=1";
  
      $.ajax({
          url: giphyURL,
          method: "GET",
          }).then(function(response){
                  console.log(response); 
                  var results = response.data;
      
                      var gifImage = $("<img>").css({"width":"200px", "height":"200px"});
                      $("#gRamImg").attr("src", results.images.fixed_height.url);
                      $("#img-div").append(gifImage);
          });
  
    });
  
  });
  