const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('text');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// get quote from API
async function getQuote() {
    showLoadingSpinner();

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        if (data.quoteAuthor === '') {
            quoteAuthor.innerText = 'unknown';
        } else {
            quoteAuthor.innerText = data.quoteAuthor;
        }

        if (data.quoteText.length > 120) {
            quoteText.classList.add('quote--long');
        } else {
            quoteText.classList.remove('quote--long');
        }
        quoteText.innerText = data.quoteText;

        removeLoadingSpinner();
    } catch (error) {
        console.log(error);
        getQuote();
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(twitterUrl, '_blank');
}

twitterButton.addEventListener('click', tweetQuote);
newQuoteButton.addEventListener('click', getQuote);

// on load
getQuote();
