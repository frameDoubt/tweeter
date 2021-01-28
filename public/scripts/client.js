/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const moment = require('moment');

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const createTweetElement = function(data) {
  return `
  <article>
  <header>
    <div>
      <img src="${data.user.avatars}" alt="" />
      <p>${data.user.name}</p>
    </div>
    <p id="tweeterHandle">${data.user.handle}</p>
  </header>
  <p class="tweetArea">${data.content.text}</p>
  <footer>
    <p id="daysSinceTweet">${moment(data.created_at)}</p>
    <p id="icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </p>
  </footer>
</article>
  `;
};
const $tweet = createTweetElement(tweetData);
$('#tweetsGallery').append($tweet);