import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

// import { tags, setGenre } from './fn-genres.js';
// import { genresToggle } from './genres-btn.js';
import { genre } from './genres.js';

import { getapi } from './loader.js';

const API_KEY = 'api_key=d2b5af87a64d923fbc9cd42aa4272fb1';
const BASE_URL = 'https://api.themoviedb.org/3';
const ALL_URL = '/discover/movie?sort_by=popularity.desc&';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const QUERY = '&query=';
export const API_URL = BASE_URL + ALL_URL + API_KEY;

const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const warning = document.querySelector('.form__warning');
const main = document.querySelector('#main');
const form = document.querySelector('#form');

// Pagination elements

const prev = document.querySelector('#prev');
const first = document.querySelector('#first');
const prevDotts = document.querySelector('#prev-dotts');
const prev2 = document.querySelector('#prev-2');
const prev1 = document.querySelector('#prev-1');
const current = document.querySelector('#current');
const next1 = document.querySelector('#next-1');
const next2 = document.querySelector('#next-2');
const nextDotts = document.querySelector('#next-dotts');
const total = document.querySelector('#total');
const next = document.querySelector('#next');

const firstPage = 1;
let prev2Page = -1;
let prev1Page = 0;
let currentPage = 1;
let next1Page = 2;
let next2Page = 3;
let nextPage = 2;
let prevPage = 3;
let totalPages = 100;

let lastUrl = '';

// API query
let movies;
getMovies(API_URL);

