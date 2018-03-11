
// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
}

function search(WikiTitle) {

    console.log('Search Started');
    var title = WikiTitle;
    // alert('title: ' + title);
	console.log('Search Request');

    request = gapi.client.youtube.search.list({
		q: title,
        part: 'id, snippet',
        type: 'video',
        order: 'relevance'
     });


  request.execute(function(response) {
    vid1ID = parseYoutubeSearchResults(response);
    sendVidID(vid1ID);
    var str = JSON.stringify(response.result);
  });
}

function parseYoutubeSearchResults(res) {
    vid1ID = res['items'][0]['id']['videoId'];
    return vid1ID;
}

function sendVidID(id) {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {id: id}, function(response) {

        });
    });

}
