//content.js

// changing the logo to a turntable
turntable = "\"" + chrome.extension.getURL("icon.png") + "\"";
$(".mw-wiki-logo").css("background-image", "url(" +turntable + ")");
$(".mw-wiki-logo").text("WikiWikiWikipedia");

// helper method that rotates the turntable icon
$.fn.animateRotate = function(angle, duration, easing, complete) {
  return this.each(function() {
    var $elem = $(this);

    $({deg: 0}).animate({deg: angle}, {
      duration: duration,
      easing: easing,
      step: function(now) {
        $elem.css({
           transform: 'rotate(' + now + 'deg)'
         });
      },
      complete: complete || $.noop
    });
  });
};

// prevents page redirects on logo click
$('.mw-wiki-logo').click(function(e) {
    e.preventDefault();
});

// rotates the turntable 2160 degrees for a duration of 10000 milliseconds
$('.mw-wiki-logo').animateRotate(2160, 10000);

// grabs the title of the Wikipedia article and trims out the '- Wikipedia part'
title = document.title
title = title.substring(0, title.length-12);


