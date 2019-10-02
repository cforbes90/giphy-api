//<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"> </script>


var gif="";
 
var topics =["Joy","Excitement","Surprise","Sadness","Anger","Disgust","Contempt","Fear"];

  // displaygifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {
  $("#gif-view").empty();

  var query = $(this).attr("data-name");
  //console.log("query is " + query);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=ttW7fYuN6GCKvPWa0Vn5T0Lox99zjQT2&limit=10&rating=pg-13";

  $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
      //console.log(response.data.url);
      gif=response.data;
      //console.log(gif);
      populateGif();      
    });

  }

  // Function for displaying movie data
  function renderButtons() {
    $("#buttons-view").empty();
    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("gif-btn");
      a.attr("data-name", topics[i]);
      a.append(topics[i]);
      $("#buttons-view").append(a);
    }
  }

  function populateGif() {
    //$("#gif-view").empty();
    // Looping through the array of gifs from Response
    for (var i = 0; i < gif.length; i++) {       
      var gifDiv = $("<div class='gif'>");
      
      gifDiv.addClass('gif col-md-4 ');
      //gifDiv.attr("data-name", gif[i]);
      gifDiv.append('<img class="gifStill" src='+gif[i].images.fixed_height_still.url + ' data-still=' + gif[i].images.fixed_height_still.url + ' data-load=' + gif[i].images.fixed_height.url + ' data-state="still"/>');
      gifDiv.append('<span class="label rated label-default">Rated: '+gif[i].rating.toUpperCase() + '</span>'+'<p></p>');
      gifDiv.append('<span class="label title label-default">Title: '+gif[i].title + '</span>'+'<p></p>');
      $("#gif-view").append(gifDiv);   
    }
  };

  // This function handles events where a gif category button is clicked and added to array
  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gifTopic = $("#gif-input").val().trim();
    //console.log("this is gifTopic " + gifTopic);
    // Adding gif category from the textbox to our array
    topics.push(gifTopic);
   // Calling renderButtons which handles the processing of our GIF array
    renderButtons();
    displayGifInfo();
  });
  // Adding a click event listener to all elements with a class of "gif-btn"
  $(document).on("click", ".gif-btn", displayGifInfo);
    renderButtons();

// GIF will load if clicked
  $(document).on('click','.gifStill', function(){
    var state = $(this).data('state')
      if (state === 'still') {
        $(this).attr('src', $(this).attr('data-load'));
        $(this).data('state', 'load');
      }
      if (state === 'load') {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).data('state', 'still');
      }
});

