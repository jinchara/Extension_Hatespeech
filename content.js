// content.js

// Load your list of words to replace from your database
const wordsToReplace = ['chess', 'example', 'anotherword','gave'];

function getTextOfComment(){
  const container = document.querySelectorAll('div[class="xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs"]');


  const result = container.textContent.trim();

  chrome.runtime.sendMessage({ text: result }); // Send the text to the background script

}



// content.js (Content Script)
const targetElement = document.querySelectorAll('div[class="xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs"]');; // Replace 'your-selector' with the appropriate selector

// Define a function to handle the visibility change
function handleVisibilityChange(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // The element is visible
            const text = entry.target.textContent;
            chrome.runtime.sendMessage({ text: text });
            observer.disconnect(); // Stop observing once the element is visible
        }
    });
}

// Create an Intersection Observer
const observer = new IntersectionObserver(handleVisibilityChange, {
    root: null, // Use the viewport as the root
    threshold: 0.5, // Trigger when 50% of the element is visible
});

if (targetElement) {
    observer.observe(targetElement);
}




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
