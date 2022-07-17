export async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  const loader = document.querySelector('#loader');

  loader.classList.remove('hideLoader');
  loader.classList.add('showLoader');

  // Storing data in form of JSON
  var apidata = response.json();
  let stateCheck = setInterval(() => {
    const allImagesLoaded =
      [...document.querySelectorAll('img')]
        .map(x => x.complete)
        .indexOf(false) === -1;
    if (response.status >= 200 && response.status < 300 && allImagesLoaded) {
      clearInterval(stateCheck);
      // document ready
      // console.log('ready');
      const myTimeout = setTimeout(myFunc, 300);

      function myFunc() {
        loader.classList.add('hideLoader');
        loader.classList.remove('showLoader');
      }
    }
  }, 100);
}