export function getMovies(url) {
  lastUrl = url;
  // console.log(lastUrl);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      getapi(API_URL);
      movies = data.results;
      showMovies(movies);

      currentPage = data.page;
      if (currentPage > 1) {
        prev1Page = data.page - 1;
      }
      prev2Page = data.page - 2;

      console.log('THIS: ' + currentPage + ' of ' + totalPages);

      prev2Page = currentPage - 2;
      prev1Page = currentPage - 1;
      nextPage = currentPage + 1;
      next1Page = currentPage + 1;
      next2Page = currentPage + 2;
      prevPage = currentPage - 1;
      totalPages = data.total_pages;

      prev2.innerHTML = prev2Page;
      prev1.innerHTML = prev1Page;
      current.innerText = currentPage;
      next1.innerHTML = next1Page;
      next2.innerHTML = next2Page;
      total.innerHTML = totalPages;

      if (totalPages === 1) {
        prevDotts.style.display = 'none';
        first.style.display = 'none';
        prev2.style.display = 'none';
        prev1.style.display = 'none';
        prev.classList.add('disabled');
        prev.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6666 8H3.33325" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99992 12.6668L3.33325 8.00016L7.99992 3.3335" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
        next1.style.display = 'none';
        next2.style.display = 'none';
        nextDotts.style.display = 'none';
        total.style.display = 'none';
        next.classList.add('disabled');
        next.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33341 8H12.6667" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00008 12.6668L12.6667 8.00016L8.00008 3.3335" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      } else if (totalPages === 2 && currentPage === 1) {
        prevDotts.style.display = 'none';
        first.style.display = 'none';
        prev2.style.display = 'none';
        prev1.style.display = 'none';
        prev.classList.add('disabled');
        prev.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6666 8H3.33325" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99992 12.6668L3.33325 8.00016L7.99992 3.3335" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
        next1.style.display = 'flex';
        next2.style.display = 'none';
        nextDotts.style.display = 'none';
        total.style.display = 'none';
        next.classList.remove('disabled');
        next.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33341 8H12.6667" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00008 12.6668L12.6667 8.00016L8.00008 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      } else if (totalPages === 2 && currentPage === 2) {
        prevDotts.style.display = 'none';
        first.style.display = 'none';
        prev2.style.display = 'none';
        prev1.style.display = 'flex';
        prev.classList.remove('disabled');
        prev.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6666 8H3.33325" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99992 12.6668L3.33325 8.00016L7.99992 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
        next1.style.display = 'flex';
        next2.style.display = 'none';
        nextDotts.style.display = 'none';
        total.style.display = 'none';
        next.classList.add('disabled');
        next.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33341 8H12.6667" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00008 12.6668L12.6667 8.00016L8.00008 3.3335" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      } else if (totalPages === 3 && currentPage === 1) {
        prevDotts.style.display = 'none';
        first.style.display = 'none';
        prev2.style.display = 'none';
        prev1.style.display = 'none';
        prev.classList.add('disabled');
        prev.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6666 8H3.33325" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99992 12.6668L3.33325 8.00016L7.99992 3.3335" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
        next1.style.display = 'flex';
        next2.style.display = 'flex';
        nextDotts.style.display = 'none';
        total.style.display = 'none';
        next.classList.remove('disabled');
        next.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33341 8H12.6667" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00008 12.6668L12.6667 8.00016L8.00008 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      } else if (totalPages === 3 && currentPage === 2) {
        prevDotts.style.display = 'none';
        first.style.display = 'none';
        prev2.style.display = 'none';
        prev1.style.display = 'flex';
        prev.classList.remove('disabled');
        prev.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6666 8H3.33325" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99992 12.6668L3.33325 8.00016L7.99992 3.3335" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
        next1.style.display = 'flex';
        next2.style.display = 'none';
        nextDotts.style.display = 'none';
        total.style.display = 'none';
        next.classList.remove('disabled');
        next.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33341 8H12.6667" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00008 12.6668L12.6667 8.00016L8.00008 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      } else if (totalPages === 3 && currentPage === 3) {
        prevDotts.style.display = 'none';
        first.style.display = 'none';
        prev2.style.display = 'flex';
        prev1.style.display = 'flex';
        prev.classList.remove('disabled');
        prev.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6666 8H3.33325" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99992 12.6668L3.33325 8.00016L7.99992 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
        next1.style.display = 'none';
        next2.style.display = 'none';
        nextDotts.style.display = 'none';
        total.style.display = 'none';
        next.classList.add('disabled');
        next.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33341 8H12.6667" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00008 12.6668L12.6667 8.00016L8.00008 3.3335" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      } else if (totalPages > 3 && currentPage === 1) {
        first.style.display = 'none';
        prevDotts.style.display = 'none';
        prev1.style.display = 'none';
        prev2.style.display = 'none';
        prev.classList.add('disabled');
        prev.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6666 8H3.33325" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99992 12.6668L3.33325 8.00016L7.99992 3.3335" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
        next.classList.remove('disabled');
        next.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33341 8H12.6667" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00008 12.6668L12.6667 8.00016L8.00008 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      } else if (totalPages > 3 && currentPage === 2) {
        prevDotts.style.display = 'none';
        first.style.display = 'none';
        prev1.style.display = 'flex';
        prev2.style.display = 'none';
        prev.classList.remove('disabled');
        prev.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6666 8H3.33325" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99992 12.6668L3.33325 8.00016L7.99992 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
        next.classList.remove('disabled');
        next.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33341 8H12.6667" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00008 12.6668L12.6667 8.00016L8.00008 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      } else if (totalPages > 3 && currentPage === 3) {
        prevDotts.style.display = 'none';
        first.style.display = 'none';
        prev1.style.display = 'flex';
        prev2.style.display = 'flex';
        prev.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6666 8H3.33325" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99992 12.6668L3.33325 8.00016L7.99992 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
        next.classList.remove('disabled');
        next.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33341 8H12.6667" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00008 12.6668L12.6667 8.00016L8.00008 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      } else if (currentPage === 4) {
        prevDotts.style.display = 'none';
        first.style.display = 'flex';
        prev1.style.display = 'flex';
        prev2.style.display = 'flex';
        prev.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6666 8H3.33325" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99992 12.6668L3.33325 8.00016L7.99992 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      } else if (currentPage > 4 && currentPage < totalPages - 2) {
        prevDotts.style.display = 'flex';
        first.style.display = 'flex';
        prev1.style.display = 'flex';
        prev2.style.display = 'flex';
        prev.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6666 8H3.33325" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99992 12.6668L3.33325 8.00016L7.99992 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
        next.classList.remove('disabled');
        next.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33341 8H12.6667" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00008 12.6668L12.6667 8.00016L8.00008 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      } else if (currentPage > 4 && currentPage === totalPages - 2) {
        prev.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6666 8H3.33325" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99992 12.6668L3.33325 8.00016L7.99992 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
        next1.style.display = 'flex';
        next2.style.display = 'none';
        nextDotts.style.display = 'none';
        next.classList.remove('disabled');
        next.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33341 8H12.6667" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00008 12.6668L12.6667 8.00016L8.00008 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      } else if (currentPage > 4 && currentPage === totalPages - 1) {
        prev.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6666 8H3.33325" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99992 12.6668L3.33325 8.00016L7.99992 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
        next1.style.display = 'flex';
        next2.style.display = 'none';
        nextDotts.style.display = 'none';
        total.style.display = 'none';
        next.classList.remove('disabled');
        next.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33341 8H12.6667" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00008 12.6668L12.6667 8.00016L8.00008 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      } else if (currentPage > 4 && currentPage === totalPages) {
        prev.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6666 8H3.33325" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99992 12.6668L3.33325 8.00016L7.99992 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
        next1.style.display = 'none';
        next2.style.display = 'none';
        nextDotts.style.display = 'none';
        next.classList.add('disabled');
        next.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33341 8H12.6667" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00008 12.6668L12.6667 8.00016L8.00008 3.3335" stroke="grey" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
      }

      if (data.results.length === 0) {
        warning.classList.add('show');
      } else {
        warning.classList.remove('show');
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

first.addEventListener('click', () => {
  pageCall(1);
  main.scrollIntoView(true);
});

prev2.addEventListener('click', () => {
  pageCall(prev2Page);
  main.scrollIntoView(true);
});

prev1.addEventListener('click', () => {
  pageCall(prev1Page);
  main.scrollIntoView(true);
});

current.addEventListener('click', () => {
  pageCall(currentPage);
  main.scrollIntoView(true);
});

next1.addEventListener('click', () => {
  pageCall(next1Page);
  main.scrollIntoView(true);
});

next2.addEventListener('click', () => {
  pageCall(next2Page);
  main.scrollIntoView(true);
});

next.addEventListener('click', () => {
  if (nextPage <= totalPages && currentPage + 1 > 0) {
    console.log('NEXT: ' + nextPage);
    pageCall(nextPage);
    main.scrollIntoView(true);
  }
});

prev.addEventListener('click', () => {
  if (prevPage <= totalPages && currentPage - 1 > 0) {
    console.log('PREV: ' + prevPage);
    pageCall(prevPage);
    main.scrollIntoView(true);
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
    } if (getLocalStorage.find(m => m.id === movie.id) === undefined) {
      getLocalStorage.push(movie);
      localStorage.setItem(key, JSON.stringify(getLocalStorage));
    }
     Notiflix.Notify.success('The video is on to the list');
  }
}
