// API INTEGRATION (TMDB)

const API_KEY = `api_key=cebd05b01198a3b1c7147fd20944f4c6`;
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');

function getMovies(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.results);
            showMovies(data.results);
        });
}

// Creating movie card

function showMovies(data) {
    main.innerHTML = '';

    data.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement('div'); // Specify 'div' as the element type.
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <!-- rating -->
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview};
        </div>
        `;

        main.appendChild(movieElement);
    });
}

// Adding the color rating

function getColor(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

getMovies(API_URL);
