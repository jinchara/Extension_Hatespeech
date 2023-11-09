// content.js

// Load your list of words to replace from your database
const wordsToReplace = ['chess', 'example', 'anotherword','gave'];

// Function to replace the words from the database with spaces within <div> elements
function replaceWordsWithSpacesInDivs() {
  const divElements = document.querySelectorAll('div[class="xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs"]');
  
  divElements.forEach((div) => {
    wordsToReplace.forEach((word) => {
      const regexPattern = new RegExp(word, 'gi');
      div.innerHTML = div.innerHTML.replace(regexPattern, ' ');
    });

    // Send the content of the div to the background script
    chrome.runtime.sendMessage({ action: "saveContent", content: div.innerHTML });
  });
}

// Function to run the content replacement periodically
function runContentReplacement() {
  setInterval(() => {
    replaceWordsWithSpacesInDivs();
  }, 500); // Replace content every 0.5 seconds (adjust the interval as needed)
}

// Call the function when the page is loaded
replaceWordsWithSpacesInDivs();

// Run content replacement periodically
runContentReplacement();
