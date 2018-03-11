
// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
}

function search(WikiTitle) {

    console.log('Search Started');
    var title = WikiTitle;
    alert('title: ' + title);
	console.log('Search Request');

    request = gapi.client.youtube.search.list({
		q: title,
        part: 'id, snippet',
        type: 'video',
        order: 'relevance'
     });


  request.execute(function(response) {
    // vid1ID = parseYoutubeSearchResults(response);
    // sendVidID(vid1ID);
    vidIDS = parseYoutubeSearchResults(response);
    sendVidIDs(vidIDS);
  });
}

// function parseYoutubeSearchResults(res) {
//     vid1ID = res['items'][0]['id']['videoId'];
//     return vid1ID;
// }

function parseYoutubeSearchResults(res) {
    vidIDs = [];
    vid1ID = res['items'][0]['id']['videoId'];
    results = res['items'];
    for (var i = 0; i < results.length || i < 5 ; i++) {
        id = results[i]['id']['videoId'];
        vidIDs[i] = id;
    }
    alert(vidIDs[0])
    return vidIDs;
}

function sendVidID(id) {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {id: id, highway: 'sendVidID'}, function(response) {

        });
    });

}

function sendVidIDs(ids) {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {ids: ids, highway: 'sendVidIDs'}, function(response) {
            // alert(ids[0])
        });
    });

}
