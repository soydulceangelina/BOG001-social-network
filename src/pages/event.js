import swal from 'sweetalert';
import comment from '../utils/comment';
import printComment from '../utils/printComment';
import { deletePost, editEvent } from '../firebase/post';
import { sportIcons } from '../utils/imagesDefault';

const getSportIcon = (sport) => {
  const icon = sportIcons[sport];
  if (icon) {
    return icon;
  }
  return '../assets/thinking.png';
};

const eventComponent = (event) => {
  const userID = JSON.parse(localStorage.getItem('session')).user.uid;

  const likesQuantity = event.likes ? event.likes.length : 0;
  const commentQuantity = event.commentList ? event.commentList.length : 0;

  const view = `
    <div class="event__info">
      <div class="event__upper--container">
        <div class="user">
          <img src="../assets/perfil.png">
          <h2>${event.nombre}</h2>
        </div>
        <div class="sport">
          <img class="sport__icon" src="${getSportIcon(event.deporte)}">
          <span>${event.hora}</span>
          <span>${event.fechaEvento}</span>
        </div>
      </div>
      <p><span class="event__subtitle">Lugar: </span>${event.lugar}</p>
      <p>${event.descripcion}</p>
      <div class="event__interaction">
        <div>
          <span class="flaticon-strong icons__timeline"></span>
          <span class="interaction__text">${likesQuantity} Asistiré</span>
        </div>
        <div class="event__interaction--position form__comment">
          <span class="flaticon-chat icons__timeline"></span>
          <span class="interaction__text commentQuantity">${commentQuantity} Comentarios</span>
        </div>
        <div class="event__interaction--position">
          <span class="flaticon-menu icons__timeline">
          </span>
          <ul class="eventOptions" id="eventFriend">
            <li>
              <button class="eventOptions__btn">Reportar</button>
            </li>
          </ul>
          <ul class="eventOptions" id="myEvent">
            <li>
              <button class="eventOptions__btn edit">Editar Evento</button>
            </li>
            <li>
              <button class="eventOptions__btn delete" data-id="${event.id}">Eliminar Evento</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="comment__container display--hide">
      </div>
    </div>
  `;

  const eventContainer = document.createElement('article');
  eventContainer.setAttribute('class', 'eventTimeline');
  eventContainer.innerHTML = view;

  // funcion asistire
  eventContainer.querySelector('.flaticon-strong').addEventListener('click', () => {
    let likes = event.likes || [];
    if (likes.includes(userID)) {
      likes = likes.filter(like => like !== userID);
      eventContainer.querySelector('.flaticon-strong').classList.remove('like');
    } else {
      likes.push(userID);
      eventContainer.querySelector('.flaticon-strong').classList.add('like');
    }
    editEvent(event.eventId, { likes });
    event.likes = likes;
    eventContainer.querySelector('.interaction__text').innerHTML = `${likes.length} Asistiré`;
  });
  // Mostrar u ocultar el menu
  const eventOptionMenu = eventContainer.querySelector('.flaticon-menu');

  document.addEventListener('click', (e) => {
    if (eventOptionMenu.querySelector('#myEvent').style.bottom === '-25vh' && e.target !== eventOptionMenu.querySelector('#myEvent')) {
      eventOptionMenu.querySelector('#myEvent').classList.toggle('hide');
    }
  });
  // Cambiar opciones del evento de acuerdo al usuario
  eventOptionMenu.addEventListener('click', () => {
    if (userID === event.id) {
      eventContainer.querySelector('#myEvent').classList.toggle('hide');
    } else {
      eventContainer.querySelector('#eventFriend').classList.toggle('hide');
    }
  });

  // mostrar u ocultar los comentarios
  eventContainer.querySelector('.flaticon-chat').addEventListener('click', () => {
    const commentsContainer = eventContainer.querySelector('.comment__container');
    const refreshComment = () => {
      commentsContainer.innerHTML = '';
      eventContainer.querySelector('.commentQuantity').innerHTML = `${event.commentList.length} comentarios`;
      commentsContainer.insertAdjacentElement('beforeend', printComment(event));
    };
    refreshComment();
    eventContainer.querySelector('.form__comment').insertAdjacentElement('beforeend', comment(event, refreshComment));
    eventContainer.querySelector('form').classList.toggle('hide');
    commentsContainer.classList.toggle('display--hide');
  });

  // editar evento
  eventContainer.querySelector('.edit').addEventListener('click', () => {
    window.location.href = `#/editEvent?eventId=${event.eventId}`;
  });

  // funcion eliminar evento
  eventContainer.querySelector('.delete').addEventListener('click', async () => {
    if (userID === event.id) {
      swal({
        title: '¿Estas seguro?',
        text: 'Una vez eliminado, no podras recuperar este Evento',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          deletePost(event.eventId);
          swal('Tu Evento ha sido eliminado', {
            icon: 'success',
          });
          eventContainer.innerHTML = '';
        }
      });
    }
  });

  return eventContainer;
};

export default eventComponent;
