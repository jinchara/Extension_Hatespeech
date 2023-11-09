// background.js

let storedContent = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveContent") {
    storedContent.push(request.content);
    console.log("Content stored:", request.content);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getStoredContent") {
    sendResponse(storedContent);
  }
});
