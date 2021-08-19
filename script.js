// Get Quotes From API
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// Show New Quote
function newQuote(){
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
  quoteText.textContent = quote.text;
}

async function getQuotes() {
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


getQuotes();