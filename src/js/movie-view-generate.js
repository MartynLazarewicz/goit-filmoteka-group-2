const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export const getMovieBoxView = function (
    id,
    poster_path,
    title,
    vote_average,
    genreNames,
    release_date
  ) {
    return `
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
            )} | ${release_date.slice(0, 4)} </p><span class="${getColor(
      vote_average
    )}">${vote_average}</span>
          </div>
                  
      </div>
      `;
  };
  
  export const getMovieModal = function (
    id,
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genreNames,
    overview
  ) {
    return `
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
            <p class="modal-content__items--vote">${vote_average} / ${vote_count}</p>
            <p class="modal-content__items--popularity">${Math.round(
              popularity
            ).toLocaleString()}</p>
            <p class="modal-content__items--title">${original_title}</p>
            <p class="modal-content__items--genre">${genreNames[0]}</p>
          </div>
          <h3 class="modal-content__about">About</h3>
          <p class="modal-content__description">${overview}</p>
          </div>
        </div>
        </div>
      </div>
      `;
  };

  function getColor(vote) {
    if (vote >= 8) {
      return 'green';
    } else if (vote >= 4) {
      return 'orange';
    } else {
      return 'red';
    }
  }