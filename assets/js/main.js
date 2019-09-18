//variables

var gifImg; 
var categories = [];

//functions
function displayedGifs() {
  for (var i = 0; i < categories.length; i++) {
    var categoryButton = $("<button>");
    categoryButton.addClass("newGIF");
    categoryButton.attr("data", categories[i]);
    categoryButton.text(categories[i]);
    $("#appear").append(categoryButton);
  }
}

//event handlers 

$("#searchBtn").on("click", function (event) {

  event.preventDefault();
  var searchValue = $("#searchGIF").val().trim();
  categories.push(searchValue);
  displayedGifs();
});



$(document.body).on("click", ".newGIF", function () {
  var gifData = $(this).attr("data");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gifData + "&api_key=9P0PILnLoHRVcWYE21GVF0EfgVkXXRr0&limit=10&rating=g";
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function (append) {
      var search = append.data;
      for (var i = 0; i < search.length; i++) {
        var gifDiv = $("<div>");
        var gifRating = $("<p>").text("Rating: " + search[i].rating);
        var gifImg = $("<img>");
        gifImg.addClass("gif");
        gifImg.attr("src",
        search[i].images.fixed_height.url + '"'
          + " data-still=" + '"' + search[i].images.fixed_height_still.url + '"'
            + " data-animate=" + '"' + search[i].images.fixed_height.url + '"' 
              + ' data-state="still"'
            );



        gifDiv.append(gifRating);
        gifDiv.append("<br/>");
        gifDiv.append(gifImg);
     

        $("#renderedGifs").prepend(gifDiv);
      }
    });
});
