import './myLibrary.scss';
import { getMovieBoxView, getMovieModal } from './localStorageMoviesList.js';
import { genre } from '../genres/genres';
import './localStorageBtnChange';
const mainLibrary = document.querySelector('#mainLibrary');

const getGenreNamesFromIds = function (genre_ids) {
  let genreArrayOfObj = genre.filter(function (g) {
    return genre_ids.indexOf(g.id) !== -1;
  });

  const genreNames = genreArrayOfObj.map(a => a.name);
  return genreNames;
};

export function showLocalQueue() {
  const libraryQueue = JSON.parse(localStorage.getItem('libraryQueue')) || [];
  if (libraryQueue.length >= 1) {
    libraryQueue.forEach(movie => {
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
      const genresNames = getGenreNamesFromIds(movie.genre_ids);

      const movieBox = getMovieBoxView(
        id,
        poster_path,
        title,
        vote_average,
        genresNames,
        release_date
      );
      const modal = getMovieModal(
        id,
        poster_path,
        title,
        vote_average,
        vote_count,
        popularity,
        original_title,
        genresNames,
        overview
      );

      movieEl.innerHTML = movieBox + modal;
      mainLibrary.insertAdjacentElement('beforeend', movieEl);

      document.getElementById(id).addEventListener('click', () => {
        document.getElementById('modal' + id).style.display = 'block';
        document.querySelector('body').style.overflow = 'hidden';
      });

      document
        .getElementById('close' + movie.id)
        .addEventListener('click', () => {
          document.getElementById('modal' + movie.id).style.display = 'none';
          document.querySelector('body').style.overflow = 'visible';
        });

      window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          document.getElementById('modal' + id).style.display = 'none';
          document.querySelector('body').style.overflow = 'visible';
        }
      });
    });
  }
}

export function showLocalWatched() {
  const libraryWatched =
    JSON.parse(localStorage.getItem('libraryWatched')) || [];
  if (libraryWatched.length >= 1) {
    libraryWatched.forEach(movie => {
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
      const genresNames = getGenreNamesFromIds(movie.genre_ids);

      const movieBox = getMovieBoxView(
        id,
        poster_path,
        title,
        vote_average,
        genresNames,
        release_date
      );
      const modal = getMovieModal(
        id,
        poster_path,
        title,
        vote_average,
        vote_count,
        popularity,
        original_title,
        genresNames,
        overview
      );

      movieEl.innerHTML = movieBox + modal;
      mainLibrary.insertAdjacentElement('beforeend', movieEl);

      document.getElementById(id).addEventListener('click', () => {
        document.getElementById('modal' + id).style.display = 'block';
        document.querySelector('body').style.overflow = 'hidden';
      });

      document
        .getElementById('close' + movie.id)
        .addEventListener('click', () => {
          document.getElementById('modal' + movie.id).style.display = 'none';
          document.querySelector('body').style.overflow = 'visible';
        });

      window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          document.getElementById('modal' + id).style.display = 'none';
          document.querySelector('body').style.overflow = 'visible';
        }
      });
    });
  }
}

showLocalQueue();
