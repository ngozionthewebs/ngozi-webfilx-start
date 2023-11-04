// API INTEGRATION (TMDB)

const API_KEY = `api_key=cebd05b01198a3b1c7147fd20944f4c6`;
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie' + API_KEY;

//GENRES/FILTERING

const genres =  [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]



const main = document.getElementById('main');

//Activating the search 
const form = document.getElementById ('form');
const search =  document.getElementById('search');
const filtersEl = document.getElementById('filters')

//SETTING THE GENRE

var selectedGenre = []
setGenre();
function setGenre(){
    filtersEl.innerHTML = '';

    genres.forEach(genre => {
        const t = document.createElement('div')
        t.classList.add('filter');
        t.id=genre.id;
        t.innerText = genre.name;
        //making it clickable
        t.addEventListener('click', () =>{
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id,idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx,1)
                        }
                    })
                } else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            //Calling the API to load to the genres
            getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.
            join(',')))
            activeSelection()
        })
        filtersEl.append(t)

    })


}

//Seeing Active filter

function activeSelection() {

    const filters = document.querySelectorAll('.filter');
    filters.forEach(filter =>{
        filter.classList.remove('active')
    })

    if(selectedGenre.length !=0){

        selectedGenre.forEach(id =>{
            const activeFilter = document.getElementById(id)
            activeFilter.classList.add('active')
        })
    }
    
} 



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
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.setAttribute('data-movie-id', movie.id); // Set a unique movie ID
        movieElement.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview};
        </div>
        <button class="btn btn-primary" onclick="seeMore(this, ${JSON.stringify(movie)})">See More</button>
        <button class="btn btn-secondary">Add to Favorites</button>
        `;
        main.appendChild(movieElement);
    });
}

function seeMore(button, movie) {
    // Store the movie data in local storage
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
  
    // Redirect to the "individual movie" page
    window.location.href = 'movie-details.html';
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

//When search is submitted
form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    // Get the search term from the input field
    const searchTerm = search.value;

    if(searchTerm){
        // Use searchTerm in the URL
        getMovies(searchURL + '&query=' + searchTerm);
    }
})

//Local Storage 
const saveMovieData ={

}


