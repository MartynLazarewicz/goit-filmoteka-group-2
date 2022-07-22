import { genre } from '../genres/genres';
import Notiflix from 'notiflix';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.querySelector('#main');

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
            )} | ${undefinedDate(release_date)} </p><span>${vote_average}</span>
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

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        document.getElementById('modal' + id).style.display = 'none';
        document.querySelector('body').style.overflow = 'visible';
      }
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

function undefinedDate(release_date) {
  if (release_date === undefined) {
    return 'N/A';
  } else {
    return release_date.slice(0, 4);
  }
}

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
    if (getLocalStorage.find(m => m.id === movie.id) === undefined) {
      getLocalStorage.push(movie);
      localStorage.setItem(key, JSON.stringify(getLocalStorage));
    }
    Notiflix.Notify.success('The video is on to the list');
  }
}
