function injectWebRTCDisable(){

    var initialDiv = document.createElement("script");

    initialDiv.innerHTML= 
    "window.RTCPeerConnectionTemp=window.RTCPeerConnection;\
    window.mozRTCPeerConnectionTemp=window.mozRTCPeerConnection;\
    window.webkitRTCPeerConnectionTemp=window.webkitRTCPeerConnection;\
    \
    window.RTCPeerConnection=null;\
    window.mozRTCPeerConnection=null;\
    window.webkitRTCPeerConnection=null;\
    ";

    document.documentElement.appendChild(initialDiv);

}

function checkWebPage(pageContent){
    var possibleWebRTCuseArray = ["new RTCPeerConnection", "window.RTCPeerConnectionTemp;"];
    if (possibleWebRTCuseArray.some(v => str.includes(v))) {
        alert("Possible IP leak from Webrtc...");
    }
}

function onWindowLoad() {

    var message = document.querySelector('#message');
  
    chrome.tabs.executeScript(null, {
      file: "getPagesSource.js"
    }, function() {
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  
    checkWebPage(message);
  }
  
  window.onload = onWindowLoad;


injectWebRTCDisable();
checkWebPage();