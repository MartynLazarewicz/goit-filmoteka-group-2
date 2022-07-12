const devs = [
  {
    name: 'Martyn',
    surname: 'Lazarewicz',
    url: 'images/martyn.png',
    alt: 'White and Black Long Fur Cat',
  },
  {
    name: 'Agnieszka',
    surname: 'Janowska',
    url: 'images/agnieszka.png',
    alt: 'Orange and White Koi Fish Near Yellow Koi Fish',
  },
  {
    name: 'Pawel',
    surname: 'Kłodowski',
    url: 'images/pawelk.png',
    alt: 'Group of Horses Running',
  },
  {
    name: 'Pawel',
    surname: 'Pałaśiński',
    url: 'images/pawelp.png',
    alt: 'Group of Horses Running',
  },
  {
    name: 'Karolina',
    surname: 'Podbliska',
    url: 'images/karolina.png',
    alt: 'Group of Horses Running',
  },
  {
    name: 'Jakub',
    surname: 'Pikul',
    url: 'images/jakub.png',
    alt: 'Group of Horses Running',
  },
];

const dev = document.querySelector('.modal-content');

const markup = devs
  .map(
    dev =>
      `<div class="modal-content__sides">
      <!-- IMG -->
      <div class="modal-content__img">
        <img src="${dev.url}" alt="${dev.alt}" />
      </div>
      <!-- -->
      <div class="modal-content__right-side">
        <h2 class="modal-content__title">${dev.name} ${dev.surname}</h2>
        <h3 class="modal-content__about">About</h3>
        <p class="modal-content__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad amet
          soluta culpa ipsa tempora voluptatum ab tenetur dignissimos maiores
          nisi quos vitae quibusdam ipsum autem quam quo, laudantium veniam.
          Quo?
        </p>
      </div>
    </div>`
  )
  .join('');

dev.insertAdjacentHTML('beforeend', markup);
