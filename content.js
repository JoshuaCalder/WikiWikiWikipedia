//content.js
vidIDs = [];
// changing the logo to a turntable
turntable = "\"" + chrome.extension.getURL("icon.png") + "\"";
$(".mw-wiki-logo").css("background-image", "url(" +turntable + ")");
$('.mw-wiki-logo').height(115);
$('.mw-wiki-logo').css('background-size', '90px 90px');
$("<div style='padding: 15px 0px 0px 0px;text-align:center;font-size:22px;font-family: \"Crimson Text\"'>Wiki Wiki</div>").insertBefore(".mw-wiki-logo");
$("<div style='padding: 0px 0px 0px 0px;text-align:center;font-size:32px;font-family: \"Crimson Text\"'>Wikipedia</div>").insertBefore(".mw-wiki-logo");

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
    $('.mw-wiki-logo').animateRotate(720, 2000);
});

// rotates the turntable 2160 degrees for a duration of 10000 milliseconds
$('.mw-wiki-logo').animateRotate(720, 2000);

// grabs the title of the Wikipedia article and trims out the '- Wikipedia part'
title = document.title
title = title.substring(0, title.length-12);

chrome.runtime.sendMessage({title: title, highway: "wikititle"}, function(response) {
  // console.log(response.title);
});

//HERE IS THE JS FOR THE VIDEO

var tag = document.createElement('script');
  tag.id = 'iframe-demo';
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('existing-iframe-example', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
  });
}
function onPlayerReady(event) {
  document.getElementById('existing-iframe-example').style.borderColor = '#FF6D00';
}
function changeBorderColor(playerStatus) {
  var color;
  if (playerStatus == -1) {
    color = "#37474F"; // unstarted = gray
  } else if (playerStatus == 0) {
    color = "#FFFF00"; // ended = yellow
  } else if (playerStatus == 1) {
    color = "#33691E"; // playing = green
  } else if (playerStatus == 2) {
    color = "#DD2C00"; // paused = red
  } else if (playerStatus == 3) {
    color = "#AA00FF"; // buffering = purple
  } else if (playerStatus == 5) {
    color = "#FF6DOO"; // video cued = orange
  }
  if (color) {
    document.getElementById('existing-iframe-example').style.borderColor = color;
  }
}
function onPlayerStateChange(event) {
  changeBorderColor(event.data);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.highway == 'sendVidID') {
        id = request.id;
        setIframe(id);
    }
    if(request.highway == 'sendVidIDs') {
        vidIDs = request.ids;
        id = vidIDs[0];
        setIframe(id);
    }
  }
);

function setIframe(id) {
    baseURL = "https://www.youtube.com";
    path = "/embed/";
    queryParams = "?enablejsapi=1&autoplay=1";
    youtubeIframe = $('<iframe id=\"existing-iframe-example\" \
            width=\"640\" height="360" \
            src=\"' + baseURL + path + id + queryParams + '\" \
            frameborder="0" \
            style="border: solid 4px #37474F" \
    ></iframe>/');
    youtubeIframe.insertBefore("#footer");
    $('#existing-iframe-example').hide();
}
