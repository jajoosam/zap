chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
      console.log(request)
	  var opt = {
	  type: "basic",
	  title: request["Heading"],
	  message: request["Abstract"],
	  iconUrl: request["Image"],
	  
	}
	if(request["Abstract"] == ""){
		opt.message = request["RelatedTopics"][0]["Text"]
		opt.iconUrl = request["RelatedTopics"][0]["Icon"]["URL"]
		request["AbstractURL"] = request["RelatedTopics"][0]["FirstURL"]
		console.log(opt)
	}
	if(opt.iconUrl==""){
		opt.iconUrl = "https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/139/frame-with-picture_1f5bc.png";
	}
      chrome.notifications.create(opt, function(id) {
	      chrome.notifications.onClicked.addListener(function callback(o){
	      	if(o==id){
	      	chrome.notifications.clear(id);
	      	chrome.tabs.create({ url: request["AbstractURL"] });
	      }
	      })
   		 });
      sendResponse({farewell: "goodbye"});
  });