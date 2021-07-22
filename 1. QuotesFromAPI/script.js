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

//showing loading spinner
function showLoadingSpinner() {
    loader.style.visibility = "visible";
    quoteContainer.style.visibility = "hidden";
}

//hide loading spinner
function hideLoadingSpinner() {
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

    hideLoadingSpinner()
}

//Get new quote
async function getNewQuote(counter) {
    const url = 'https://api.quotable.io/random'
    showLoadingSpinner()
    try {
        const response = await fetch(url);
        quoteJson = await response.json();
    } catch (error) {
        counter++;
        if(counter == 10) {
            console.log(error);
        } else {
            getNewQuote(counter)
        }
    }
    showQuote()
}

//Post a tweet
function postTweet() {
    const url =  `https://twitter.com/intent/tweet?text${quoteText.textContent} - ${authorText.textContent}`

    window.open(url, '_blank')
}

//api cors policy error solution
/*
//cors anywhere solution
//may be crowded and cause 429 error
function getFromApi() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const apiUrl = "someApiUrl"

    const repsponse = fetch(proxyUrl + apiUrl)
}

//my own proxy
1. install heroku cli
2. install node
in terminal:
3. heroku login
4. git clone {Rob--W's cors-anywhere server}
5. cd cors folder
6. npm install
7. heroku create
8. git push heroku master
in code:
9. copy/paste proxy url of the server instead of free for all one

*/

//EVENT LISTENERS
newQuoteBtn.addEventListener('click', function() {
    getNewQuote(0);
});
twitterBtn.addEventListener('click', postTweet);

//ON LOAD
getNewQuote(0);
