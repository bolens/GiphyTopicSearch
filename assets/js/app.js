$(document).ready(function() {
  var defaultTopics = [
    'disc golf', 'ultimate frisbee',
    'snowboarding', 'skiing', 'biking',
    'hiking'
  ];
  var topics = defaultTopics;
  var apiKey = "&api_key=dc6zaTOxFJmzC";
  var searchGet = "/v1/gifs/search?";
  var limit = "&limit=6";
  var queryTerm = "&q=";
  var baseURL = "https://api.giphy.com/";

  // Loads buttons from topics array
  function loadButtons(topics) {
    $('#button-list').empty();
    $(topics).each(function(index, val) {
      var newButton = $('<button>');
      newButton.text(val)
        .attr({
          'type': 'button',
          'data-topic': val
        })
        .addClass('btn btn-primary topic-button');
      $('#button-list').append(newButton);
    });
  }

  // Giphy search and adding images to page
  function searchGiphy() {
    var state = $(this).data("state");
    var searchTerm = $(this).data('topic');
    console.log(searchTerm);
    var queryURL = baseURL + searchGet + limit + queryTerm + searchTerm + apiKey;
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
      var $container = $('#gif-grid');
      $container.empty();
      $(response.data).each(function(index, val) {
        var newCol = $('<div>');
        newCol.addClass('col-sm-6 col-md-4');
        var newImage = $('<img>');
        console.log(val);
        newImage.attr({
          'src': this.images.fixed_height_still.url,
          'alt': this.title,
          'class': 'gif',
          'data-still': this.images.fixed_height_still.url,
          'data-animate': this.images.fixed_height.url
        });
        newCol.append(newImage);
        $container.append(newCol);
      });
    });
  }

  // Animates/pauses gif when image is clicked
  function animateGif() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

  // Adds user-inputted topic to topics array
  function addTopic(newTopic) {
    topics.push(newTopic);
  }

  // Resets topic array to default values
  function resetTopics() {
    topics = defaultTopics;
    loadButtons(topics);
  }

  // Add topic listener
  $('#add-topic').on('click', function(e) {
    e.preventDefault();
    var newTopic = $('#topic-input').val().trim();
    addTopic(newTopic);
    loadButtons(topics);
    $('#topic-input').val('');
  });

  // Reset topics listener
  $('#reset-topics').on('click', function(e) {
    e.preventDefault();
    resetTopics();
  });

  // Topic button listener
  $(document).on('click', '.topic-button', searchGiphy);

  // Image listener
  $(document).on('click', 'img', animateGif);

  // Runs initial load buttons
  loadButtons(topics);

});
