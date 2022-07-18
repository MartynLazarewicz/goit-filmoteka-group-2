const e=function(e,t,n,i,d,o){return`\n      <button type="button" class="movie__btn" id="${e}"><img class="poster-img" src="${t?"https://image.tmdb.org/t/p/w500"+t:"https://i.pinimg.com/originals/d2/92/47/d2924780042a36811b6bd5473465f7fc.jpg"}" alt="image"></button>\n      <div class="movie__info">\n          <div class="info"><h3 class="info__title">${n}</h3>\n          </div>\n          <div class="info ">\n            <p class="info__genres-and-year">${d.join(", ")} | ${o.slice(0,4)} </p><span class="${a=i,a>=8?"green":a>=4?"orange":"red"}">${i}</span>\n          </div>\n                  \n      </div>\n      `;var a},t=function(e,t,n,i,d,o,a,l,s){return`\n      <div id="${"modal"+e}" class="modal">\n        <div class="modal-content">\n          <span id="${"close"+e}" class="close">x</span>\n          <div class="modal-content__sides">\n            \n          <div class="modal-content__img">\n                    <img src="${t?"https://image.tmdb.org/t/p/w500"+t:"https://i.pinimg.com/originals/d2/92/47/d2924780042a36811b6bd5473465f7fc.jpg"}" alt="image"></div>\n  \n          <div class="modal-content__right-side">\n          <h2 class="modal-content__title">${n}</h2>\n          <div class="modal-content__items">\n            <p class="modal-content__items--vote">${i} / ${d}</p>\n            <p class="modal-content__items--popularity">${Math.round(o).toLocaleString()}</p>\n            <p class="modal-content__items--title">${a}</p>\n            <p class="modal-content__items--genre">${l[0]}</p>\n          </div>\n          <h3 class="modal-content__about">About</h3>\n          <p class="modal-content__description">${s}</p>\n          </div>\n        </div>\n        </div>\n      </div>\n      `};const n=[{id:28,name:"Action"},{id:12,name:"Adventure"},{id:16,name:"Animation"},{id:35,name:"Comedy"},{id:80,name:"Crime"},{id:99,name:"Documentary"},{id:18,name:"Drama"},{id:10751,name:"Family"},{id:14,name:"Fantasy"},{id:36,name:"History"},{id:27,name:"Horror"},{id:10402,name:"Music"},{id:9648,name:"Mystery"},{id:10749,name:"Romance"},{id:878,name:"Science Fiction"},{id:10770,name:"TV Movie"},{id:53,name:"Thriller"},{id:10752,name:"War"},{id:37,name:"Western"}],i=document.querySelector("#main-watched"),d=document.querySelector("#main-queue"),o=JSON.parse(localStorage.getItem("libraryWatched")),a=JSON.parse(localStorage.getItem("libraryQueue")),l=function(e){return n.filter((function(t){return-1!==e.indexOf(t.id)})).map((e=>e.name))};o.forEach((n=>{const d=document.createElement("div");d.classList.add("movie");const o=l(n.genre_ids),a=e(n.id,n.poster_path,n.title,n.vote_average,o,n.release_date),s=t(n.id,n.poster_path,n.title,n.vote_average,n.vote_count,n.popularity,n.original_title,o,n.overview);d.innerHTML=a+s,i.appendChild(d),document.getElementById(n.id).addEventListener("click",(()=>{document.getElementById("modal"+n.id).style.display="block",document.querySelector("body").style.overflow="hidden"})),document.getElementById("close"+n.id).addEventListener("click",(()=>{document.getElementById("modal"+n.id).style.display="none",document.querySelector("body").style.overflow="visible"}))})),a.forEach((n=>{const i=document.createElement("div");i.classList.add("movie");const o=l(n.genre_ids),a=e(n.id,n.poster_path,n.title,n.vote_average,o,n.release_date),s=t(n.id,n.poster_path,n.title,n.vote_average,n.vote_count,n.popularity,n.original_title,o,n.overview);i.innerHTML=a+s,d.appendChild(i),document.getElementById(n.id).addEventListener("click",(()=>{document.getElementById("modal"+n.id).style.display="block",document.querySelector("body").style.overflow="hidden"})),document.getElementById("close"+n.id).addEventListener("click",(()=>{document.getElementById("modal"+n.id).style.display="none",document.querySelector("body").style.overflow="visible"}))}));
//# sourceMappingURL=my_library.98d69d47.js.map
