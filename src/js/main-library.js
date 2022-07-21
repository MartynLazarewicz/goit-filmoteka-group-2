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
    
    const watchedRemoveButton = document.querySelector(
      `.modal-content__buttons--remove-from-watched`
    );

    watchedRemoveButton.addEventListener('click', () => {
      const watchedMovieId = watchedMovie.id;
      const watchedMovieFromLibraryById = document.getElementById(watchedMovieId);
      const watchedMovieFromLibraryByIdParent = watchedMovieFromLibraryById.parentNode;
      watchedMovieFromLibraryByIdParent.remove();
      
      const storageLibraryWatched = JSON.parse(localStorage.libraryWatched);
      const lengthOfLibraryWatched = storageLibraryWatched.length;

      for (let i = 0; i <= lengthOfLibraryWatched; ++i){

        //let filmFromStorage = storageLibraryWatched[i].id;
        const watchedMovieIdInt = parseInt(watchedMovieId);

        if (storageLibraryWatched[i].id === watchedMovieIdInt) {
          alert('film do usunięcia');
          storageLibraryWatched[i].remove();
          reload();
          break;
          
        }
        else {
          alert(storageLibraryWatched[i].id);
          alert('X'+watchedMovieId);
        }
      }
    });
  
    document.getElementById('modal' + movie.id).style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
  });

  document.getElementById('close' + movie.id).addEventListener('click', () => {
    document.getElementById('modal' + movie.id).style.display = 'none';
    document.querySelector('body').style.overflow = 'visible';
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