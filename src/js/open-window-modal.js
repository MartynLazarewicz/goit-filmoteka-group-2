const modal = document.getElementById('myModal');
const btn = document.getElementById('myBtn');
const span = document.getElementsByClassName('close')[0];
const body = document.querySelector('body');

btn.onclick = function () {
  modal.style.display = 'block';
  body.classList.add('noOverFlow');
};

span.onclick = function () {
  modal.style.display = 'none';
  body.classList.remove('noOverFlow');
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    body.classList.remove('noOverFlow');
  }
};
