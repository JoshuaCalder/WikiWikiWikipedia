//background.js
// chrome.browserAction.onClicked.addListener(function(tab) {
//     debugger;
//     chrome.tabs.executeScript(null,
//      {file:"https://apis.google.com/js/client.js?onload=googleApiClientReady"});
// });

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     $.get("https://apis.google.com/js/client.js?onload=googleApiClientReady", function(result) {
//         chrome.tabs.executeScript(tabs[0].id, {code: result});
//     }, "text");
// });
//

// xhr = new XMLHttpRequest();
// xhr.open("GET", "https://apis.google.com/js/client.js?onload=googleApiClientReady", true);
// xhr.onreadystatechange = function() {
//   if (xhr.readyState == 4) {
//       // WARNING! Might be evaluating an evil script!
//       // resp = eval("(" + xhr.responseText + ")");
//       // Or this if it's work
//       chrome.tabs.executeScript(tabs[0].id, {code: xhr.responseText});
//   }
// }
// xhr.send();

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://apis.google.com/js/client.js?onload=googleApiClientReady", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // innerText does not let the attacker inject HTML elements.
    // document.getElementById("resp").innerText = xhr.responseText;
  }
}
xhr.send();

chrome.browserAction.onClicked.addListener(function(tab) { alert("Loading api..."); });

search();
