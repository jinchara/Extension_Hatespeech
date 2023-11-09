// popup.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.text) {
        const textContainer = document.getElementById('text-container');
        textContainer.textContent = message.text;
    }
});
