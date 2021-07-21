const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter-button")
const newQuoteBtn = document.getElementById("new-quote-button")


let quoteJson = {
    'content': 'Oops, something went wrong. Please try again later.',
    'author': 'Creator'
};

//Show quote
function showQuote() {
    const quote = quoteJson.content;
    const author = quoteJson.author;

    quoteText.textContent = quote;
    //Unknown for empty author
    if(!author){
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = author;
    }

    //Styling change for long quotes
    if(quote.length > 80) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-qoute")
    }
}

//Get new quote
async function getNewQuote() {
    const url = 'https://api.quotable.io/random'
    try {
        const response = await fetch(url);
        quoteJson = await response.json();
        console.log
    } catch (error) {
        alert("Error while loading new quote...");
        console.log(error);
    }
    showQuote()
}
//EVENT LISTENERS
newQuoteBtn.addEventListener('click', getNewQuote);
twitterBtn.addEventListener('click', {});

//ON LOAD
getNewQuote();
