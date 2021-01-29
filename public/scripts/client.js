/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(data) {
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  return `
  <article>
  <header>
    <div>
      <img class="avatar" src="${data.user.avatars}" alt="" />
      <p>${data.user.name}</p>
    </div>
    <p id="tweeterHandle">${data.user.handle}</p>
  </header>
  <p class="tweetArea">${escape(data.content.text)}</p>
  <footer>
    <p id="daysSinceTweet">${moment(data.created_at.toString(), 'x').fromNow()}</p>
    <p id="icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </p>
  </footer>
</article>
  `;
};

const renderTweets = function(tweets) {
  // iterates over values in given object/array
  for (let tweet of tweets) {
    $('#tweets-container').prepend(createTweetElement(tweet, `<br>`));
  }
};
// function for loading tweets from database
const loadTweets = function() {
  $.get('/tweets', function(data, status) {
    $('#tweets-container').empty();
    renderTweets(data);
    console.log(status);
  });
};
loadTweets();

$(() => {
  // handles for data on submit
  $('#newTweetForm').on('submit', function(event) {
    $('#noChar').hide();
    $('#tooMuchChar').hide();
    // prevents form's default action
    event.preventDefault();
    // converts data to be submitted to server
    const serializedData = $(this).serialize();
    // variable used to verify if user entered a number of characters
    const validationData = decodeURI(serializedData).slice(5);
    // condtional controllers for submission of tweet
    if (!validationData) {
      $('#noChar').slideDown();
    } else if (validationData.length > 140) {
      $('#tooMuchChar').slideDown();
    } else {
      $.post("/tweets/", serializedData)
        .then((response) => {
          console.log(response);
        })
        loadTweets();
      }
      // reset value in form
    $('#tweet-text').val('');
    $('.counter').text('140');
  });
});