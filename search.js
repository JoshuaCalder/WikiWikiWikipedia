
// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
}

function search(WikiTitle) {

    console.log('Search Started');
    var title = WikiTitle;
	console.log('Search Request');
    alert(title)
    request = gapi.client.youtube.search.list({
		q: title,
        part: 'id, snippet',
        type: 'video',
        order: 'relevance'
     });


  request.execute(function(response) {
    alert(JSON.stringify(response))
    vidIDS = parseYoutubeSearchResults(response);
    sendVidData(vidIDS);
  });
}

function getVidTitle(response) {
    return response[]
}

function parseYoutubeSearchResults(res) {
    vidIDs = [];
    vid1ID = res['items'][0]['id']['videoId'];
    results = res['items'];
    for (var i = 0; i < results.length || i < 5 ; i++) {
        id = results[i]['id']['videoId'];
        title = results[i]['snippet']['title'];
        vidIDs[i] = {id: id, title: title};
    }
    alert( JSON.stringify(vidIDs) );
    return vidIDs;
}

function sendVidData(ids) {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {ids: ids, highway: 'sendVidData'}, function(response) {
            // alert(ids[0])
        });
    });

}
