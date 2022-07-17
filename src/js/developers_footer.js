const devs = [
  {
    name: 'Martyn',
    surname: 'Lazarewicz',
    role: 'Team Leader',
  },
  {
    name: 'Agnieszka',
    surname: 'Janowska',
    role: 'Scrum Master',
  },
  {
    name: 'Pawel',
    surname: 'Kłodowski',
    role: 'Developer',
  },
  {
    name: 'Pawel',
    surname: 'Pałaśiński',
    role: 'Developer',
  },
  {
    name: 'Karolina',
    surname: 'Podbliska',
    role: 'Developer',
  },
  {
    name: 'Jakub',
    surname: 'Pikul',
    role: 'Developer',
  },
];

const dev = document.querySelector('.modal-content');

const markup = devs
  .map(
    dev =>
      `<div class="modal-content__sides">
      <div class="modal-content__right-side">
        <h2 class="modal-content__title">${dev.name} ${dev.surname}</h2>
        <h3 class="modal-content__about">${dev.role}</h3>
        
      </div>
    </div>`
  )
  .join('');

dev.insertAdjacentHTML('beforeend', markup);
