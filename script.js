// Get Quotes From API
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const background = document.querySelector('.quote-container');
const colors = ["#262b2f","#00626f","#0f3b57","#00022e","#112222","#2a293e","#2b6867","#29304e","#020035","#34414e","#040348","#391285","#203e4a","#184343","#0000aa","#000133","#033500","#373e02","#6f7755","#547053","#11574a","#80884e","#495e35","#696006","#11887b","#044a05","#004953","#35654d","#014600","#3e6257","#3d6c54","#062e03","#004400","#b4262a","#d1001c","#c14a09","#7f4330","#c65102","#ba160c","#ca6636","#e6ba45","#d5b60a","#900020","#420303","#840000","#820000","#9e1212","#800000","#4a0100","#980036","#3d0c02","#220a0a","#3a181a","#af2f0d","#9c004a","#d90166","#cb416b","#b0306a","#490648","#76424e","#35063e","#80444c","#36013f","#674c47","#280137","#4d233d","#5c4450","#673a3f","#605467","#553f2d","#442200","#593c39","#742802","#341c02","#490206","#410200","#4f1507","#754600","#7f7053","#937a62","#5c5337","#985538","#755139","#3b2820","#573b2a","#415764","#48412b","#4e5552","#333333","#363737",
"#646356","#716e61","#565350","#25342b","#4e5541","#2a2a35","#6f828a","#404854","#4d4b3a","#110022","#2a2b2d","#5a5348","#50574c","#1d0200","#5d5242","#3b3c36","#1e272c","#362d26","#171717","#23191e","#0a0502","#161616","#080808","#2b0202","#050d25","#302621","#1b1811","#3b302f"];

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
  //random bg color from the list
  background.style.backgroundColor = `${colors[Math.floor(Math.random() * colors.length)]}aa`;
  
  loading(); //start loader
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