import './loadMovies.scss';
import '../pagination/pagination';

import { showMovies } from '../moviesListMarkup/moviesListMarkup';
import { pagination, createPagination } from '../pagination/pagination';

const main = document.querySelector('#main');

const api_key = 'd2b5af87a64d923fbc9cd42aa4272fb1';
// const newApi_key = 'api_key=d2b5af87a64d923fbc9cd42aa4272fb1';
const BASE_URL = 'https://api.themoviedb.org/3';
const ALL_URL = '/discover/movie?sort_by=popularity.desc&';

// const query = '&query=';
const QUERY = {
  api_key,
  page: 1,
};

const API_URL = `${BASE_URL}${ALL_URL}${new URLSearchParams(QUERY).toString()}`;

// const searchURL = BASE_URL + '/search/movie?' + newApi_key;

window.getMovies = function getMovies(url, page) {
  const loader = document.querySelector('#loader');

  loader.classList.remove('hideLoader');
  loader.classList.add('showLoader');

  main.scrollIntoView({ behavior: 'smooth' });

  lastUrl = url;

  const QUERYNEW = {
    api_key,
    page,
  };

  const API_URLNEW = `${BASE_URL}${ALL_URL}${new URLSearchParams(
    QUERYNEW
  ).toString()}`;

  // console.log(url);

  // console.log(API_URLNEW);

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
      totalPages = data.total_pages = 500;
      page = data.page;
      data = data.results;
      pagination.innerHTML = createPagination(totalPages, page);
      showMovies(data);
    })
    .catch(error => console.log(error));
};

getMovies(API_URL);
