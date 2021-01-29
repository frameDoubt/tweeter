/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(data) {
  return `
  <article>
  <header>
    <div>
      <img class="avatar" src="${data.user.avatars}" alt="" />
      <p>${data.user.name}</p>
    </div>
    <p id="tweeterHandle">${data.user.handle}</p>
  </header>
  <p class="tweetArea">${data.content.text}</p>
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
  for (let tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet, `<br>`));
  }
};

$(() => {
  $('#newTweetForm').on('submit', function(event) {
    event.preventDefault();
    console.log(this);
    const serializedData = $(this).serialize();
    console.log(serializedData);
    $.post("/tweets/", serializedData)
      .then((response) => {
        console.log(response);
      })
  });

  const loadTweets = function() {
    // $.ajax({
    //   url: '/tweets', type: 'GET',
    //   success: function(data) {renderTweets(data)},
    // });
    $.get('/tweets', function(data, status) {
      renderTweets(data);
      console.log(status);
    });
  }
  loadTweets();
});