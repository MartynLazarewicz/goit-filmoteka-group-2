import './pagination.scss';

export const pagination = document.querySelector('.pagination ul');

export function createPagination(totalPages, page) {
  let liTag = '';
  let active;
  let currPage = page;
  let beforePage = page - 1;
  let afterPage = page + 1;

  if (page > 1) {
    //show the next button if the page value is greater than 1
    liTag += `<li class="btn prev" onclick="getMovies(${totalPages}, ${
      page - 1
    })"><span> << </span></li>`;
  }

  if (page > 2) {
    //if page value is less than 2 then add 1 after the previous button
    liTag += `<li class="first numb" onclick="getMovies(${totalPages}, 1)"><span>1</span></li>`;
    if (page > 3) {
      //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // how many pages or li show before the current li
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      //if plength is greater than totalPage length then continue
      continue;
    }
    if (plength == 0) {
      //if plength is 0 than add +1 in plength value
      plength = plength + 1;
    }
    if (page == plength) {
      //if page is equal to plength than assign active string in the active variable
      active = 'active';
    } else {
      //else leave empty to the active variable
      active = '';
    }
    liTag += `<li class="numb ${active}" onclick="getMovies(${totalPages}, ${plength})"><span>${plength}</span></li>`;
  }

  if (page < totalPages - 1) {
    //if page value is less than totalPage value by -1 then show the last li or page
    if (page < totalPages - 2) {
      //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="getMovies(${totalPages}, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    //show the next button if the page value is less than totalPage(20)
    // console.log(data);

    liTag += `<li class="btn next" onclick="getMovies(${page}, ${
      page + 1
    })"><span> >> </span></li>`;
  }

  // console.log("page", page);
  pagination.innerHTML = liTag; //add li tag inside ul tag
  return liTag; //reurn the li tag
}
