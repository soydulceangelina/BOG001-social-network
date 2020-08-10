import { getEvents } from '../firebase/post';
import eventComponent from './event';
// import footerTemplate from '../templates/footer';

// mil funciones para comentar
//   const createComment = () => {
//     const comment = evento.comment || [];
//     const commentValue = eventContainer.querySelector('.input__comment').value;
//     const { displayName, uid } = JSON.parse(localStorage.getItem('session')).user;
//     comment.push({
//       comment: commentValue,
//       username: displayName,
//       useId: uid,
//     });
//     editEvent(evento.eventId, { comment });
//     eventContainer.querySelector('.commentQuantity').innerHTML = `${comment.length} comentarios`;
//   };

//   const printComment = async () => {
//     const commentContainer = eventContainer.querySelector('.comment__container');
//     const querySnapshot = await getEventById(evento.eventId);
//     const comment = querySnapshot.data().comment;

//     if (comment && !evento.open) {
//       comment.forEach((com) => {
//         const commentTemplate = document.createElement('p');
//         commentTemplate.setAttribute('class', 'flaticon-remove delete__comment');
//         commentTemplate.innerText = `${com.username}:
//         ${com.comment}`;
//         commentContainer.insertAdjacentElement('beforeend', commentTemplate);
//       });
//     }

//     if (evento.open) {
//       commentContainer.innerHTML = '';
//     }

//     evento.open = !evento.open;

//     document.querySelector('.delete__comment').addEventListener('click', () => {
//       console.log('aqui deberia eliminar pero nos e me ocurre como');
//     });
//   };

//   eventContainer.querySelector('.flaticon-chat').addEventListener('click', () => {
//     eventContainer.querySelector('#form__comment').classList.toggle('hide');
//     printComment();
//   });

//   eventContainer.querySelector('#notComment').addEventListener('click', () => {
//     eventContainer.querySelector('.input__comment').value = '';
//     eventContainer.querySelector('#form__comment').classList.toggle('hide');
//     printComment();
//   });

//   eventContainer.querySelector('#form__comment').addEventListener('submit', (e) => {
//     e.preventDefault();
//     createComment();
//     eventContainer.querySelector('#form__comment').classList.toggle('hide');
//     printComment();
//     eventContainer.querySelector('.input__comment').value = '';
//   });

// };

import menu from '../templates/menu';

const createEventLink = `
  <a href="#/createEvent">
    <span id="newEvent" class="flaticon-plus icons postIcon">
    </span>
  </a>
`;

const timeline = async () => {
  const container = document.createElement('section');
  container.setAttribute('class', 'timeline-container');
  container.appendChild(menu());
  container.innerHTML += createEventLink;

  const showEvent = async () => {
    const querySnapshot = await getEvents();
    querySnapshot.forEach((doc) => {
      container.insertAdjacentElement('beforeend', eventComponent({ ...doc.data(), eventId: doc.id }));
    });
  };

  showEvent();
  // container.innerHTML = footerTemplate();
  return container;
};

export default timeline;
