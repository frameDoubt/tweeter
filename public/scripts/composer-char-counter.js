$(document).ready(function() {
  console.log("DOM loaded and ready");
  $('#tweet-text').on('input', function() {
    // variables used to store the number of characters in textarea
    // and a reference to text in counter class
    let differential = this.textLength;
    let $outputValue = $('#tweet-text').siblings().last().children().last().html();
    // changes color of counter when below zero
    if ($outputValue < 0) {
      $('.counter').addClass("red-text");
    } else if ($outputValue > 0) {
      $('.counter').removeClass("red-text");
    }
    // updates value to user how many more characters they allowed to input
    $('#tweet-text').siblings().last().children().last().html(140 - differential);
  });
});
