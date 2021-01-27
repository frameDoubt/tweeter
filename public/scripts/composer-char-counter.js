$(document).ready(function() {
  console.log("DOM loaded and ready");
  $('#tweet-text').on('input', function() {
    let differential = this.textLength;
    let $outputValue = $('#tweet-text').siblings().last().children().last().html();
    if ($outputValue < 0) {
      $('.counter').addClass("red-text");
    } else if ($outputValue > 0) {
      $('.counter').removeClass("red-text");
    }
    $('#tweet-text').siblings().last().children().last().html(140 - differential);
  });
});
