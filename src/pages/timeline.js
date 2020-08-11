import { getEvents } from '../firebase/post';
import eventComponent from './event';
import initTimeline from '../templates/initTimeline';
import footerTemplate from '../templates/footer';

import menu from '../templates/menu';

const createEventLink = `
  <a title="Agrega un evento" href="#/createEvent">
    <span id="newEvent" class="flaticon-plus icons postIcon">
    </span>
  </a>
`;

const timeline = async () => {
  const container = document.createElement('section');
  container.setAttribute('class', 'timeline-container');
  container.appendChild(menu());
  container.innerHTML = createEventLink;

  const showEvent = async () => {
    const querySnapshot = await getEvents();
    if (querySnapshot.empty) {
      container.insertAdjacentElement('beforeend', initTimeline());
    } else {
      querySnapshot.forEach((doc) => {
        container.insertAdjacentElement('beforeend', eventComponent({ ...doc.data(), eventId: doc.id }));
      });
    }
    container.insertAdjacentElement('beforeend', footerTemplate());
  };

  showEvent();
  return container;
};

export default timeline;
