//background.js
chrome.browserAction.onClicked.addListener(function(tab) {
     alert("Loading api...");
 });

chrome.runtime.onMessage.addListener(gotTitle);

function gotTitle(title, sender, sendResponse) {
    if(title.highway == 'wikititle') {
        WikiTitle = title.title;
        alert('Title received: ' + title.title);
        search(WikiTitle);
    }
}
