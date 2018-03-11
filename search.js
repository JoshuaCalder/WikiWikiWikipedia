
// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
}

function search() {

    console.log('Search Started');
	// var q = $('#query').val();
    var q = 'cats';
    alert(q);
	console.log('Search Request');

    request = gapi.client.youtube.search.list({
		q: 'q',
        part: 'id, snippet',
        type: 'video',
        order: 'date'
     });


  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    $('#search-container').html('<pre>' + str + '</pre>');
    alert(str);
  });
}
