const modal = document.getElementById('myModal');
let esc;
// Get the button that opens the modal
const btn = document.getElementById('myBtn');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = 'block';
  document.querySelector('body').style.overflow = 'hidden';
};

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', () => {
     modal.style.display = 'none';
    document.querySelector('body').style.overflow = 'visible';
}
)

// When the user clicks anywhere outside of the modal, close it
modal.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    modal.style.display = 'none';
  }
});


