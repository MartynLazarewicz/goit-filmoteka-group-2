import '../loadMovies/loadMovies.scss';
import '../pagination/pagination';

import { showMovies } from '../moviesListMarkup/moviesListMarkup';
import { pagination, createPaginationSearch } from '../pagination/pagination';
import { getMovies } from '../loadMovies/loadMovies';

const main = document.querySelector('#main');
const form = document.querySelector('#form');

const api_key = 'd2b5af87a64d923fbc9cd42aa4272fb1';
const BASE_URL = 'https://api.themoviedb.org/3';
const ALL_URL = '/search/movie?';

const query = '&query=';
const QUERY = {
  api_key,
  page: 1,
};

const API_URL = `${BASE_URL}${ALL_URL}${new URLSearchParams(QUERY).toString()}`;

// const searchURL = BASE_URL + '/search/movie?' + newApi_key;

window.getMoviesSearch = function getMoviesSearch(url, page, searchTerm) {
  let lastUrl = url;
  searchTerm = document.querySelector('input').value;
  const loader = document.querySelector('#loader');

  loader.classList.remove('hideLoader');
  loader.classList.add('showLoader');

  main.scrollIntoView({ behavior: 'smooth' });

  const QUERY = {
    api_key,
    page,
  };

  const API_URLNEW = `${BASE_URL}${ALL_URL}${new URLSearchParams(
    QUERY
  ).toString()}${'&query='}${searchTerm}`;

  fetch(API_URLNEW, {
    method: 'GET',
  })
    .then(res => {
      const status = res.status;

      if (status >= 200) {
        loader.classList.add('hideLoader');
        loader.classList.remove('showLoader');
      }
      return res.json();
    })
    .then(data => {
      let totalPages = data.total_pages;
      page = data.page;
      data = data.results;

      pagination.innerHTML = createPaginationSearch(totalPages, page);
      showMovies(data);

      if (data.length === 0) {
        document.querySelector('.form__warning').classList.add('show');
      } else {
        document.querySelector('.form__warning').classList.remove('show');
      }
    })
    .catch(error => console.log(error));
};

// form.addEventListener('submit', e => {
//   e.preventDefault();
//   let searchTerm = document.querySelector('input').value;
//   console.log(searchTerm.length);
//   if (searchTerm.length === 0) {
//     document.querySelector('.form__warning').classList.add('show');
//   } else {
//     document.querySelector('.form__warning').classList.remove('show');
//     getMovies();
//   }
//   getMoviesSearch(API_URL + query + searchTerm);
// });

form.addEventListener('submit', e => {
  e.preventDefault();
  let searchTerm = document.querySelector('input').value;
  if (searchTerm.length !== 0) {
    getMoviesSearch(API_URL + query + searchTerm);
  } else {
    location.reload();
  }
});
