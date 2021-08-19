// Get Quotes From API
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading 
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading 
function coplete(){
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show New Quote
function newQuote(){
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (quote.author){
    authorText.textContent = quote.author;
  } else {
    authorText.textContent = 'Unknown author'; // when there is no autor 
  }
  if (quote.text.length > 100){
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  //Set quote and hide loader
  quoteText.textContent = quote.text;
  coplete();
}

// Fetch quotes from API
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl); // response will not be populated until data is fetched
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    // Catch Error
    console.log(err);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Twitter button listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();