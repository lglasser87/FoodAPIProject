$(document).ready(function () {
    //geting the sidenav to collapse in mobile mode  
    $('.sidenav').sidenav();
    $('select').formSelect();

    //RECIPE FINDER DIV
    // Dynamically creating elements when recieving information from the APIs
    // FUNCTION HERE: When getting info:
    let jtbAPIKey = "8b05ef382fa04ba4b41abcdb1e7c7a69";

    $("#findFoodBtn").on("click", function (event) {
        event.preventDefault();


        // pulling name of food to search
        let q = $("#search").val();

        // adding in both diet restrictions and intolerances
        let selectedDietType = $(".dietType").val();

        let selectedIntolerances = [];
        $(".foodIntolerances :selected").each(function () {
            selectedIntolerances.push($(this).val());
        });

        // make the selectedintolerances a string separated by a , (standard)
        let intolString = selectedIntolerances.join(", ");

        let foodFind = "https://api.spoonacular.com/recipes/search?query=" + q + "&apiKey=" + jtbAPIKey + "&number=6&diet=" + selectedDietType + "&intolerances=" + intolString;

        $.ajax({
            url: foodFind,
            method: "GET"
        }).then(function (response) {

            console.log(response);
            for (let i = 0; i < 6; i++) {

                //=================================== card divs ======================================
                // Create elements with the appropriate classes and content
                var col = $("<div>").addClass("col").attr("id", "recipe" + i);
                var card = $("<div>").addClass("card");
                var cardImageDiv = $("<div>").addClass("card-image");
                var cardImage = $("<img>").attr("src", response.baseUri + response.results[i].image);
                var cardName = $("<p>").text(response.results[i].title);
                var aBtn = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light red saveBtn");
                var plusIcon = $("<i>").addClass("material-icons").text("add");
                var cardContent = $("<div>").addClass("card-content");
                var cardP = $("<p>").text("Ready In: " + response.results[i].readyInMinutes + " minutes.");
                var cardPrice = $("<p>").attr("id", "price" + i);
                var cardAction = $("<div>").addClass("card-action");
                var cardLink = $("<a>").attr("id", "recipeSource" + i);

                // Add the add btn to the a element
                aBtn.append(plusIcon);
                // Add the image, the add button, and the span to the card image div
                cardImageDiv.append(cardImage.css({
                    "width": "200px",
                    "height": "200px"
                }));
                cardImageDiv.append(aBtn);
                // Add the p to the content portion of the card
                cardContent.append(cardName);
                cardContent.append(cardP);
                cardContent.append(cardPrice);
                cardAction.append(cardLink.text("Get the Recipe!"));
                //append the image, content and action divs to the main portion of the card
                card.append(cardImageDiv);
                card.append(cardContent);
                card.append(cardAction);
                //   card.append(cardAction);
                //append the card to the reactive div
                col.append(card);
                // Prepend the latest row element to the find recipe div
                $("#found-recipes").prepend(col);

                //====================================================================================

                let id = response.results[i].id;
                let foodId = "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=" +
                    jtbAPIKey;

                $.ajax({
                    url: foodId,
                    method: "GET"
                }).then(function (response) {

                    console.log(response);
                    //get the link reference and input response.sourceUrl
                    $("#recipeSource" + i).attr("href", response.sourceUrl);
                    $("#price" + i).text("Price per Serving: $" + response.pricePerServing / 100);
                });

            }
        });


    });

    //Added # to gRamsay
    $("#gRamsay").on("click", function (event) {
        event.preventDefault();
        //no need to make var gordonRamsay; can just directly put his name into URL since he's the only one
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=gordonramsay&api_key=dc6zaTOxFJmzC&limit=1";
        $.ajax({
            url: giphyURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            var results = response.data;
            //adding for loop
            for (var i = 0; i < results.length; i++) {
                var gifImage = $("<img>").css({
                    "width": "200px",
                    "height": "200px"
                });
                //changing #gRamImg to just gifImage
                //$("#gRamImg").attr("src", results.images.fixed_height.url);
                //adding [i] to results
                $(gifImage).attr("src", results[i].images.fixed_height.url);
                $("#img-div").append(gifImage);
            }
        });
    });
});