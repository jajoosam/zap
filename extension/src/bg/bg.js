// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//   console.log(response.farewell);
// });
document.addEventListener('copy', function(e){
	q = window.getSelection().toString();
	var request = new XMLHttpRequest();
	request.open('GET', 'https://api.duckduckgo.com/?skip_disambig=1&format=json&pretty=1&q='+q, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
		
	    var data = JSON.parse(request.responseText);
	    chrome.runtime.sendMessage(data, function(response) {
		  console.log(response.farewell);
		});
	  } else {
	    // We reached our target server, but it returned an error

	  }
	};

	request.onerror = function() {
	  // There was a connection error of some sort
	};

	request.send();
});