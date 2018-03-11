
// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
}

function search(WikiTitle) {

    console.log('Search Started');
    var title = WikiTitle;
	console.log('Search Request');

    request = gapi.client.youtube.search.list({
		q: title,
        part: 'id, snippet',
        type: 'video',
        order: 'relevance'
     });


  request.execute(function(response) {
    // alert(JSON.stringify(response))
    vidIDS = parseYoutubeSearchResults(response);
    sendVidIDs(vidIDS);
  });
}

function parseYoutubeSearchResults(res) {
    vidIDs = [];
    vid1ID = res['items'][0]['id']['videoId'];
    results = res['items'];
    for (var i = 0; i < results.length || i < 5 ; i++) {
        id = results[i]['id']['videoId'];
        vidIDs[i] = id;
    }
    // alert( JSON.stringify(vidIDs) );
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
