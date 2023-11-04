// Step 1: Set up the basics
let watchlist = []; // This array will store watchlist data
const watchlistContainer = document.getElementById('watchlist'); // Get the watchlist container in your HTML

// Load watchlist data from local storage
function loadWatchlistFromLocalStorage() {
  const watchlistData = localStorage.getItem('watchlist');
  if (watchlistData) {
    watchlist = JSON.parse(watchlistData);
  }
}

// Function to save the watchlist to local storage
function saveWatchlistToLocalStorage() {
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

// Function to display the watchlist
function displayWatchlist() {
  watchlistContainer.innerHTML = ''; // Clear the existing watchlist container

  watchlist.forEach((movieData, index) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('watchlist-movie');

    // Customize the HTML structure of the watchlist movie card
    movieCard.innerHTML = `
      <h3>${movieData.title}</h3>
      <p>${movieData.overview}</p>
    `;

    // Add a button to remove the movie from the watchlist
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove from Watchlist';
    removeButton.addEventListener('click', () => {
      removeFromWatchlist(index); // Remove the movie at this index
    });

    movieCard.appendChild(removeButton);
    watchlistContainer.appendChild(movieCard);
  });
}

// Function to add a movie to the watchlist
function addToWatchlist(movieData) {
  watchlist.push(movieData);
  saveWatchlistToLocalStorage();
  displayWatchlist();
}

// Function to remove a movie from the watchlist
function removeFromWatchlist(index) {
  if (index >= 0 && index < watchlist.length) {
    watchlist.splice(index, 1);
    saveWatchlistToLocalStorage();
    displayWatchlist();
  }
}

// Add to watchlist button click event (replace sample data with your movie data)
document.getElementById('add-to-watchlist-button').addEventListener('click', () => {
  const sampleMovieData = {
    title: 'Sample Movie',
    overview: 'This is a sample movie overview.',
    // Add other movie data here
  };
  addToWatchlist(sampleMovieData);
  alert('Movie added to watchlist!');
});

// Load the watchlist from local storage and display it when the page loads
window.addEventListener('load', () => {
  loadWatchlistFromLocalStorage();
  displayWatchlist();
});
