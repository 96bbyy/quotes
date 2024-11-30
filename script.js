const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')
let apiQuotes = []
// Show Loading
function loading() {
    loader.hidden=false;
    quoteContainer.hidden=true;
}
// Hide Loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
    
}
function newQuote() {
    loading();
    // pick a random quote from apiQuote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.textContent = 'Unknown';}
    else {authorText.textContent = quote.author;}
    // Check quote Length to determine the styling
    if (quote.text.length > 150){
        quoteText.classList.add('long-quote');}
    else {quoteText.classList.remove('long-quote');}
    console.log(quote.text);
    console.log(quote.author);
    // Set Quote, Hide Loader
    complete();
    authorText.textContent = quote.author;
    quoteText.textContent = quote.text;
}
// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        // using async function and the await keyword means
        // response will remain empty until it is populated with the response from api
        // otherwise there would be an error because response would be filled before the 
        // request is complete
        const response = await fetch(apiUrl);
        // check if author field is blank and replace with "unknow"
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // catch error Here
    }
}
// Tweet Button = tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
//Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// On Load
getQuotes();