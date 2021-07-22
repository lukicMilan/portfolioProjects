const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter-button")
const newQuoteBtn = document.getElementById("new-quote-button")
const loader = document.getElementById("loader")
const quoteContainer = document.getElementById("quote-container")


let quoteJson = {
    'content': 'Oops, something went wrong. Please try again later.',
    'author': 'Creator'
};

//showing loader
function showLoader() {
    loader.style.visibility = "visible";
    quoteContainer.style.visibility = "hidden";
}

//hide loader
function hideLoader() {
    loader.style.visibility = "hidden";
    quoteContainer.style.visibility = "visible";
}

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

    hideLoader()
}

//Get new quote
async function getNewQuote() {
    const url = 'https://api.quotable.io/random'
    showLoader()
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

//Post a tweet
function postTweet() {
    const url =  `https://twitter.com/intent/tweet?text${quoteText.textContent} - ${authorText.textContent}`

    window.open(url, '_blank')
}

//EVENT LISTENERS
newQuoteBtn.addEventListener('click', getNewQuote);
twitterBtn.addEventListener('click', postTweet);

//ON LOAD
getNewQuote();
