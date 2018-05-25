

function onGranted(){
  document.getElementById("hide").style.display = "none";
document.addEventListener('copy', function(e){
    var q = window.getSelection().toString();
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.duckduckgo.com/?skip_disambig=1&format=json&pretty=1&q='+q, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {

        var data = JSON.parse(request.responseText);
        Push.create(data["Heading"], {
            body: data["Abstract"],
            icon: data["Image"],
            timeout: 4000,
            onClick: function () {
                window.open(data["AbstractURL"])
                this.close();
            }
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
}
function onDenied(){}

function demo(){
  console.log("demo")
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    alert("works only on desktop 🖥️")
    window.location.href="/zap/"
  }
  else{
    Push.Permission.request(onGranted, onDenied);
  }
}
