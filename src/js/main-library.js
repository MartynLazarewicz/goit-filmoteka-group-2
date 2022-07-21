import { getMovieBoxView, getMovieModal } from './movie-view-generate.js';
import { genre } from './genres.js';
const mainWatched = document.querySelector('#main-watched');
const mainQueue = document.querySelector('#main-queue');

const libraryWatched = JSON.parse(localStorage.getItem('libraryWatched'));
const libraryQueue = JSON.parse(localStorage.getItem('libraryQueue'));

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

  const watchedMovie = document.getElementById(movie.id);

  watchedMovie.addEventListener('click', () => {
    //document.getElementsByClassName("modal-content__buttons--remove-from-watched").style.display = 'block';

    const watchedRemoveButton = document.querySelector(
      `.modal-content__buttons--remove-from-watched`
    );

    watchedRemoveButton.addEventListener('click', () => {
      const watchedMovieId = watchedMovie.id;
      const watchedMovieFromLibraryById =
        document.getElementById(watchedMovieId);
      const watchedMovieFromLibraryByIdParent =
        watchedMovieFromLibraryById.parentNode;
      watchedMovieFromLibraryByIdParent.remove();
    });

    document.getElementById('modal' + movie.id).style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
  });

  // When the user clicks on <span> (x), close the modal
  document.getElementById('close' + movie.id).addEventListener('click', () => {
    document.getElementById('modal' + movie.id).style.display = 'none';
    document.querySelector('body').style.overflow = 'visible';
  });

  //When the user clicks anywhere outside of the modal, close it
  const modalWindow = document.getElementById('modal' + movie.id);
  document.getElementById('modal' + movie.id).addEventListener('click', e => {
    if (e.target == modalWindow) {
      document.getElementById('modal' + movie.id).style.display = 'none';
      document.querySelector('body').style.overflow = 'visible';
    }
  });

  // When the user pressed esc, close the modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.getElementById('modal' + movie.id).style.display = 'none';
      document.querySelector('body').style.overflow = 'visible';
    }
  });
});

libraryQueue.forEach(movie => {
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
  mainQueue.appendChild(movieEl);

  const queueMovie = document.getElementById(movie.id);
    
  queueMovie.addEventListener('click', () => {
    
    //document.getElementsByClassName("modal-content__buttons--remove-from-queue").style.display = 'block';
    
    const queueRemoveButton = document.querySelector(
      `.modal-content__buttons--remove-from-queue`
    );

    queueRemoveButton.addEventListener('click', () => {
      const queueMovieId = queueMovie.id;
      const queueMovieFromLibraryById = document.getElementById(queueMovieId);
      const queueMovieFromLibraryByIdParent = queueMovieFromLibraryById.parentNode;
      queueMovieFromLibraryByIdParent.remove();
    });


    document.getElementById('modal' + movie.id).style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
  });

  document.getElementById('close' + movie.id).addEventListener('click', () => {
    document.getElementById('modal' + movie.id).style.display = 'none';
    document.querySelector('body').style.overflow = 'visible';
  });
});