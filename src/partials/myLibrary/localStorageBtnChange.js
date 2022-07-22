const btnWatched = document.getElementById('btn-watched');
const btnQueue = document.getElementById('btn-queue');

function eventWatched() {
  document.getElementById('main-watched').style.display = 'flex';
  document.getElementById('main-queue').style.display = 'none';
}

function eventQueue() {
  document.getElementById('main-watched').style.display = 'none';
  document.getElementById('main-queue').style.display = 'flex';
}

btnWatched.onclick = eventWatched;
btnQueue.onclick = eventQueue;
