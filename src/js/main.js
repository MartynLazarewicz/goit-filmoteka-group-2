import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

// import { tags, setGenre } from './fn-genres.js';
// import { genresToggle } from './genres-btn.js';
import { genre } from './genres.js';

const API_KEY = 'api_key=d2b5af87a64d923fbc9cd42aa4272fb1';
const BASE_URL = 'https://api.themoviedb.org/3';
const ALL_URL = '/discover/movie?sort_by=popularity.desc&';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const QUERY = '&query=';
export const API_URL = BASE_URL + ALL_URL + API_KEY;

const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.querySelector('#main');
const form = document.querySelector('#form');

// Pagination elements

const prev = document.querySelector('#prev');
const current = document.querySelector('#current');
const next = document.querySelector('#next');

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = '';
let totalPages = 100;

// API query
async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var apidata = await response.json();
  let stateCheck = setInterval(() => {
    if (
      document.readyState === 'complete' &&
      response.status >= 200 &&
      response.status < 300
    ) {
      clearInterval(stateCheck);
      // document ready
      console.log('ready');
      document.querySelector('#loader').style.display = 'none';
    }
  }, 100);
}

// Calling that async function
getapi(API_URL);

getMovies(API_URL);

export function getMovies(url) {
  lastUrl = url;
  console.log(lastUrl);
  fetch(url)
    .then(res => res.json())
    .then(data => {
      showMovies(data.results);

      currentPage = data.page;

      console.log(currentPage);

      nextPage = data.page + 1;
      prevPage = data.page - 1;
      totalPages = data.total_pages;

      current.innerText = currentPage;

      if (currentPage <= 1) {
        prev.classList.add('disabled');
        next.classList.remove('disabled');
      } else if (currentPage >= totalPages) {
        prev.classList.remove('disabled');
        next.classList.add('disabled');
      } else {
        prev.classList.remove('disabled');
        next.classList.remove('disabled');
      }
      main.scrollIntoView({ behavior: 'smooth' });

      if (data.results.length === 0) {
        console.log('ERROR IN SEARCH');
        getMovies(API_URL);
      }

      if (data.results.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        getMovies(API_URL);
      }
    });
}

export function showMovies(data) {
  main.innerHTML = '';
  data.forEach(movie => {
    const {
      title,
      overview,
      vote_average,
      vote_count,
      genre_ids,
      popularity,
      release_date,
      original_title,
      id,
      poster_path,
    } = movie;

    const movieEl = document.createElement('div');

    movieEl.classList.add('movie');

    let genreArrayOfObj = genre.filter(function (g) {
      return genre_ids.indexOf(g.id) !== -1;
    });

    const genreNames = genreArrayOfObj.map(a => a.name);

    const movieBox = `
      <button type="button" class="movie__btn" id="${id}"><img class="poster-img" src="${
      poster_path
        ? IMG_URL + poster_path
        : 'https://i.pinimg.com/originals/d2/92/47/d2924780042a36811b6bd5473465f7fc.jpg'
    }" alt="image"></button>
      <div class="movie__info">
          <div class="info"><h3 class="info__title">${title}</h3>
          </div>
          <div class="info ">
            <p class="info__genres-and-year">${genreNames.join(
              ', '
            )} | ${undefinedDate(release_date)} </p><span class="${getColor(
      vote_average
    )}">${vote_average}</span>
          </div>
                  
      </div>
      `;

    const modal = `
      <div id="${'modal' + id}" class="modal">
        <div class="modal-content">
          <span id="${'close' + id}" class="close">x</span>
          <div class="modal-content__sides">
            
          <div class="modal-content__img">
                    <img src="${
                      poster_path
                        ? IMG_URL + poster_path
                        : 'https://i.pinimg.com/originals/d2/92/47/d2924780042a36811b6bd5473465f7fc.jpg'
                    }" alt="image"></div>

          <div class="modal-content__right-side">
          <h2 class="modal-content__title">${title}</h2>
          <div class="modal-content__items">
            <p class="modal-content__items--vote"><span class="movies-info">Vote / Votes</span> <span class="vote-color">${vote_average}</span> / ${vote_count}</p>
            <p class="modal-content__items--popularity"><span class="movies-info">Popularity</span> ${Math.round(
              popularity
            ).toLocaleString()}</p>
            <p class="modal-content__items--title"><span class="movies-info">Original Title</span> ${original_title}</p>
            <p class="modal-content__items--genre"><span class="movies-info">Genre</span> ${
              genreNames[0]
            }</p>
          </div>
          <h3 class="modal-content__about">About</h3>
          <p class="modal-content__description">${overview}</p>
          <div class="modal-content__buttons">
            <button type="button" class="modal-content__buttons--add-to-watched">ADD TO WATCHED</button>
            <button type="button" class="modal-content__buttons--add-to-queue">ADD TO QUEUE</button>
          </div>
          </div>
        </div>
        </div>
      </div>
      `;

    movieEl.innerHTML = movieBox + modal;
    main.appendChild(movieEl);

    document.getElementById(id).addEventListener('click', () => {
      document.getElementById('modal' + id).style.display = 'block';
      document.querySelector('body').style.overflow = 'hidden';
    });

    document.getElementById('close' + id).addEventListener('click', () => {
      document.getElementById('modal' + id).style.display = 'none';
      document.querySelector('body').style.overflow = 'visible';
    });

    //  Local Storage

    const btnAddToWatched = document.querySelector(
      `#modal${id} .modal-content__buttons--add-to-watched`
    );

    btnAddToWatched.addEventListener('click', () => {
      addMovieToLibrary('libraryWatched', movie);
    });

    const btnAddToQueue = document.querySelector(
      `#modal${id} .modal-content__buttons--add-to-queue`
    );

    btnAddToQueue.addEventListener('click', () => {
      addMovieToLibrary('libraryQueue', movie);
    });
  });
}

// Vote colors

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 4) {
    return 'orange';
  } else {
    return 'red';
  }
}

// Undefined release date fix

function undefinedDate(release_date) {
  if (release_date === undefined) {
    return 'N/A';
  } else {
    return release_date.slice(0, 4);
  }
}

// Search by keyword

form.addEventListener('submit', e => {
  e.preventDefault();
  const searchTerm = document.querySelector('input').value;
  if (searchTerm) {
    getMovies(searchURL + QUERY + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

// Genres

// setGenre();

// const genresBtn = document.querySelector('.genres-button');
// genresBtn.addEventListener('click', genresToggle);

// Pagination

next.addEventListener('click', () => {
  if (nextPage > 0) {
    pageCall(nextPage);
  }
});

prev.addEventListener('click', () => {
  console.log(currentPage);
  if (prevPage <= totalPages && currentPage - 1 > 0) {
    pageCall(prevPage);
  }
});

function pageCall(page) {
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('?');
  let key = queryParams[queryParams.length - 1].split('=');
  if (key[0] !== 'page') {
    let url = lastUrl + '&page=' + page;
    getMovies(url);
  } else {
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] + '?' + b;
    getMovies(url);
  }
}

// Local Storage

function addMovieToLibrary(key, movie) {
  const libraryItems = localStorage.getItem(key);

  if (libraryItems === null) {
    const data = [movie];
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    const getLocalStorage = JSON.parse(libraryItems);

    if (getLocalStorage.find(m => m.id === movie.id) === undefined) {
      getLocalStorage.push(movie);
      Notiflix.Notify.success('The video has been added to the list');
      localStorage.setItem(key, JSON.stringify(getLocalStorage));
    }
  }
}
