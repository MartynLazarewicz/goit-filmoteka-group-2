const btnWatched = document.getElementById('btn-watched');
const btnQueue = document.getElementById('btn-queue');

const mainLibrary = document.querySelector('#mainLibrary');

import { showLocalQueue, showLocalWatched } from './myLibrary';

btnWatched.addEventListener('click', () => {
  mainLibrary.innerHTML = '';
  showLocalWatched();

  if (btnQueue.classList.contains('library__button--active')) {
    btnQueue.classList.remove('library__button--active');
  }
  btnWatched.classList.add('library__button--active');
});

btnQueue.addEventListener('click', () => {
  mainLibrary.innerHTML = '';
  showLocalQueue();
  if (btnWatched.classList.contains('library__button--active')) {
    btnWatched.classList.remove('library__button--active');
  }
  btnQueue.classList.add('library__button-active');
});
