//content.js
turntable = "\"" + chrome.extension.getURL("icon.png") + "\"";
console.log(turntable);
$(".mw-wiki-logo").css("background-image", "url(" +turntable + ")");

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

$('.mw-wiki-logo').animateRotate(1080, 10000);
