import { getMovieBoxView, getMovieModal } from './movie-view-generate.js';
import { genre } from './genres.js';
const mainWatched = document.querySelector('#main-watched');

const libraryWatched = JSON.parse(localStorage.getItem('libraryWatched'));

const getGenreNamesFromIds = function (genre_ids) {
  let genreArrayOfObj = genre.filter(function (g) {
    return genre_ids.indexOf(g.id) !== -1;
  });

  const genreNames = genreArrayOfObj.map(a => a.name);
  return genreNames;
};

libraryWatched.forEach(movie => {
  const movieEl = document.createElement('div');
  movieEl.classList.add('movie');
  const genresNames = getGenreNamesFromIds(movie.genre_ids);

  const movieBox = getMovieBoxView(
    movie.id,
    movie.poster_path,
    movie.title,
    movie.vote_average,
    genresNames,
    movie.release_date
  );
  const modal = getMovieModal(
    movie.id,
    movie.poster_path,
    movie.title,
    movie.vote_average,
    movie.vote_count,
    movie.popularity,
    movie.original_title,
    genresNames,
    movie.overview
  );

  movieEl.innerHTML = movieBox + modal;
  mainWatched.appendChild(movieEl);

  document.getElementById(movie.id).addEventListener('click', () => {
    document.getElementById('modal' + movie.id).style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
  });

  document.getElementById('close' + movie.id).addEventListener('click', () => {
    document.getElementById('modal' + movie.id).style.display = 'none';
    document.querySelector('body').style.overflow = 'visible';
  });
});
